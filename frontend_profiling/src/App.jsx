import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import StudentsList from './pages/StudentsList';
import StudentDetail from './pages/StudentDetail';
import RegisterStudent from './pages/RegisterStudent';
import FacultyList from './pages/FacultyList';
import FacultyDetail from './pages/FacultyDetail';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      {/* Top Header for toggling the sidebar */}
      <header className="top-header">
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Menu"
        >
          <svg style={{width: '24px', height: '24px', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none'}} viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span className="header-title">ProfileSys</span>
      </header>

      {/* Sidebar Overlay for closing when clicking outside */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>ProfileSys</h1>
          <button 
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <span className="icon"></span> Dashboard
          </Link>
          <Link to="/students" className={location.pathname.startsWith('/students') ? 'active' : ''}>
            <span className="icon"></span> Students
          </Link>
          <Link to="/faculties" className={location.pathname.startsWith('/faculties') ? 'active' : ''}>
            <span className="icon"></span> Faculty
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/register" element={<RegisterStudent />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/faculties" element={<FacultyList />} />
          <Route path="/faculties/:id" element={<FacultyDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
