import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsChart: React.FC = () => {
  const donationData = [
    { name: 'Mon', donations: 12, meals: 234 },
    { name: 'Tue', donations: 19, meals: 456 },
    { name: 'Wed', donations: 15, meals: 389 },
    { name: 'Thu', donations: 22, meals: 567 },
    { name: 'Fri', donations: 28, meals: 723 },
    { name: 'Sat', donations: 18, meals: 445 },
    { name: 'Sun', donations: 14, meals: 298 }
  ];

  const categoryData = [
    { name: 'Prepared Meals', value: 45, color: '#F97316' },
    { name: 'Bread & Bakery', value: 25, color: '#14B8A6' },
    { name: 'Fruits & Vegetables', value: 20, color: '#3B82F6' },
    { name: 'Dairy Products', value: 10, color: '#8B5CF6' }
  ];

  const impactData = [
    { month: 'Jan', mealsRescued: 2847, co2Saved: 1423 },
    { month: 'Feb', mealsRescued: 3156, co2Saved: 1578 },
    { month: 'Mar', mealsRescued: 3689, co2Saved: 1844 },
    { month: 'Apr', mealsRescued: 3247, co2Saved: 1623 },
    { month: 'May', mealsRescued: 4156, co2Saved: 2078 },
    { month: 'Jun', mealsRescued: 4523, co2Saved: 2261 }
  ];

  return (
    <div className="space-y-6">
      {/* Weekly Donations Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Donations Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="donations" fill="#F97316" name="Number of Donations" />
            <Bar dataKey="meals" fill="#14B8A6" name="Meals Rescued" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Food Categories Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Categories Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mealsRescued" 
                stroke="#F97316" 
                strokeWidth={2}
                name="Meals Rescued"
              />
              <Line 
                type="monotone" 
                dataKey="co2Saved" 
                stroke="#14B8A6" 
                strokeWidth={2}
                name="CO2 Saved (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Impact This Month', value: '4,523 meals', color: 'text-primary-600' },
          { title: 'CO2 Emissions Saved', value: '2,261 kg', color: 'text-green-600' },
          { title: 'Active Donors', value: '127 partners', color: 'text-secondary-600' },
          { title: 'Success Rate', value: '94.2%', color: 'text-accent-600' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">{metric.title}</p>
            <p className={`text-2xl font-bold ${metric.color} mt-1`}>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;