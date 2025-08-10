const attendeeModel = require('../models/attendeeModel');
const eventModel = require('../models/eventModel');
const generateTicketPDF = require('../lib/ticketPdf');

async function getTicket(req, res) {
  const { ticketCode } = req.params;
  const attendee = attendeeModel.getAttendeeByTicketCode(ticketCode);
  if (!attendee) return res.status(404).json({ error: 'Ticket not found' });

  const event = eventModel.getEventById(attendee.eventId);
  const pdfBuffer = await generateTicketPDF(attendee, event);
  
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=ticket_${ticketCode}.pdf`);
  res.send(pdfBuffer);
}
module.exports = { getTicket };
