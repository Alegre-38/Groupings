import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function FacultyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRole, setNewRole] = useState({ type: '', group: '' });

  useEffect(() => {
    fetchFaculty();
  }, [id]);

  const fetchFaculty = () => {
    axios.get(`${API_URL}/faculties/${id}`)
      .then(res => {
        setFaculty(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching faculty details", err);
        setLoading(false);
      });
  };

  const handleAssignRole = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/faculties/${id}/roles`, {
      Advisory_Type: newRole.type,
      Assigned_Group: newRole.group
    }).then(() => {
      setNewRole({ type: '', group: '' });
      fetchFaculty();
    }).catch(err => console.error(err));
  };

  if (loading) return <div className="page-container"><p>Loading profile...</p></div>;
  if (!faculty) return <div className="page-container"><p>Faculty not found.</p></div>;

  return (
    <div className="page-container">
      <button onClick={() => navigate('/faculties')} className="btn-primary" style={{width: 'fit-content', marginBottom: '1rem', background: 'transparent', border: '1px solid #4ECDC4', color: '#4ECDC4'}}>
        &larr; Back to Faculty Roster
      </button>

      <div className="modern-card profile-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1 style={{margin: '0', fontSize: '2em'}}>{faculty.First_Name} {faculty.Last_Name}</h1>
          <p style={{margin: '0.5rem 0 0 0', color: '#94a3b8'}}>{faculty.Department} - {faculty.Employment_Type}</p>
        </div>
        <div style={{textAlign: 'right'}}>
          <h2 style={{margin: '0', color: '#4ECDC4', fontSize: '2.5em'}}>{faculty.roles?.length || 0}</h2>
          <small style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px'}}>Active Roles</small>
        </div>
      </div>

      <div className="dashboard-sections" style={{marginTop: '1.5rem', gridTemplateColumns: '1fr 1fr'}}>
        
        {/* Roles Details */}
        <div className="modern-card">
          <h2>Assigned Roles</h2>
          {faculty.roles?.length === 0 ? <p>No administrative or advisory roles assigned currently.</p> : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {faculty.roles?.map(role => (
                 <div key={role.Role_ID} style={{background: 'rgba(78,205,196,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ECDC4'}}>
                   <h3 style={{margin: '0 0 0.5rem 0', color: '#f8fafc'}}>{role.Advisory_Type} Advisor</h3>
                   <p style={{margin: '0', color: '#94a3b8'}}>Group: <strong>{role.Assigned_Group}</strong></p>
                 </div>
              ))}
            </div>
          )}
        </div>

        {/* Assign Role UI */}
        <div className="modern-card">
          <h2>Assign New Role</h2>
          <p style={{color: '#94a3b8', marginBottom: '1.5rem'}}>
            Use this form to assign a new administrative or advisory role to this faculty member.
          </p>

          <form onSubmit={handleAssignRole} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e1'}}>Advisory Type</label>
              <select 
                value={newRole.type} 
                onChange={e => setNewRole({...newRole, type: e.target.value})} 
                required 
                style={inputStyle}>
                <option value="">Select Advisory Type</option>
                <option value="Academic">Academic Advisor</option>
                <option value="Thesis">Thesis Advisor</option>
                <option value="Organization">Org Moderator</option>
                <option value="Research">Research Lead</option>
              </select>
            </div>
            
            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e1'}}>Assigned Group / Section</label>
              <input 
                type="text" 
                placeholder="e.g. BSCS-3A or Tech Club" 
                value={newRole.group} 
                onChange={e => setNewRole({...newRole, group: e.target.value})} 
                required 
                style={inputStyle} 
              />
            </div>

            <button type="submit" className="btn-primary" style={{marginTop: '1rem', padding: '0.8rem'}}>
              Grant Role Authority
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  width: '100%',
  fontSize: '1em'
};

export default FacultyDetail;
