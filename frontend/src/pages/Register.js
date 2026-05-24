import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', form);
      login(res.data.token, res.data.username);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="username" placeholder="Username"
            value={form.username} onChange={handleChange} required />
          <input style={styles.input} name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password"
            value={form.password} onChange={handleChange} required />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' },
  card:      { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: '360px' },
  title:     { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  input:     { width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' },
  button:    { width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' },
  error:     { color: 'red', marginBottom: '1rem', fontSize: '14px' },
  link:      { textAlign: 'center', marginTop: '1rem', fontSize: '14px' }
};