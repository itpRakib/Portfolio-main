require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { otpStore, generateOTP, sendOTPEmail } = require('./services/otpService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper for email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Route: Send OTP
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    // Store in our temporary map
    otpStore.set(email.toLowerCase(), { otp, expiresAt });

    // Send the email
    await sendOTPEmail(email, otp);

    // Note: The OTP is NOT leaked in the response payload for security reasons!
    return res.status(200).json({ success: true, message: 'Verification code sent successfully.' });
  } catch (error) {
    console.error('Error in send-otp:', error);
    return res.status(500).json({ success: false, message: 'Failed to send verification code. Please try again.' });
  }
});

// Route: Verify OTP
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }

    if (!otp || typeof otp !== 'string' || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid verification code format. Must be 6 digits.' });
    }

    const storedData = otpStore.get(email.toLowerCase());

    if (!storedData) {
      return res.status(400).json({ success: false, message: 'No active verification code found for this email.' });
    }

    const { otp: storedOtp, expiresAt } = storedData;

    // Check expiration
    if (Date.now() > expiresAt) {
      otpStore.delete(email.toLowerCase()); // Clean up expired token
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new one.' });
    }

    // Verify OTP matching
    if (otp !== storedOtp) {
      return res.status(400).json({ success: false, message: 'Incorrect verification code.' });
    }

    // Delete OTP immediately on success
    otpStore.delete(email.toLowerCase());

    return res.status(200).json({ success: true, message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return res.status(500).json({ success: false, message: 'Verification failed due to an internal error.' });
  }
});

app.listen(PORT, () => {
  console.log(`OTP backend server is running on port ${PORT}`);
});
