import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function FacultyList() {
  const [faculties, setFaculties] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFaculties([
      {
        Faculty_ID: 'F-1001',
        First_Name: 'Alan',
        Last_Name: 'Turing',
        Department: 'Computer Science',
        Employment_Type: 'Full-Time',
        roles: ['Adviser', 'Research Head']
      },
      {
        Faculty_ID: 'F-1002',
        First_Name: 'Grace',
        Last_Name: 'Hopper',
        Department: 'Information Technology',
        Employment_Type: 'Part-Time',
        roles: ['Instructor']
      },
      {
        Faculty_ID: 'F-1003',
        First_Name: 'Ada',
        Last_Name: 'Lovelace',
        Department: 'Mathematics',
        Employment_Type: 'Full-Time',
        roles: ['Program Chair', 'Adviser']
      }
    ]);
  }, []);

  const filteredFaculties = faculties.filter(faculty => {
    const fullName = `${faculty.First_Name} ${faculty.Last_Name}`.toLowerCase();
    const dept = faculty.Department.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || dept.includes(query);
  });

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Faculty Roster</h1>
          <p className="page-subtitle">Manage faculty profiles and administrative roles.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: '0.6rem 1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0', 
              width: '300px',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
        </div>
      </div>

      <div className="modern-card">
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
            {filteredFaculties.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No faculty found matching "{searchQuery}".</td></tr>
            ) : (
              filteredFaculties.map(faculty => (
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
      </div>
    </div>
  );
}

export default FacultyList;
