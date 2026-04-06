import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function RegisterStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Student_ID: '',
    First_Name: '',
    Last_Name: '',
    Email: '',
    Degree_Program: '',
    Year_Level: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    axios.post(`${API_URL}/students`, formData)
      .then(() => {
        navigate('/students');
      })
      .catch(err => {
        const msg = err.response?.data?.message || 'Registration failed. Please try again.';
        setError(msg);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Register New Student</h1>
        <p className="page-subtitle">Add a new student profile to the profiling system.</p>
      </div>

      <div className="modern-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Student ID</label>
              <input 
                type="text" 
                name="Student_ID" 
                value={formData.Student_ID} 
                onChange={handleChange} 
                required 
                placeholder="202X-XXXX"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Email Address</label>
              <input 
                type="email" 
                name="Email" 
                value={formData.Email} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>First Name</label>
              <input 
                type="text" 
                name="First_Name" 
                value={formData.First_Name} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Last Name</label>
              <input 
                type="text" 
                name="Last_Name" 
                value={formData.Last_Name} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Degree Program</label>
              <select 
                name="Degree_Program" 
                value={formData.Degree_Program} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd', background: 'white' }}
              >
                <option value="">Select a Program</option>
                <option value="BS Information Technology">BS Information Technology</option>
                <option value="BS Computer Science">BS Computer Science</option>
                <option value="BS Information Systems">BS Information Systems</option>
                <option value="BS Mathematics">BS Mathematics</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Year Level</label>
              <input 
                type="number" 
                min="1" max="5"
                name="Year_Level" 
                value={formData.Year_Level} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => navigate('/students')} style={{ padding: '0.6rem 1.5rem', border: '1px solid #ddd', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ padding: '0.6rem 1.5rem' }}>
              {isSubmitting ? 'Registering...' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;
