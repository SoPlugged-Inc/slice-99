import Stripe from 'stripe';
import { Resend } from 'resend';

// Vercel Serverless Functions will automatically pull your production keys 
// from your Vercel Dashboard Environment Variables when deployed.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
const ALERT_EMAIL_ADDRESS = process.env.ALERT_EMAIL_ADDRESS || 'your-email@example.com';

// This configuration is MANDATORY. It disables Vercel's default JSON parser
// so that we can verify the raw byte signature directly encrypted by Stripe.
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper function to read the raw payload buffer
async function getRawBody(req) {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

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

export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        const rawBody = await getRawBody(req);
        // Verify the signature
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        await logError('Webhook Signature Verification', err, 'Unknown (Not Parsed)');
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            // Data Extraction
            const customerEmail = session.customer_details?.email;
            const businessName = session.customer_details?.name || 'your brand';

            let itemToBeFilmed = 'your product';
            let websiteLink = '';

            // Extract from custom_fields
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
                await logError('Stripe Webhook', 'Missing customer email in session details.', businessName);
                return res.status(400).send('Missing customer email');
            }

            // Delivery Engine (Resend API)
            const emailSubject = `Payment Confirmed: ${businessName} x Slice99 Onboarding & Shipping Instructions`;

            const htmlTemplate = `
<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
  <!-- Header Bar -->
  <div style="background-color: #000000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">SLICE99</h1>
  </div>

  <h2 style="color: #333;">Payment Confirmed</h2>
  <p style="font-size: 16px; line-height: 1.5; color: #555;">
    Hi <strong>${businessName}</strong>, we've received your payment for the upcoming Slice99 campaign slot. We are excited to feature your <strong>${itemToBeFilmed}</strong>.
  </p>
  
  <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; border-radius: 0 8px 8px 0; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #166534;">1. Shipping Instructions</h3>
    <p style="margin-bottom: 5px; color: #15803d;">Please ship your product to our hub:</p>
    <p style="font-weight: bold; color: #166534;">
      Slice99 C/O Nina Barango<br>
      631 Montessor Crescent<br>
      Ottawa, ON K0A 3K0
    </p>
  </div>

  <h3 style="color: #333;">2. Projected Timeline</h3>
  <ul style="color: #555; line-height: 1.6;">
    <li><strong>Logistics:</strong> Once the pool is completed, products are distributed to our creators.</li>
    <li><strong>Content:</strong> Live within 14 days of full distribution.</li>
  </ul>

  <p style="margin-top: 30px; font-size: 14px; color: #888; border-top: 1px solid #eee; padding-top: 20px;">
    Best regards,<br>
    <strong>The Slice99 Support Team</strong>
  </p>
</div>
`;

            try {
                const { data, error } = await resend.emails.send({
                    from: 'Slice99 Support <support@slice99.com>',
                    to: [customerEmail],
                    subject: emailSubject,
                    html: htmlTemplate,
                    reply_to: 'support@slice99.com'
                });

                if (error) {
                    throw new Error(error.message || 'Unknown Resend error');
                }

                console.log(`Email successfully sent to ${customerEmail}. Resend ID:`, data.id);

            } catch (resendError) {
                await logError('Resend API Delivery', resendError, businessName);
                return res.status(500).send('Failed to send email');
            }

        } catch (generalError) {
            const bName = session.customer_details?.name || 'Unknown';
            await logError('General Processing Error', generalError, bName);
            return res.status(500).send('Internal Server Error');
        }
    }

    res.status(200).send({ received: true });
}
