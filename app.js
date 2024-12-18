const express = require('express');
const router = require('./src/routes/api'); // Ensure your routes are correctly defined
const app = express();  // Correct way to initialize express app

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const { DATABASE_URL } = require("./src/config/config");


// MongoDB connection
const URL = `${DATABASE_URL}`;
let options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 30000, // 30s
};
mongoose.connect(URL, options)
    .then((result) => {
        console.log('DB connection Success');
    }).catch((err) => {
    console.log('DB connection error' + err);
});

// app use all package
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// rate limiter setup
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Use middleware
app.use(express.json());

// API router setup
app.use('/api/v1',router);  // Ensure router is correctly implemented

// Serve React frontend
app.use(express.static('client/dist'));  // Serve static files

// React frontend routing
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'));
});

module.exports = app;
