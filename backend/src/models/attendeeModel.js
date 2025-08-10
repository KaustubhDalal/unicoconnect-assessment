const db = require('../DB/db');
const { v4: uuidv4 } = require('uuid');

function createAttendee(eventId, name, email, phone) {
  let ticketCode = uuidv4().split('-')[0]; // generating tic
  let exists = db.prepare('SELECT 1 FROM attendees WHERE ticketCode = ?').get(ticketCode);
  while (exists) {
    ticketCode = uuidv4().split('-')[0];
    exists = db.prepare('SELECT 1 FROM attendees WHERE ticketCode = ?').get(ticketCode);
  }
  const stmt = db.prepare(
    'INSERT INTO attendees (eventId, name, email, phone, ticketCode) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(eventId, name, email, phone || null, ticketCode);
  return getAttendeeById(result.lastInsertRowid);
}

function getAttendeeById(id) {
  return db.prepare('SELECT * FROM attendees WHERE id = ?').get(id);
}

function getAttendeesByEvent(eventId) {
  return db.prepare('SELECT * FROM attendees WHERE eventId = ?').all(eventId);
}

function getAttendeeByTicketCode(ticketCode) {
  return db.prepare('SELECT * FROM attendees WHERE ticketCode = ?').get(ticketCode);
}

function updateCheckInStatus(id, checkedIn, checkedInAt) {
  return db
    .prepare('UPDATE attendees SET checkedIn = ?, checkedInAt = ? WHERE id = ?')
    .run(checkedIn ? 1 : 0, checkedInAt, id);
}

module.exports = {
  createAttendee,
  getAttendeeById,
  getAttendeesByEvent,
  getAttendeeByTicketCode,
  updateCheckInStatus
};
