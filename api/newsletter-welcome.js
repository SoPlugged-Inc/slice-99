import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Slice Studies <studies@slice99.com>',
      to: email,
      subject: 'Welcome to Slice Studies: Your First Case Study',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171717; line-height: 1.6;">
          <h1 style="font-size: 24px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 24px;">
            SL/<span style="color: #FF4500;">CE</span> STUDIES
          </h1>
          
          <p style="font-size: 18px; font-weight: 300;">Welcome to the Archives.</p>
          
          <p>You're now part of a community of 2,000+ founders and marketers getting real-world creator teardowns every week.</p>
          
          <div style="background: #f5f5f5; padding: 32px; border-radius: 16px; margin: 32px 0;">
            <p style="margin-top: 0; font-weight: 600;">Your first study is ready:</p>
            <h2 style="margin: 0 0 16px 0; font-size: 20px;">The $0 to $1M Content Engine</h2>
            <p style="font-size: 14px; color: #525252; margin-bottom: 24px;">How a founder-led beauty brand leveraged fractionalized UGC to scale without a massive creative team.</p>
            <a href="https://slice99.com/blog" style="background: #FF4500; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Read the Study</a>
          </div>

          <p style="font-size: 14px; color: #A3A3A3;">
            You received this because you signed up for Slice Studies. <br/>
            Slice Inc. | 2026
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ message: 'Welcome email sent', id: data.id });
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
