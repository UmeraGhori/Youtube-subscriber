const mongoose = require('mongoose');
const subscriberModel = require('./models/subscribers');
const data = require('./data');
require('dotenv').config();

// Connect to DATABASE
const DATABASE_URL = process.env.MONGODB_URI || "mongodb+srv://umeraghori07:RC2PM3MAzzMvJh1X@cluster0.he3zk.mongodb.net/myDatabase?retryWrites=true&w=majority"; // Added fallback
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 60000, // 60 seconds
});

const db = mongoose.connection;
db.on('error', (err) => console.error('Connection error:', err));
db.once('open', () => {
    console.log('Connected to the database...');
    refreshAll();
});

const refreshAll = async () => {
    try {
        // Delete all existing documents
        await subscriberModel.deleteMany({});
        console.log('All existing subscribers deleted.');

        // Insert new data
        await subscriberModel.insertMany(data);
        console.log('New subscribers inserted.');

        // // Disconnect from the database
        await mongoose.disconnect();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error during database operations:', error);
    }
};
