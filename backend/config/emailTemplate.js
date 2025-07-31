export const ownerEmailTemplate = ({ name, email, subject, message }) => ({
  subject: `Portfolio Contact: ${subject} from ${name}`,
  html: `
    <div style="font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #4e1a89, #0d0d2b); color: #ffffff; padding: 30px; border-radius: 10px;">
      <h2 style="margin-top: 0;">📬 New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #1c1c3a; padding: 15px; border-left: 4px solid #a855f7; border-radius: 5px; color: #e0e0e0;">
        ${message}
      </div>
      <hr style="margin: 30px 0; border: 0; border-top: 1px solid #333;" />
      <p style="font-size: 12px; color: #aaa;">This message was sent from your portfolio site.</p>
    </div>
  `,
});

export const userConfirmationTemplate = ({ name, subject, message }) => ({
  subject: `Thanks for reaching out, ${name}!`,
  html: `
    <div style="font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #4e1a89, #0d0d2b); color: #ffffff; padding: 30px; border-radius: 10px;">
      <h2 style="margin-top: 0;">👋 Hi ${name},</h2>
      <p>Thanks for contacting me! I’ve received your message and will reply soon.</p>
      <h4 style="margin-top: 20px;">📝 Your Message</h4>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="background: #1c1c3a; padding: 15px; border-left: 4px solid #a855f7; border-radius: 5px; color: #e0e0e0;">
        ${message}
      </div>
      <p style="margin-top: 30px;">Until then, feel free to connect with me on LinkedIn or check out more of my work!</p>
      <p>🚀 <strong>Honey Pathkar</strong></p>
    </div>
  `,
});
