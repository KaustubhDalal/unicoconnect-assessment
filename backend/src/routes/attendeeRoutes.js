const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendeeController');
const { adminAuth } = require('../middleware/authMiddleware');

router.post('/', attendeeController.registerAttendee);
router.get('/:eventId', attendeeController.listAttendees);
router.get('/export/:eventId', adminAuth, attendeeController.exportAttendeesCSV);
router.post('/checkin', adminAuth, attendeeController.checkInAttendee);

module.exports = router;
