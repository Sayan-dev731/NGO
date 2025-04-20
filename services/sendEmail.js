require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/send-email', async (req, res) => {
    try {
        const { name, address, email, phone, subject, message } = req.body;

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL, // Where you want to receive contact form submissions
            subject: `Contact Form Submission: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

module.exports = router;
