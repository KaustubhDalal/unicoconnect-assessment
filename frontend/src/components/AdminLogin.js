import React, { useState, useEffect } from 'react';
import { adminLogin } from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await adminLogin(email, password);
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        navigate('/');
      } else {
        setErrorMsg(res?.error || 'Login failed');
      }
    } catch {
      setErrorMsg('Invalid credentials or server error');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
