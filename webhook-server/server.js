import express from 'express';
import Stripe from 'stripe';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Ensure required environment variables are set
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_placeholder';
const ALERT_EMAIL_ADDRESS = process.env.ALERT_EMAIL_ADDRESS || 'your-email@example.com';

const stripe = new Stripe(STRIPE_SECRET_KEY);
const resend = new Resend(RESEND_API_KEY);

const app = express();

// Idempotency: We'll use a Set to store processed session IDs to prevent duplicate emails
// Note: For a production app that restarts, consider using Redis or a Database.
const processedSessions = new Set();

// Function to log errors and send an Internal Alert Email via Resend
const logError = async (context, error, businessName = 'Unknown') => {
    const errorMessage = error.message || error;
    console.error(`[ERROR] ${context}:`, errorMessage);

    try {
        await resend.emails.send({
            from: 'Slice99 Alerts <support@slice99.com>',
            to: [ALERT_EMAIL_ADDRESS],
            subject: '⚠️ Slice99 System Alert: Webhook Failure',
            html: `
                <h2>Webhook Processing Error</h2>
                <p><strong>Context:</strong> ${context}</p>
                <p><strong>Business Name:</strong> ${businessName}</p>
                <p><strong>Error Message:</strong></p>
                <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${errorMessage}</pre>
                ${error.stack ? `<p><strong>Stack Trace:</strong></p><pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${error.stack}</pre>` : ''}
            `
        });
        console.log('Alert email sent successfully to', ALERT_EMAIL_ADDRESS);
    } catch (alertError) {
        console.error('Failed to send alert email via Resend:', alertError.message);
    }
};

// Use raw body parser to maintain the raw format needed for Stripe signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        await logError('Webhook Signature Verification', err, 'Unknown (Not Parsed)');
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // 1. Idempotency Check: Exit early if we've already handled this payment
        if (processedSessions.has(session.id)) {
            console.log(`Session ${session.id} already processed. Skipping duplicate email.`);
            return res.status(200).send({ received: true, status: 'already_processed' });
        }

        try {
            // 2. Filter: Apply only to the "Slice99 Campaign Slot" payment links
            // This can be checked depending on how you structured your payments. 
            // E.g., via metadata, or verifying the payment_link matches a specific ID.
            // E.g., if (session.payment_link !== process.env.CAMPAIGN_SLOT_PAYMENT_LINK_ID) { return ... }
            // For this robust automation, we proceed assuming it's correctly routed, or optionally filter by custom_fields presence.

            // 3. Data Extraction
            const customerEmail = session.customer_details?.email;
            const businessName = session.customer_details?.name || 'your brand';

            let itemToBeFilmed = 'your product';
            let websiteLink = '';

            // Extract from custom_fields
            // Stripe stores custom_fields as an array of objects
            if (session.custom_fields && Array.isArray(session.custom_fields)) {
                for (const field of session.custom_fields) {
                    const label = typeof field.label === 'object' ? field.label.custom : field.label;

                    if (label && label.toLowerCase().includes('item to be filmed')) {
                        itemToBeFilmed = field.text?.value || field.dropdown?.value || 'your product';
                    }
                    if (label && label.toLowerCase().includes('website')) {
                        websiteLink = field.text?.value || '';
                    }
                }
            }

            // Exit if no email is found to send to
            if (!customerEmail) {
                await logError('Stripe Webhook', 'Missing customer email in session details.', businessName || 'Unknown');
                return res.status(400).send('Missing customer email');
            }

            // 4. Delivery Engine (Resend API)
            const emailSubject = `Payment Confirmed: ${businessName} x Slice99 Onboarding & Shipping Instructions`;

            const htmlTemplate = `
        <p>Hi ${businessName},</p>
        
        <p>This email confirms that we have received your payment for the upcoming Slice99 influencer campaign slot. We are excited to move into the logistics phase of this pool for your <strong>${itemToBeFilmed}</strong>.</p>
        
        <p>To ensure a seamless launch, please find your next steps and campaign timeline below:</p>
        
        <h3>1. Shipping Instructions</h3>
        <p>Please ship your product to our central processing hub. This allows us to oversee the unboxing and "bundle" creation before final distribution to our matched creators.</p>
        
        <p><strong>Shipping Address:</strong><br/>
        Slice99 C/O Nina Barango<br/>
        631 Montessor Crescent<br/>
        Ottawa, ON K0A3K0</p>
        
        <p>Please reply to this thread with your tracking number once the package has been dispatched.</p>
        
        <h3>2. Projected Timeline</h3>
        
        <p><strong>Logistics:</strong> Once the pool is completed and all products have arrived, they will be distributed to a creator in our roster.</p>
        
        <p><strong>Content Creation:</strong> Content is scheduled to go live within 14 days of the pool being fully distributed.</p>
        
        <p>If you have any questions, please reply directly to this email.</p>
        
        <p>Best regards,<br/>
        The Slice99 Support Team</p>
      `;

            // Use a Try/Catch block for Resend API call
            try {
                const { data, error } = await resend.emails.send({
                    from: 'Slice99 Support <support@slice99.com>',
                    to: [customerEmail],
                    subject: emailSubject,
                    html: htmlTemplate,
                    reply_to: 'support@slice99.com' // Ensure direct replies go right back
                });

                if (error) {
                    throw new Error(error.message || 'Unknown Resend error');
                }

                console.log(`Email successfully sent to ${customerEmail}. Resend ID:`, data.id);

                // Mark as processed successfully
                processedSessions.add(session.id);

            } catch (resendError) {
                // Log Error and trigger Alert Email
                await logError('Resend API Delivery', resendError, businessName);
                // We still return 200 to Stripe so it doesn't endlessly retry if it's a hard Resend block, 
                // or return 500 so Stripe retries later if it was a network error.
                return res.status(500).send('Failed to send email');
            }

        } catch (generalError) {
            const bName = session.customer_details?.name || 'Unknown';
            await logError('General Processing Error', generalError, bName);
            return res.status(500).send('Internal Server Error');
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Slice99 Webhook automation server listening on port ${PORT}`);
});
