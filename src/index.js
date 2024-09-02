const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = require('./app'); 

const port = process.env.PORT || 3000; // Added fallback for port

// Load environment variables
require('dotenv').config();

// Database URL from environment variable or fallback to a default
const DATABASE_URL = process.env.MONGODB_URI || "node src/createDatabase.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Connect to DATABASE
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection error:', err));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
