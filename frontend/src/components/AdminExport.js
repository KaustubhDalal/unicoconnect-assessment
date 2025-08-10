import React, { useEffect, useState } from 'react';
import { getEvents, csvExportUrl } from '../api';

export default function AdminExport() {
  const [events, setEvents] = useState([]);
  const [sel, setSel] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getEvents().then(data => {
      setEvents(data || []);
      if (data?.length) setSel(data[0].id);
    });
  }, []);

  async function downloadCSV() {
    setError(''); 
    try {
      const url = csvExportUrl(sel);
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('text/csv')) {
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `attendees_event_${sel}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to download CSV');
      }
    } catch (err) {
      setError('Network or server error occurred');
    }
  }

  return (
    <div className="container my-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Export Attendees (CSV)</h2>

      <div className="mb-3">
        <label htmlFor="eventSelect" className="form-label">
          Select Event
        </label>
        <select
          id="eventSelect"
          className="form-select"
          value={sel}
          onChange={e => setSel(e.target.value)}
        >
          {events.map(ev => (
            <option key={ev.id} value={ev.id}>
              {ev.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary w-100"
        onClick={downloadCSV}
        disabled={!sel}
      >
        Download CSV
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
