const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import email service routes
const emailRoutes = require('./services/sendEmail');

// Use email routes
app.use('/api', emailRoutes);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle other routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
