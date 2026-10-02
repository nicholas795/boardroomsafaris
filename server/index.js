import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(express.json());

const createTransporter = () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('Missing SMTP_USER or SMTP_PASS environment variables.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user, pass },
  });
};

app.post('/api/contact', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    jobTitle,
    companySize,
    incentiveType,
    groupSize,
    timeline,
    budgetRange,
    message,
  } = req.body;

  if (!firstName || !lastName || !email || !company || !incentiveType) {
    return res.status(400).json({ error: 'Missing required enquiry data.' });
  }

  const mailOptions = {
    from: 'support@redface.co.za',
    to: 'enquiries@boardroomsafaris.com',
    subject: 'New contact enquiry from Boardroom Safaris',
    replyTo: email,
    text: `New enquiry received:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company}\nJob title: ${jobTitle || 'N/A'}\nCompany size: ${companySize || 'N/A'}\nIncentive type: ${incentiveType}\nGroup size: ${groupSize || 'N/A'}\nTimeline: ${timeline || 'N/A'}\nBudget range: ${budgetRange || 'N/A'}\n\nMessage:\n${message || 'N/A'}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f7fb; padding: 24px; color: #1f2937;">
        <div style="max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%); border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #2563eb 100%); padding: 24px 28px; color: #ffffff;">
            <h2 style="margin: 0 0 6px; font-size: 24px;">New enquiry received</h2>
            <p style="margin: 0; font-size: 14px; color: #dbeafe;">A fresh website inquiry is ready for your review.</p>
          </div>
          <div style="padding: 24px 28px 8px;">
            <p style="margin: 0 0 18px; color: #475569; font-size: 14px;">Here are the key details from the enquiry:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 160px;"><strong>Name</strong></td>
                <td style="padding: 8px 0; color: #111827;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td>
                <td style="padding: 8px 0; color: #111827;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Phone</strong></td>
                <td style="padding: 8px 0; color: #111827;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Company</strong></td>
                <td style="padding: 8px 0; color: #111827;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Job title</strong></td>
                <td style="padding: 8px 0; color: #111827;">${jobTitle || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Company size</strong></td>
                <td style="padding: 8px 0; color: #111827;">${companySize || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Incentive type</strong></td>
                <td style="padding: 8px 0; color: #111827;">${incentiveType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Group size</strong></td>
                <td style="padding: 8px 0; color: #111827;">${groupSize || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Timeline</strong></td>
                <td style="padding: 8px 0; color: #111827;">${timeline || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Budget range</strong></td>
                <td style="padding: 8px 0; color: #111827;">${budgetRange || 'N/A'}</td>
              </tr>
            </table>
            <div style="margin-top: 18px; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 10px; padding: 14px; color: #1e3a8a;">
              <strong style="display: block; margin-bottom: 6px;">Message</strong>
              <div style="line-height: 1.5; color: #1f2937;">${message ? message.replace(/\n/g, '<br/>') : 'N/A'}</div>
            </div>
          </div>
          <div style="padding: 14px 28px 24px; color: #64748b; font-size: 12px; text-align: center;">
            This enquiry was submitted through your website contact form.
          </div>
        </div>
      </div>
    `,
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return res.status(500).json({ error: 'Failed to send enquiry email.' });
  }
});

app.listen(port, () => {
  console.log(`Contact email server listening on http://localhost:${port}`);
});
