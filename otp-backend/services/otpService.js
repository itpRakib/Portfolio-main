const nodemailer = require('nodemailer');
const crypto = require('crypto');

// In-memory store: Map<email, { otp, expiresAt }>
const otpStore = new Map();

/**
 * Securely generates a random 6-digit numeric OTP.
 * @returns {string} The 6-digit numeric OTP.
 */
function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Transporter setup using environment variables for Gmail.
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Sends a clean HTML-templated OTP email to the user.
 * @param {string} email - Destination email address.
 * @param {string} otp - Generated OTP.
 * @returns {Promise<any>} Sent mail details.
 */
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: `"Verification Service" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Your Verification Code',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f7f6;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 550px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #eef2f3;
        }
        .header {
          text-align: center;
          padding-bottom: 25px;
          border-bottom: 2px solid #f4f7f6;
        }
        .header h1 {
          color: #1a252f;
          font-size: 22px;
          margin: 0;
          font-weight: 600;
        }
        .content {
          padding: 30px 10px;
          text-align: center;
        }
        .content p {
          font-size: 15px;
          color: #4a5568;
          line-height: 1.6;
          margin: 8px 0;
        }
        .otp-code {
          display: inline-block;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 6px;
          color: #3182ce;
          background-color: #ebf8ff;
          padding: 16px 32px;
          border-radius: 8px;
          margin: 24px 0;
          border: 1px dashed #3182ce;
        }
        .footer {
          text-align: center;
          padding-top: 25px;
          border-top: 2px solid #f4f7f6;
          font-size: 12px;
          color: #a0aec0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verification Code</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Use the code below to complete verification. This code is valid for <strong>5 minutes</strong>.</p>
          <div class="otp-code">${otp}</div>
          <p>If you did not request this code, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply directly.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  otpStore,
  generateOTP,
  sendOTPEmail,
};
