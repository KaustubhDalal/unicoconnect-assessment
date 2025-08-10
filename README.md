# Event Management App

A full-stack event management application with admin panel, attendee registration, event creation with image upload, check-in,Ticket code and CSV export functionality.

---

## Features

- List upcoming events with images and pagination
- Admin login and authentication
- Create events with optional image upload
- Register attendees for events
- Attendee check-in by ticket code
- Export attendees CSV for each event
- Responsive UI built with React and Bootstrap
- Backend API using Node.js, Express, and SQLite

---

## Tech Stack

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Node.js, Express, SQLite, Multer (for image upload)
- **Authentication:** JWT (Admin login)
- **Others:** CORS, dotenv for environment variables

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- SQLite3

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/event-management-app.git
cd event-management-app


2. Backend Setup

cd backend
npm install
# create .env file with required variables (e.g., PORT, JWT_SECRET)
npm run start

3. frontend setup

cd ../frontend
npm install
npm start

4. Open http://localhost:3000 to use the app.

5. Admin Login :
- email : admin@example.com
- pass : admin123

6. Environment Variables
- Create .env files in backend with:
- PORT=5000
- JWT_SECRET=your_jwt_secret_key

7. API Documentation : https://documenter.getpostman.com/view/14048490/2sB3BEnA2V

8. Demo Video Link : https://www.loom.com/share/70c22d66b73e4f4ebdec8c1da4c510d4?sid=ed804bb6-eda5-4f05-a48b-1bf2003bde44