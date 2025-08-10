const eventModel = require('../models/eventModel');

function createEvent(req, res) {
  // console.log('Creating event with body:', req.body);
  // console.log('Uploaded file:', req.file);

  const { name, startAt, location } = req.body;
  const imageFile = req.file;  
  if (!name || !startAt || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;
  const event = eventModel.createEvent(name, startAt, location, imageUrl);
  res.status(201).json(event);
}

function getEvents(req, res) {
  const events = eventModel.getAllEvents();
  res.json(events);
}

module.exports = {
  createEvent,
  getEvents
};
