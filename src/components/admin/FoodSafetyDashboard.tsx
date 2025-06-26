import React from 'react';
import { Shield, AlertTriangle, Thermometer, Clock, Package, TrendingUp } from 'lucide-react';
import { useDonations } from '../../contexts/DonationContext';

const FoodSafetyDashboard: React.FC = () => {
  const { donations, getSafetyStats } = useDonations();
  const safetyStats = getSafetyStats();

  // Calculate additional safety metrics
  const recentDonations = donations.filter(d => {
    const hoursOld = (Date.now() - d.submittedAt.getTime()) / (1000 * 60 * 60);
    return hoursOld <= 24;
  });

  const expiringSoon = donations.filter(d => {
    const hoursUntilExpiry = (d.expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0 && d.status !== 'Completed' && d.status !== 'Rejected';
  });

  const temperatureControlled = donations.filter(d => 
    d.storageConditions === 'cold' || d.storageConditions === 'frozen'
  ).length;

  const withSafetyAlerts = donations.filter(d => 
    d.safetyAlerts && d.safetyAlerts.length > 0
  ).length;

  const safetyMetrics = [
    {
      title: 'High Risk Items',
      value: safetyStats.highRisk,
      total: donations.length,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      icon: AlertTriangle,
      description: 'Require immediate attention'
    },
    {
      title: 'Medium Risk Items',
      value: safetyStats.mediumRisk,
      total: donations.length,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      icon: Shield,
      description: 'Need careful handling'
    },
    {
      title: 'Low Risk Items',
      value: safetyStats.lowRisk,
      total: donations.length,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: Package,
      description: 'Safe for collection'
    },
    {
      title: 'Temperature Controlled',
      value: temperatureControlled,
      total: donations.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: Thermometer,
      description: 'Properly refrigerated/frozen'
    },
    {
      title: 'Expiring Soon',
      value: expiringSoon.length,
      total: donations.length,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      icon: Clock,
      description: 'Within 2 hours'
    },
    {
      title: 'With Allergens',
      value: safetyStats.withAllergens,
      total: donations.length,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      icon: AlertTriangle,
      description: 'Require allergen warnings'
    }
  ];

  const safetyGuidelines = [
    {
      category: 'Temperature Control',
      guidelines: [
        'Hot food: Keep above 60°C (140°F)',
        'Cold food: Keep below 4°C (40°F)',
        'Frozen food: Keep below -18°C (0°F)',
        'Room temperature: Max 2 hours for prepared food'
      ]
    },
    {
      category: 'Time Limits',
      guidelines: [
        'Prepared hot food: 4 hours maximum at serving temperature',
        'Prepared cold food: 2 hours maximum at room temperature',
        'Raw meat/dairy: Must remain refrigerated',
        'Packaged food: Check expiration dates'
      ]
    },
    {
      category: 'Hygiene Standards',
      guidelines: [
        'Wash hands before handling food',
        'Use clean containers and utensils',
        'Separate raw and cooked foods',
        'Label food with preparation time and allergens'
      ]
    },
    {
      category: 'Risk Assessment',
      guidelines: [
        'Check food appearance and smell',
        'Verify storage conditions',
        'Document temperature if possible',
        'Report any safety concerns immediately'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-sm text-gray-500">/ {metric.total}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}
                  style={{ width: `${(metric.value / metric.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Safety Alerts */}
      {withSafetyAlerts > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Active Safety Alerts</h3>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                {withSafetyAlerts}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {donations
                .filter(d => d.safetyAlerts && d.safetyAlerts.length > 0)
                .slice(0, 5)
                .map((donation) => (
                  <div key={donation.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-red-900">{donation.donor}</h4>
                        <p className="text-sm text-red-700">{donation.foodType} • {donation.quantity}</p>
                        <div className="mt-2 space-y-1">
                          {donation.safetyAlerts?.map((alert, index) => (
                            <p key={index} className="text-xs text-red-600">{alert}</p>
                          ))}
                        </div>
                      </div>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        ID: {donation.id}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Food Safety Guidelines */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Food Safety Guidelines</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">Essential safety protocols for food handling and distribution</p>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {safetyGuidelines.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{section.category}</h4>
                <ul className="space-y-2">
                  {section.guidelines.map((guideline, guidelineIndex) => (
                    <li key={guidelineIndex} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Safety Performance</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round((safetyStats.lowRisk / donations.length) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Low Risk Donations</p>
              <p className="text-xs text-gray-500 mt-1">Safe for immediate collection</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round((temperatureControlled / donations.length) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Temperature Controlled</p>
              <p className="text-xs text-gray-500 mt-1">Properly stored food items</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {recentDonations.length}
              </div>
              <p className="text-sm text-gray-600">Recent Donations (24h)</p>
              <p className="text-xs text-gray-500 mt-1">Fresh submissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSafetyDashboard;