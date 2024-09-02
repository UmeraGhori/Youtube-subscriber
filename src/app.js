// src/app.js
const express = require('express');
const app = express();
const Subscriber = require('./models/subscribers');

// Middleware to parse JSON bodies
app.use(express.json());


app.set('json spaces', 2); 

// Route to get all subscribers
app.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get subscribers with only names and subscribed channels
app.get('/subscribers/names', async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}, { _id: 0, name: 1, subscribedChannel: 1 });
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a subscriber by ID
app.get('/subscribers/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(400).json({ message: 'Subscriber not found' });
        }
        res.status(200).json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to create a new subscriber
app.post('/subscribers', async (req, res) => {
    const { name, subscribedChannel } = req.body;

    if (!name || !subscribedChannel) {
        return res.status(400).json({ message: 'Name and subscribedChannel are required' });
    }

    const subscriber = new Subscriber({
        name,
        subscribedChannel,
        subscribedDate: Date.now()
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = app;
