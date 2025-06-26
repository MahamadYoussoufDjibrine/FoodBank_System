import React from 'react';
import { Users, Package, MapPin, Clock, Leaf, TrendingUp } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    { icon: Package, value: '12,847', label: 'Meals Rescued', color: 'text-primary-600', description: 'This month' },
    { icon: Users, value: '8,520', label: 'People Fed', color: 'text-secondary-600', description: 'Families supported' },
    { icon: MapPin, value: '247', label: 'Partner Locations', color: 'text-accent-600', description: 'Active donors' },
    { icon: Leaf, value: '6.2T', label: 'CO₂ Saved', color: 'text-green-600', description: 'Environmental impact' },
    { icon: TrendingUp, value: '94%', label: 'Success Rate', color: 'text-purple-600', description: 'Collection efficiency' },
    { icon: Clock, value: '18min', label: 'Avg Response', color: 'text-orange-600', description: 'Pickup time' },
  ];

  return (
    <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Community Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time metrics showing the difference we're making together in reducing waste and feeding communities.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-slide-up bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-900 text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.description}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium text-primary-600">Environmental:</span> Every meal rescued prevents 2.5kg of CO₂ emissions and saves 1,800L of water.
              </div>
              <div>
                <span className="font-medium text-secondary-600">Social:</span> Our network supports 150+ local charities and community organizations.
              </div>
              <div>
                <span className="font-medium text-accent-600">Economic:</span> Donors save an average of $2,400 annually in waste disposal costs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;