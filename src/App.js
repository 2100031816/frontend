import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import UpgradePage from './pages/UpgradePage';
import InvitePage from './pages/InvitePage';
import { AuthProvider } from './services/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/invite" element={<InvitePage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
