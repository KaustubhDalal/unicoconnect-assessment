const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

async function generateTicketPDF(attendee, event) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Event header
      doc.fontSize(20).text(event.name, { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`Date & Time: ${event.startAt}`);
      doc.text(`Location: ${event.location}`);
      doc.moveDown();

      // Attendee info
      doc.text(`Attendee: ${attendee.name}`);
      doc.text(`Ticket Code: ${attendee.ticketCode}`);
      doc.moveDown();

      // QR code
      const qrDataUrl = await QRCode.toDataURL(attendee.ticketCode);
      const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, '');
      doc.image(Buffer.from(qrImage, 'base64'), { fit: [150, 150], align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = generateTicketPDF;
