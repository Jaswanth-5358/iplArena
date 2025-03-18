import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Match from './models/Match.js'; // Adjust the path accordingly

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('MONGO_URI not found in environment variables');
    process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

const matches = [
    { imagePath: '/images/MatchDetails1.jpg', name: 'KKR Vs SRH', date: 'March 23rd Sunday', time: '03:30 PM', duration: '4 hours', venue: 'Hyderabad' },
    { imagePath: '/images/MatchDetails3.jpg', name: 'RCB Vs SRH', date: 'March 23rd Sunday', time: '07:00 PM', duration: '4 hours', venue: 'Hyderabad' },
    { imagePath: '/images/MatcgDetails3.jpg', name: 'CSK Vs RCB', date: 'March 24th Monday', time: '07:30 PM', duration: '4 hours', venue: 'Tamil Nadu' },
    { imagePath: '/images/MatchDetails4.jpg', name: 'RR Vs DC', date: 'March 25th Tuesday', time: '07:30 PM', duration: '4 hours', venue: 'Delhi' },
    { imagePath: '/images/MatchDetails5.png', name: 'CSK Vs MI', date: 'March 26th Wednesday', time: '07:30 PM', duration: '4 hours', venue: 'Mumbai' },
    { imagePath: '/images/MatchDetails6.webp', name: 'RR Vs LSG', date: 'March 27th Thursday', time: '07:30 PM', duration: '4 hours', venue: 'Lucknow' },
    { imagePath: '/images/MatchDetails7.webp', name: 'MI Vs RR', date: 'March 28th Friday', time: '07:30 PM', duration: '4 hours', venue: 'Rajesthan' },
    { imagePath: '/images/MatchDetails8.webp', name: 'KKR Vs CSK', date: 'March 29th Saturday', time: '07:30 PM', duration: '4 hours', venue: 'Kolkata' }
];

async function seedDatabase() {
    try {
        await Match.deleteMany({});
        await Match.insertMany(matches);
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

seedDatabase();
