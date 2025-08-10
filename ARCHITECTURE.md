  # Architecture Overview

This project is a full-stack Event Check-in & Ticketing application. It consists of:

- **Frontend:** React app providing UI for event listing, registration, admin login, event creation with image upload, and attendee check-in.
- **Backend:** Node.js with Express handling REST API endpoints, authentication, business logic, and data storage.
- **Database:** SQLite storing event and attendee data.
- **File Storage:** Local filesystem (`/uploads` folder) used to store event images uploaded by admins.
- **Third-party Services:** Email service integrated for sending ticket confirmations and notifications.

---

## Component Breakdown

### Frontend

- React components handle event listing with pagination and images, attendee registration, event creation form (including image upload), admin login, check-in form, and CSV export.
- Uses React Router for navigation and Bootstrap for responsive styling.
- Communicates with backend API via fetch calls.

### Backend

- **Express server** exposing RESTful endpoints:
  - `/api/events` for event CRUD operations
  - `/api/attendees` for attendee registration and management
  - `/api/admin` for admin authentication and protected routes
  - `/api/tickets` for ticket verification/check-in
- Uses **Multer** middleware to handle multipart/form-data uploads for images.
- Serves static files (event images) from `/uploads` directory.
- Implements JWT authentication for secure admin access.
- Sends email notifications upon attendee registration.
- Provides downloadable CSV exports for attendee lists.

### Database (SQLite)

- `events` table stores event details (id, name, startAt, location, imageUrl, createdAt).
- `attendees` table stores attendee info with unique ticket codes and check-in status.
- Uses parameterized queries for security.


