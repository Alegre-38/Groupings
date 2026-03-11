import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import StudentsList from './pages/StudentsList';
import StudentDetail from './pages/StudentDetail';
import FacultyList from './pages/FacultyList';
import FacultyDetail from './pages/FacultyDetail';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <header>
        <h1>Profiling System</h1>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          <Link to="/students" className={location.pathname.startsWith('/students') ? 'active' : ''}>Students</Link>
          <Link to="/faculties" className={location.pathname.startsWith('/faculties') ? 'active' : ''}>Faculty</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/faculties" element={<FacultyList />} />
          <Route path="/faculties/:id" element={<FacultyDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
