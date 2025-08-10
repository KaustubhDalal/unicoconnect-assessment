# Project Roadmap: Event Check-in & Ticketing App

## Completed (MVP Features)

- **Event management:** Create events with name, date/time, location, and optional image upload
- **Attendee registration:** Form with unique ticket code generation
- **Backend API:** Manage events, attendees, and ticket validation
- **Admin login:** Protected routes with JWT authentication
- **Attendee check-in flow:** Ticket code validation and real-time status update
- **Email notifications:** Sent to attendee on successful registration via third-party service
- **Downloadable PDF ticket:** Sent by email and accessible via link after registration
- **CSV export:** Attendee list per event downloadable by admin
- **Responsive frontend UI:** Built with React and Bootstrap
- **Pagination:** Implemented on event listing with image thumbnails

---

## Near-term Improvements

- Add server-side and client-side input validation to improve data integrity
- Enhance PDF ticket design with QR codes or barcodes for quick scanning at check-in
- Add search and filter functionality on event and attendee lists
- Improve authentication UX: password reset, session expiration warnings
- Implement optimistic UI updates for smoother user experience

---

## Future Enhancements

- Real-time check-in dashboard with WebSocket updates for event organizers
- Integration with calendar services (Google Calendar, Outlook) for event reminders
- Multi-event support with user profiles to manage multiple registrations
- Analytics dashboard showing event attendance trends and demographics
- Role-based access control to allow multiple admin roles with different permissions
- Integration with SMS or WhatsApp for notifications in addition to email
