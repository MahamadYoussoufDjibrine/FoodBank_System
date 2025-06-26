import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, User, Mail, ArrowRight, Home } from 'lucide-react';
import { useVolunteers } from '../contexts/VolunteerContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const VolunteerLogin: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { volunteers } = useVolunteers();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const cleanIdentifier = identifier.trim().toLowerCase();
    
    if (!cleanIdentifier) {
      setError('Please enter your volunteer ID, email, or number');
      return;
    }
    
    // Check against actual volunteer database
    const volunteer = volunteers.find(v => 
      v.id.toLowerCase() === cleanIdentifier ||
      v.email.toLowerCase() === cleanIdentifier ||
      v.name.toLowerCase().replace(/\s+/g, '.') === cleanIdentifier
    );
    
    if (volunteer) {
      if (volunteer.status === 'Active') {
        navigate(`/volunteer/dashboard/${volunteer.id}`);
      } else {
        setError(`Your volunteer account is currently ${volunteer.status.toLowerCase()}. Please contact admin.`);
      }
    } else {
      // Fallback for demo accounts
      const demoVolunteers = [
        'john.smith', 'sarah.johnson', 'mike.davis', 'emily.brown', 'david.wilson',
        'john@foodbank.org', 'sarah@foodbank.org', 'mike@foodbank.org', 
        'emily@foodbank.org', 'david@foodbank.org',
        '1001', '1002', '1003', '1004', '1005'
      ];
      
      if (demoVolunteers.includes(cleanIdentifier)) {
        navigate(`/volunteer/dashboard/${cleanIdentifier}`);
      } else {
        setError('Invalid volunteer identifier. Please check your ID, email, or contact admin.');
      }
    }
  };

  // Get some active volunteers for quick access
  const activeVolunteers = volunteers.filter(v => v.status === 'Active').slice(0, 3);
  
  const quickAccess = activeVolunteers.length > 0 ? activeVolunteers.map(v => ({
    id: v.id,
    name: v.name,
    type: v.email.includes('@') ? 'Email' : 'ID'
  })) : [
    { id: 'john.smith', name: 'John Smith', type: 'ID' },
    { id: 'sarah@foodbank.org', name: 'Sarah Johnson', type: 'Email' },
    { id: '1003', name: 'Mike Davis', type: 'Number' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        {/* Back to Home Link */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-secondary-600 transition-colors text-sm"
          >
            <Home className="h-4 w-4" />
            <span>{t('nav.backToHome')}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="bg-gradient-to-r from-secondary-600 to-accent-600 p-6 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('login.volunteerAccess')}</h1>
          <p className="text-white/80 mt-2">{t('login.enterIdEmail')}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('login.volunteerIdentifier')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder={t('login.enterIdEmail')}
                required
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-3 rounded-lg font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>{t('login.accessDashboard')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-3">
              {activeVolunteers.length > 0 ? `${t('login.quickAccess')}:` : t('login.demoAccess')}
            </h3>
            <div className="space-y-2">
              {quickAccess.map((volunteer) => (
                <button
                  key={volunteer.id}
                  type="button"
                  onClick={() => setIdentifier(volunteer.id)}
                  className="w-full text-left px-3 py-2 bg-white border border-blue-200 rounded text-sm hover:bg-blue-50 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-blue-900">{volunteer.name}</span>
                  <div className="flex items-center space-x-2">
                    {volunteer.type === 'Email' && <Mail className="h-3 w-3 text-blue-600" />}
                    {volunteer.type === 'ID' && <User className="h-3 w-3 text-blue-600" />}
                    <span className="text-xs text-blue-600">{volunteer.id}</span>
                  </div>
                </button>
              ))}
            </div>
            {activeVolunteers.length === 0 && (
              <p className="text-xs text-blue-700 mt-2">
                Note: These are demo accounts. New volunteers added by admin will appear here.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerLogin;