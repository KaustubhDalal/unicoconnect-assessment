import React, { useEffect, useState } from 'react';
import { getEvents, getAttendeesForEvent } from '../api';
import { useNavigate } from 'react-router-dom';

const EVENTS_PER_PAGE = 8; 

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [attendeeCounts, setAttendeeCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const placeholderImg = 'https://via.placeholder.com/286x180?text=Event+Image';

  useEffect(() => {
    async function fetchData() {
      try {
        const evs = await getEvents();
        console.log('Fetched events:', evs);
        setEvents(evs || []);

        const counts = {};
        for (const ev of evs || []) {
          const attendees = await getAttendeesForEvent(ev.id);
          counts[ev.id] = attendees.length;
        }
        setAttendeeCounts(counts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const pagedEvents = events.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  function handleRegister(eventId) {
    navigate(`/register?eventId=${eventId}`);
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="text-center">No events yet. Create one!</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {pagedEvents.map((ev) => (
              <div
                key={ev.id}
                className="col"
                onClick={() => navigate(`/register?eventId=${ev.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card h-100 shadow-sm">
                  {ev.imageUrl ? (
                    <img
                      src={ev.imageUrl ? 'http://localhost:5000'+ev.imageUrl : placeholderImg}
                      className="card-img-top"
                      alt={ev.name}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="bg-secondary d-flex align-items-center justify-content-center text-white"
                      style={{ height: '180px', fontSize: '1.25rem' }}
                    >
                      No Image
                    </div>
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{ev.name}</h5>
                    <p className="card-text mb-1">
                      <strong>Date:</strong> {formatDate(ev.startAt)}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Location:</strong> {ev.location}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Registered:</strong> {attendeeCounts[ev.id] ?? 0}
                    </p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(ev.id);
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav aria-label="Event pagination" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, idx) => (
                <li
                  key={idx + 1}
                  className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => goToPage(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
