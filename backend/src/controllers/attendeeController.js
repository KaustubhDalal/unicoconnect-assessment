const attendeeModel = require('../models/attendeeModel');
const eventModel = require('../models/eventModel');
const generateTicketPDF = require('../lib/ticketPdf');
const { sendEmail } = require('../lib/mailer');
const { Parser } = require('json2csv');
const fs = require('fs');

async function registerAttendee(req, res) {
  try {
    const { eventId, name, email, phone } = req.body;
    if (!eventId || !name || !email) {
      return res.status(400).json({ error: 'eventId, name, and email are required' });
    }
    const event = eventModel.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const attendee = attendeeModel.createAttendee(eventId, name, email, phone);

    // Generating PDF ticket
    const pdfBuffer = await generateTicketPDF(attendee, event);

    // Saving file loally
    fs.writeFileSync(`ticket_${attendee.ticketCode}.pdf`, pdfBuffer);
    // console.log(`PDF saved locally as ticket_${attendee.ticketCode}.pdf`);

    // Send email with PDF ticket
    const subject = `Your Ticket for ${event.name}`;
    const text = `Hello ${name},\n\nHere is your ticket. Ticket Code: ${attendee.ticketCode}`;
    const html = `<p>Hello <b>${name}</b>,</p>
                  <p>Here is your ticket for <b>${event.name}</b>.</p>
                  <p>Ticket Code: <b>${attendee.ticketCode}</b></p>`;

    await sendEmail(email, subject, text, html, [
      {
        filename: 'ticket.pdf',
        content: pdfBuffer
      }
    ]);

    res.status(201).json({ attendee, message: 'Ticket sent via email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
}

function exportAttendeesCSV(req, res) {
  const { eventId } = req.params;
  if (!eventId) {
    return res.status(400).json({ error: 'eventId is required' });
  }
  console.log(eventId)
  const attendees = attendeeModel.getAttendeesByEvent(eventId);
  if (!attendees.length) {
    return res.status(404).json({ error: 'No attendees found for this event' });
  }
  const fields = ['id', 'eventId', 'name', 'email', 'phone', 'ticketCode', 'checkedIn', 'checkedInAt', 'createdAt'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(attendees);

  res.header('Content-Type', 'text/csv');
  res.attachment(`attendees_event_${eventId}.csv`);
  return res.send(csv);
}

function checkInAttendee(req, res) {
  const { ticketCode } = req.body;
  if (!ticketCode) {
    return res.status(400).json({ error: 'Ticket code is required' });
  }
  const attendee = attendeeModel.getAttendeeByTicketCode(ticketCode);
  if (!attendee) {
    return res.status(404).json({ error: 'Attendee not found' });
  }
  if (attendee.checkedIn) {
    return res.status(400).json({ error: 'Attendee already checked in' });
  }
  // Update attendee check-in
  const checkedInAt = new Date().toISOString();
  attendeeModel.updateCheckInStatus(attendee.id, true, checkedInAt);
  return res.json({
    message: 'Check-in successful',
    attendee: { ...attendee, checkedIn: 1, checkedInAt }
  });
}

module.exports = {
  registerAttendee,
  listAttendees: (req, res) => {
    const { eventId } = req.params;
    const attendees = attendeeModel.getAttendeesByEvent(eventId);
    res.json(attendees);
  },
  exportAttendeesCSV,
  checkInAttendee 
};

