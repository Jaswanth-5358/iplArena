const express = require('express');
const router = express.Router();

// Routes for Each Match Link
router.get('/SRHVsKKR', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatchDetails1.jpg',
            name: 'KKR Vs SRH',
            date: 'March 23rd Sunday',
            time: '03:30 PM',
            duration: '4 hours',
            venue: 'Hyderabad'
        }
    });
});

router.get('/RCBVsSRH', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatchDetails1.jpg',
            name: 'RCB Vs SRH',
            date: 'March 23rd Sunday',
            time: '07:00 PM',
            duration: '4 hours',
            venue: 'Hyderabad'
        }
    });
});

router.get('/CSKVsRCB', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatcgDetails3.jpg',
            name: 'CSK Vs RCB',
            date: 'March 24th Monday',
            time: '07:30 PM',
            duration: '4 hours',
            venue: 'Tamil Nadu'
        }
    });
});

router.get('/DCVsRR', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatchDetails4.jpg',
            name: 'RR Vs DC',
            date: 'March 25th Tuesday',
            time: '07:30 PM',
            duration: '4 hours',
            venue: 'Delhi'
        }
    });
});

router.get('/MIVsCSK', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatchDetails5.png',
            name: 'CSK Vs MI',
            date: 'March 26th Wednesday',
            time: '07:30 PM',
            duration: '4 hours',
            venue: 'Mumbai'
        }
    });
});

router.get('/LSGVsRR', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatchDetails6.webp',
            name: 'RR Vs LSG',
            date: 'March 27th Thursday',
            time: '07:30 PM',
            duration: '4 hours',
            venue: 'Lucknow'
        }
    });
});

router.get('/RRVsMI', (req, res) => {
    res.render('mathDetails',{
        match: {
            imagePath: '/images/MatchDetails7.webp',
            name: 'MI Vs RR',
            date: 'March 28th Friday',
            time: '07:30 PM',
            duration: '4 hours',
            venue: 'Rajesthan'
        }
    });
});

router.get('/CSKVsKKR', (req, res) => {
    res.render('mathDetails', {
        match: {
            imagePath: '/images/MatchDetails8.webp',
            name: 'KKR Vs CSK',
            date: 'March 29 Saturday',
            time: '07:30 PM',
            duration: '4 hours',
            venue: 'Kolkata'
        }
    });
});




module.exports = router;
