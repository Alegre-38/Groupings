import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Forms states
  const [newSkill, setNewSkill] = useState({ category: '', skill: '', proficiency: '' });
  const [newActivity, setNewActivity] = useState({ type: '', name: '', date: '', contribution: '' });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = () => {
    axios.get(`${API_URL}/students/${id}`)
      .then(res => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching student details", err);
        setLoading(false);
      });
  };

  const handleClearanceToggle = () => {
    axios.put(`${API_URL}/students/${id}/clearance`, { Med_Clearance: !student.Med_Clearance })
      .then(() => fetchStudent())
      .catch(err => console.error(err));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/students/${id}/skills`, {
      Skill_Category: newSkill.category,
      Specific_Skill: newSkill.skill,
      Proficiency: newSkill.proficiency
    }).then(() => {
      setNewSkill({ category: '', skill: '', proficiency: '' });
      fetchStudent();
    }).catch(err => console.error(err));
  };

  const handleLogActivity = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/students/${id}/non-academic`, {
      Activity_Type: newActivity.type,
      Activity_Name: newActivity.name,
      Date_Logged: newActivity.date,
      Contribution: newActivity.contribution
    }).then(() => {
      setNewActivity({ type: '', name: '', date: '', contribution: '' });
      fetchStudent();
    }).catch(err => console.error(err));
  };

  const updateDisciplinaryStatus = (recordId, newStatus) => {
    axios.put(`${API_URL}/disciplinary/${recordId}/status`, { Status: newStatus })
      .then(() => fetchStudent())
      .catch(err => console.error(err));
  };

  if (loading) return <div className="page-container"><p>Loading profile...</p></div>;
  if (!student) return <div className="page-container"><p>Student not found.</p></div>;

  return (
    <div className="page-container">
      <button onClick={() => navigate('/students')} className="btn-primary" style={{width: 'fit-content', marginBottom: '1rem', background: 'transparent', border: '1px solid #4ECDC4', color: '#4ECDC4'}}>
        &larr; Back to Students
      </button>

      <div className="modern-card profile-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1 style={{margin: '0', fontSize: '2em'}}>{student.First_Name} {student.Last_Name}</h1>
          <p style={{margin: '0.5rem 0 0 0', color: '#94a3b8'}}>{student.Degree_Program} - Year {student.Year_Level} | {student.Email_Address}</p>
        </div>
        <div style={{textAlign: 'right'}}>
          <h2 style={{margin: '0', color: '#f8fafc', fontSize: '2.5em'}}>{Number(student.calculated_gwa).toFixed(2)}</h2>
          <small style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px'}}>Total GWA</small>
        </div>
      </div>

      <div className="dashboard-sections" style={{marginTop: '1.5rem'}}>
        {/* Left Column: Details */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          {/* Medical Clearance */}
          <div className="modern-card">
            <h2>Medical Clearance</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <p>Current Status: 
                <strong style={{marginLeft: '10px', color: student.Med_Clearance ? '#4ECDC4' : '#f59e0b'}}>
                  {student.Med_Clearance ? 'Cleared' : 'Pending Review'}
                </strong>
              </p>
              <button 
                onClick={handleClearanceToggle} 
                className="btn-primary" 
                style={{background: student.Med_Clearance ? '#f59e0b' : '#4ECDC4'}}>
                {student.Med_Clearance ? 'Revoke Clearance' : 'Approve Clearance'}
              </button>
            </div>
          </div>

          {/* Academic History */}
          <div className="modern-card">
            <h2>Academic History</h2>
            {student.academic_histories?.length === 0 ? <p>No academic records found.</p> : (
              <table>
                <thead><tr><th>Term</th><th>Course</th><th>Final Grade</th></tr></thead>
                <tbody>
                  {student.academic_histories?.map(ah => (
                    <tr key={ah.Record_ID}>
                      <td>{ah.Term_Taken}</td>
                      <td>{ah.Course_Code}</td>
                      <td><strong>{ah.Final_Grade}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Non-Academic History */}
          <div className="modern-card">
            <h2>Non-Academic Activities</h2>
            {student.non_academic_histories?.length === 0 ? <p>No activities logged.</p> : (
              <ul style={{paddingLeft: '20px', color: '#cbd5e1'}}>
                {student.non_academic_histories?.map(na => (
                  <li key={na.Activity_ID} style={{marginBottom: '10px'}}>
                    <strong>{na.Activity_Name}</strong> ({na.Activity_Type}) <br/>
                    <small>Logged: {na.Date_Logged} | Contribution: {na.Contribution}</small>
                  </li>
                ))}
              </ul>
            )}
            <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0'}} />
            <form onSubmit={handleLogActivity} style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              <input type="text" placeholder="Type" value={newActivity.type} onChange={e => setNewActivity({...newActivity, type: e.target.value})} required style={inputStyle} />
              <input type="text" placeholder="Activity Name" value={newActivity.name} onChange={e => setNewActivity({...newActivity, name: e.target.value})} required style={inputStyle} />
              <input type="date" value={newActivity.date} onChange={e => setNewActivity({...newActivity, date: e.target.value})} required style={inputStyle} />
              <input type="text" placeholder="Contribution" value={newActivity.contribution} onChange={e => setNewActivity({...newActivity, contribution: e.target.value})} required style={inputStyle} />
              <button type="submit" className="btn-primary">Log Activity</button>
            </form>
          </div>
        </div>

        {/* Right Column: Skills & Disciplinary */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          {/* Skills Repository */}
          <div className="modern-card">
            <h2>Skills Repository</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem'}}>
              {student.skill_repositories?.map(skill => (
                <span key={skill.Skill_ID} className="badge" style={{background: 'rgba(78,205,196,0.1)', color: '#4ECDC4', padding: '0.5rem 1rem'}}>
                  {skill.Specific_Skill} ({skill.Proficiency})
                </span>
              ))}
              {student.skill_repositories?.length === 0 && <p style={{width: '100%'}}>No skills recorded.</p>}
            </div>
            
            <form onSubmit={handleAddSkill} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <input type="text" placeholder="Category (e.g., Technical)" value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} required style={inputStyle} />
              <input type="text" placeholder="Specific Skill" value={newSkill.skill} onChange={e => setNewSkill({...newSkill, skill: e.target.value})} required style={inputStyle} />
              <select value={newSkill.proficiency} onChange={e => setNewSkill({...newSkill, proficiency: e.target.value})} required style={inputStyle}>
                <option value="">Select Proficiency</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button type="submit" className="btn-primary">Add Skill</button>
            </form>
          </div>

          {/* Disciplinary Records */}
          <div className="modern-card">
            <h2>Disciplinary Records</h2>
            {student.disciplinary_records?.length === 0 ? <p>No disciplinary records</p> : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {student.disciplinary_records?.map(rec => (
                   <div key={rec.Violation_ID} style={{background: 'rgba(255,107,107,0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #FF6B6B'}}>
                     <div style={{display: 'flex', justifyContent: 'space-between'}}>
                       <strong>{rec.Offense_Level} Offense</strong>
                       <span style={{color: '#FF6B6B', fontWeight: 'bold'}}>{rec.Status}</span>
                     </div>
                     <p style={{margin: '0.5rem 0', fontSize: '0.9em'}}>Logged: {rec.Date_Logged}</p>
                     
                     {rec.Status !== 'Resolved' && (
                        <button onClick={() => updateDisciplinaryStatus(rec.Violation_ID, 'Resolved')} className="btn-primary" style={{fontSize: '0.8em', padding: '0.3rem 0.6rem', marginTop: '0.5rem'}}>
                          Mark as Resolved
                        </button>
                     )}
                   </div>
                ))}
              </div>
            )}
          </div>

          {/* Affiliations */}
          <div className="modern-card">
            <h2>Affiliations</h2>
            <ul style={{paddingLeft: '20px', color: '#cbd5e1', margin: 0}}>
              {student.affiliations?.map(aff => (
                <li key={aff.Affiliation_ID}>
                  {aff.Org_Name} - <strong style={{color: '#4ECDC4'}}>{aff.Role}</strong>
                </li>
              ))}
              {student.affiliations?.length === 0 && <li>No affiliations listed.</li>}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  flex: '1',
  minWidth: '120px'
};

export default StudentDetail;
