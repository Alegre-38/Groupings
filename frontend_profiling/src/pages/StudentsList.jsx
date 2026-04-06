import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/students`)
      .then(res => setStudents(res.data))
      .catch(err => {
        console.error('Failed to fetch students', err);
        setError(`Failed to load students: ${err.message}`);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Students Registry</h1>
          <p className="page-subtitle">Manage and view detailed profiles of all enrolled students.</p>
        </div>
        <Link to="/students/register" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }}>
            <span>+</span> Register New Student
          </button>
        </Link>
      </div>

      <div className="modern-card">
        {error && <p style={{color: 'red', padding: '1rem'}}>{error}</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Program & Year</th>
              <th>Email</th>
              <th>Clearance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No students found.</td></tr>
            ) : (
              students.map(student => (
                <tr key={student.Student_ID}>
                  <td>{student.Student_ID}</td>
                  <td><strong>{student.First_Name} {student.Last_Name}</strong></td>
                  <td>{student.Degree_Program} - Year {student.Year_Level}</td>
                  <td>{student.Email_Address || student.Email}</td>
                  <td>
                    {(student.Med_Clearance || student.Medical_Clearance) ? (
                      <span className="badge" style={{color: '#4ECDC4', background: 'rgba(78,205,196,0.1)'}}>Cleared</span>
                    ) : (
                      <span className="badge" style={{color: '#f59e0b', background: 'rgba(245,158,11,0.1)'}}>Pending</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/students/${student.Student_ID}`}>
                      <button className="btn-primary" style={{padding: '0.3rem 0.8rem', fontSize: '0.85em'}}>View Profile</button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsList;
