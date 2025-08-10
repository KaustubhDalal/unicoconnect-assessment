const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || 'admin@example.com';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '2h' }
    );
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;
