import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEvents, registerAttendee, ticketUrl } from "../api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function RegistrationForm() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);

  const [errors, setErrors] = useState({});
  const query = useQuery();

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data || []);
        const urlEventId = query.get("eventId");
        if (urlEventId && data.some((ev) => ev.id.toString() === urlEventId)) {
          setEventId(urlEventId);
        } else if ((data || []).length) {
          setEventId(data[0].id);
        }
      })
      .catch((err) => {
        setResult({ error: err.message || "Failed to load events" });
      });
  }, [query]);

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setResult(null);
    if (!validate()) {
      return;
    }
    if (!eventId) {
      return;
    }
    try {
      const data = await registerAttendee({ eventId, name, email, phone });
      setResult(data);
    } catch (err) {
      setResult({ error: err.message || "Registration failed" });
    }
  }
  
  const ticketCode = result?.attendee?.ticketCode || result?.ticketCode || null;

  return (
    <div className="container my-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register Attendee</h2>
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="eventSelect" className="form-label">
            Event
          </label>
          <select
            id="eventSelect"
            className="form-select"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          >
            {events.map((ev) => {
              const dateObj = new Date(ev.startAt);
              const formattedDate = dateObj.toLocaleString("en-IN", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
                hour12: true,
              });

              return (
                <option key={ev.id} value={ev.id}>
                  {ev.name} — {formattedDate}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="nameInput"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="emailInput"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneInput" className="form-label">
            Phone (optional)
          </label>
          <input
            id="phoneInput"
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!eventId || events.length === 0}
        >
          Register
        </button>
      </form>

      {result && result.error && (
        <div className="alert alert-danger mt-4" role="alert">
          <h5>Error</h5>
          <p>{result.error}</p>
        </div>
      )}

      {result && !result.error && (
        <div className="alert alert-success mt-4" role="alert">
          <h5>Registered Successfully</h5>
          <p>
            Ticket Code: <strong>{ticketCode}</strong>
          </p>
          <p>
            <a
              href={ticketCode ? ticketUrl(ticketCode) : "#"}
              target="_blank"
              rel="noreferrer"
            >
              Download Ticket (PDF)
            </a>{" "}
            (also sent by email)
          </p>
        </div>
      )}
    </div>
  );
}
