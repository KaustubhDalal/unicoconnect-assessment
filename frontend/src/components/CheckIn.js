import React, { useState } from 'react';
import { checkIn } from '../api';

export default function CheckIn() {
  const [ticketCode, setTicketCode] = useState('');
  const [status, setStatus] = useState(null);

  async function onCheckIn(e) {
    e.preventDefault();
    try {
      const res = await checkIn(ticketCode.trim());
      setStatus({ ok: true, message: res.message || 'Checked in', attendee: res.attendee });
    } catch (err) {
      setStatus({ ok: false, message: err.message || 'Check-in failed' });
    }
  }

  return (
    <div className="container my-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Check-in</h2>
      <form onSubmit={onCheckIn} className="mb-3">
        <div className="mb-3">
          <label htmlFor="ticketCode" className="form-label">
            Ticket Code
          </label>
          <input
            type="text"
            id="ticketCode"
            className="form-control"
            value={ticketCode}
            onChange={e => setTicketCode(e.target.value)}
            required
            placeholder="Enter your ticket code"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Check-in
        </button>
      </form>

      {status && (
        <div className={`alert ${status.ok ? 'alert-success' : 'alert-danger'}`} role="alert">
          {status.message}
        </div>
      )}

      {status && status.ok && status.attendee && (
        <div className="card mt-3">
          <div className="card-header">Attendee Details</div>
          <div className="card-body">
            <p><strong>Name:</strong> {status.attendee.name}</p>
            <p><strong>Email:</strong> {status.attendee.email}</p>
            <p><strong>Phone:</strong> {status.attendee.phone || 'N/A'}</p>
            <p><strong>Ticket Code:</strong> {status.attendee.ticketCode}</p>
            <p><strong>Checked In At:</strong> {new Date(status.attendee.checkedInAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
