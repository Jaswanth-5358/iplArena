const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    about: { type: String },
    interests: { type: [String] },
    dob: { type: Date },
    mobile: { type: String },
    address: { type: String },
    profilePic: { type: String },
    bookings: [{
        matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
        seatNumber: Number,
        circleType: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);