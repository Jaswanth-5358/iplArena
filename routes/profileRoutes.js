const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user profile
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('bookings.matchId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update user profile
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { username, email, about, interests, dob, mobile, address, hobbies } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            email,
            about,
            interests,
            dob,
            mobile,
            address,
            hobbies
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;