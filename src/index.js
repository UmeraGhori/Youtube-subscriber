// // src/index.js
// const express = require('express')
// const app = require('./app.js')
// const mongoose = require('mongoose')
// const port = 3000

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

// // Connect to DATABASE
// const DATABASE_URL = "mongodb://localhost:27017/subscribers";
// mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection
// db.on('error', (err) => console.log(err))
// db.once('open', () => console.log('connected to database'))

// // Start Server
// app.listen(port, () => console.log(`App listening on port ${port}!`))



// src/index.js
const express = require('express');
const app = require('./app.js');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Connect to DATABASE
const DATABASE_URL = "mongodb://localhost/subscribers";
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('connected to database'));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
