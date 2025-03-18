const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    seatNumber: Number,
    circleType: String,
    isBooked: { type: Boolean, default: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
