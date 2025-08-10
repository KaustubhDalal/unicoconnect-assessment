import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import RegistrationForm from './components/RegistrationForm';
import CheckIn from './components/CheckIn';
import AdminExport from './components/AdminExport';
import AdminLogin from './components/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import './styles.css';

function NavBar() {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Event Booking
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>

            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/events/new">
                    Create Event
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/checkin">
                    Check-in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/export">
                    Export CSV
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {isAdmin ? (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                  type="button"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">
                  Admin Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route
              path="/events/new"
              element={
                <PrivateRoute>
                  <EventForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkin"
              element={
                <PrivateRoute>
                  <CheckIn />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/export"
              element={
                <PrivateRoute>
                  <AdminExport />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
