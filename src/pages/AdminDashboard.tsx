import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/admin/DashboardHeader';
import DashboardStats from '../components/admin/DashboardStats';
import DonationsTable from '../components/admin/DonationsTable';
import InventoryOverview from '../components/admin/InventoryOverview';
import AIAssistant from '../components/admin/AIAssistant';
import AnalyticsChart from '../components/admin/AnalyticsChart';
import VolunteerManagement from '../components/admin/VolunteerManagement';
import FoodSafetyDashboard from '../components/admin/FoodSafetyDashboard';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Dashboard Overview' },
              { id: 'donations', label: 'Active Donations' },
              { id: 'food-safety', label: 'Food Safety Tracking' },
              { id: 'volunteers', label: 'Volunteer Management' },
              { id: 'inventory', label: 'Inventory Management' },
              { id: 'analytics', label: 'Analytics & Reports' },
              { id: 'ai-assistant', label: 'AI Assistant' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <DashboardStats />
              <div className="grid lg:grid-cols-2 gap-6">
                <DonationsTable />
                <InventoryOverview />
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Active Donations</h1>
              <DonationsTable expanded />
            </div>
          )}

          {activeTab === 'food-safety' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Food Safety Tracking</h1>
              <FoodSafetyDashboard />
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Volunteer Management</h1>
              <VolunteerManagement />
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
              <InventoryOverview expanded />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
              <AnalyticsChart />
            </div>
          )}

          {activeTab === 'ai-assistant' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
              <AIAssistant />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;