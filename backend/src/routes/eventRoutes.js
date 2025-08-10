const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { adminAuth } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, basename + '-' + Date.now() + ext);
  },
});

router.get('/', eventController.getEvents);
router.post('/', adminAuth, upload.single('image'), eventController.createEvent);

module.exports = router;
