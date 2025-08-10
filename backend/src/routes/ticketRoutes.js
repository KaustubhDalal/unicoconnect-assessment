const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { adminAuth } = require('../middleware/authMiddleware');

router.get('/:ticketCode', ticketController.getTicket);

module.exports = router;
