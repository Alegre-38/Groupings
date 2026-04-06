import React from 'react';

function Dashboard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Students</h3>
            <p className="stat-value">1,248</p>
          </div>
          <div className="stat-icon"></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Faculty</h3>
            <p className="stat-value">156</p>
          </div>
          <div className="stat-icon"></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Disciplinary Cases</h3>
            <p className="stat-value">12</p>
          </div>
          <div className="stat-icon" style={{color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)'}}></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Pending Clearances</h3>
            <p className="stat-value">45</p>
          </div>
          <div className="stat-icon" style={{color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)'}}></div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="modern-card">
          <h2>System Analytics</h2>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>System health and enrollment metrics are looking solid. A visual chart will be embedded here.</p>
          <div style={{ height: '240px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1.5rem', color: '#94a3b8', fontWeight: '500' }}>
            Analytics Chart Visualization
          </div>
        </div>

        <div className="modern-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon"></div>
              <div className="activity-details">
                <p><strong>Jane Doe</strong> updated profile details.</p>
                <small>2 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}></div>
              <div className="activity-details">
                <p>New disciplinary record logged for Student #1042.</p>
                <small>5 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{background: 'rgba(56, 189, 248, 0.1)', color: '#0284c7'}}></div>
              <div className="activity-details">
                <p><strong>Dr. Smith</strong> assigned new advisory role.</p>
                <small>1 day ago</small>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a'}}></div>
              <div className="activity-details">
                <p>Full database backup completed successfully.</p>
                <small>2 days ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
