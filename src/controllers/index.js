const express = require('express');

const router = express.Router();

// route handlers
const courtData = require('./courtData');
const volunteerData = require('./volunteerData');
const hearingData = require('./hearingData');
const scheduleData = require('./scheduleData');
const join = require('./join');

// GET routes
router.get('/hearing-data/:id', hearingData.get);
router.get('/schedule-data', scheduleData.get);
router.get('/profile/:id', volunteerData.get);

// POST routes
router.post('/add-hearing', hearingData.post);
router.post('/match-court', courtData.post);
router.post('/signup', volunteerData.post);
router.post('/join', join.post);

// PUT routes
router.put('/update-hearing', hearingData.put);

module.exports = router;
