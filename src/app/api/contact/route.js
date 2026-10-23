import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: 'Email and message are required.' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === 'false' ? false : true;
    const user = process.env.SMTP_USER || 'adityasingh917023@gmail.com';
    const pass = process.env.SMTP_PASS || 'iwjsipfaiqsynamn';
    const receiver = process.env.CONTACT_RECEIVER || 'adityasingh917023@gmail.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${user}>`,
      to: receiver,
      replyTo: email,
      subject: `[Portfolio Dispatch] ${subject || 'New Contact Request'} — from ${name || email}`,
      text: `New message received from your developer portfolio:\n\n` +
        `Sender Name: ${name || 'Not provided'}\n` +
        `Sender Email: ${email}\n` +
        `Subject: ${subject || 'No subject'}\n\n` +
        `Message:\n${message}\n\n` +
        `---\nDelivered via Aditya Singh's Developer Portfolio Dispatcher`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0d12; color: #ece9e4; padding: 24px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 16px;">
            <span style="font-family: monospace; font-size: 11px; color: #6366f1; text-transform: uppercase; letter-spacing: 0.1em;">Portfolio Transmission // Contact Terminal</span>
            <h2 style="margin: 8px 0 0 0; color: #ffffff; font-size: 20px;">New Message from ${name || 'A Recruiter / Visitor'}</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #8a8894; width: 100px;">From:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${name || 'Anonymous'} &lt;<a href="mailto:${email}" style="color: #6366f1;">${email}</a>&gt;</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8a8894;">Subject:</td>
              <td style="padding: 6px 0; color: #ffffff;">${subject || 'No subject'}</td>
            </tr>
          </table>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <div style="font-family: monospace; font-size: 10px; color: #6366f1; margin-bottom: 8px;">MESSAGE CONTENT:</div>
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #e2e1dc; font-size: 14px;">${message}</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; font-size: 11px; color: #666; font-family: monospace;">
            Reply directly to this email to respond to ${email}.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Transmission delivered successfully to Aditya Singh.',
    });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to deliver transmission.' },
      { status: 500 }
    );
  }
}
