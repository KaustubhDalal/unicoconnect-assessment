const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmail(to, subject, text, html, attachments = []) {
  try {
    const info = await transporter.sendMail({
      from: `"Event App" <no-reply@example.com>`,
      to,
      subject,
      text,
      html,
      attachments
    });
    // console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    // console.error('Email send error:', error);
    throw error;
  }
}

module.exports = { sendEmail };
