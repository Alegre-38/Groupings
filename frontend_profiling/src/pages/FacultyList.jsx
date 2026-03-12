import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/faculties`)
      .then(res => {
        setFaculties(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching faculty", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Faculty Roster</h1>
        <p className="page-subtitle">Manage faculty profiles and administrative roles.</p>
      </div>

      <div className="modern-card">
        {loading ? (
          <p>Loading faculty members...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Employment Type</th>
                <th>Roles count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {faculties.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No faculty found.</td></tr>
              ) : (
                faculties.map(faculty => (
                  <tr key={faculty.Faculty_ID}>
                    <td>{faculty.Faculty_ID}</td>
                    <td><strong>{faculty.First_Name} {faculty.Last_Name}</strong></td>
                    <td>{faculty.Department}</td>
                    <td>{faculty.Employment_Type}</td>
                    <td>{faculty.roles?.length || 0} Roles</td>
                    <td>
                      <Link to={`/faculties/${faculty.Faculty_ID}`}>
                        <button className="btn-primary" style={{padding: '0.3rem 0.8rem', fontSize: '0.85em'}}>Manage Roles</button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyList;
