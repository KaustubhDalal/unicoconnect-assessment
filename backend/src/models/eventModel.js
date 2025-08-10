const db = require('../DB/db');

function createEvent(name, startAt, location, imageUrl) {
  const stmt = db.prepare(
    'INSERT INTO events (name, startAt, location, imageUrl) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(name, startAt, location, imageUrl || null);
  return { id: result.lastInsertRowid, name, startAt, location, imageUrl };
}

function getAllEvents() {
  return db.prepare('SELECT * FROM events ORDER BY startAt DESC').all();
}

function getEventById(id) {
  return db.prepare('SELECT * FROM events WHERE id = ?').get(id);
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById
};
