import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerLogin from './pages/VolunteerLogin';
import VolunteerDashboard from './pages/VolunteerDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { DonationProvider } from './contexts/DonationContext';
import { VolunteerProvider } from './contexts/VolunteerContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DonationProvider>
          <VolunteerProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/volunteer" element={<VolunteerLogin />} />
                  <Route path="/volunteer/dashboard/:volunteerId" element={<VolunteerDashboard />} />
                </Routes>
              </div>
            </Router>
          </VolunteerProvider>
        </DonationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;