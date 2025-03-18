const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    imagePath: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    venue: { type: String, required: true }
});

module.exports = mongoose.model('Match', matchSchema);
