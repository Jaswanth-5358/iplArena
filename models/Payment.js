const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // e.g., Card, UPI, Net Banking
    status: { type: String, required: true, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
