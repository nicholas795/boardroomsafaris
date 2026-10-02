import nodemailer from 'nodemailer';

const requiredFields = ['firstName', 'lastName', 'email', 'company', 'incentiveType'];

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const valueOrNA = (value) => (value ? value : 'N/A');

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const form = req.body || {};
  const missingField = requiredFields.find((field) => !String(form[field] || '').trim());

  if (missingField) {
    return res.status(400).json({ error: 'Missing required enquiry data.' });
  }

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
  } = form;

  const safeMessage = escapeHtml(valueOrNA(message)).replace(/\n/g, '<br/>');
  const from = process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER;
  const to = process.env.CONTACT_EMAIL_TO || 'enquiries@boardroomsafaris.com';

  const mailOptions = {
    from,
    to,
    subject: 'New contact enquiry from Boardroom Safaris',
    replyTo: email,
    text: `New enquiry received:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${valueOrNA(phone)}\nCompany: ${company}\nJob title: ${valueOrNA(jobTitle)}\nCompany size: ${valueOrNA(companySize)}\nIncentive type: ${incentiveType}\nGroup size: ${valueOrNA(groupSize)}\nTimeline: ${valueOrNA(timeline)}\nBudget range: ${valueOrNA(budgetRange)}\n\nMessage:\n${valueOrNA(message)}`,
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
              ${[
                ['Name', `${firstName} ${lastName}`],
                ['Email', email],
                ['Phone', valueOrNA(phone)],
                ['Company', company],
                ['Job title', valueOrNA(jobTitle)],
                ['Company size', valueOrNA(companySize)],
                ['Incentive type', incentiveType],
                ['Group size', valueOrNA(groupSize)],
                ['Timeline', valueOrNA(timeline)],
                ['Budget range', valueOrNA(budgetRange)],
              ]
                .map(
                  ([label, value]) => `
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; width: 160px;"><strong>${escapeHtml(label)}</strong></td>
                      <td style="padding: 8px 0; color: #111827;">${escapeHtml(value)}</td>
                    </tr>
                  `
                )
                .join('')}
            </table>
            <div style="margin-top: 18px; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 10px; padding: 14px; color: #1e3a8a;">
              <strong style="display: block; margin-bottom: 6px;">Message</strong>
              <div style="line-height: 1.5; color: #1f2937;">${safeMessage}</div>
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
}
