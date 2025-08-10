import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent,createEventWithImage } from "../api";

export default function EventForm() {
  const [name, setName] = useState("");
  const [startAt, setStartAt] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreview(null);
    }
  }

  async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('startAt', startAt);
  formData.append('location', location);
    console.log('formData:', formData);
  if (imageFile) {
    formData.append('image', imageFile); 
  }
  for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
  try {
    const res = await createEventWithImage(formData);
    navigate('/');
  } catch (err) {
    setError(err.message || 'Failed to create event');
  }
}


  return (
    <div className="container my-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create Event</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} encType="multipart/form-data" noValidate>
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">Event Name</label>
          <input
            type="text"
            id="eventName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventStartAt" className="form-label">Date &amp; Time</label>
          <input
            type="datetime-local"
            id="eventStartAt"
            className="form-control"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventLocation" className="form-label">Location</label>
          <input
            type="text"
            id="eventLocation"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventImage" className="form-label">Event Image (optional)</label>
          <input
            type="file"
            id="eventImage"
            className="form-control"
            accept="image/*"
            onChange={onImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="img-thumbnail mt-2"
              style={{ maxHeight: '200px' }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">Create</button>
      </form>
    </div>
  );
}
