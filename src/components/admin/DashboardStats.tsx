import React from 'react';
import { Package, Clock, Users, MapPin, TrendingUp, AlertTriangle, Shield, Thermometer } from 'lucide-react';
import { useDonations } from '../../contexts/DonationContext';

const DashboardStats: React.FC = () => {
  const { getStats, donations, getSafetyStats } = useDonations();
  const stats = getStats();
  const safetyStats = getSafetyStats();

  // Calculate urgent donations (expiring within 2 hours)
  const urgentDonations = donations.filter(d => {
    const hoursUntilExpiry = (d.expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0 && d.status !== 'Completed' && d.status !== 'Rejected';
  }).length;

  // Calculate safety alerts
  const activeSafetyAlerts = donations.filter(d => 
    d.safetyAlerts && d.safetyAlerts.length > 0 && d.status !== 'Completed' && d.status !== 'Rejected'
  ).length;

  const dashboardStats = [
    {
      title: 'Total Donations',
      value: stats.total.toString(),
      change: `${stats.pending} pending review`,
      icon: Package,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      title: 'Pending Review',
      value: stats.pending.toString(),
      change: 'Require admin action',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Active Collections',
      value: (stats.approved + stats.inTransit).toString(),
      change: `${stats.inTransit} in transit`,
      icon: Users,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      title: 'Completed Today',
      value: stats.completed.toString(),
      change: 'Successfully collected',
      icon: MapPin,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      title: 'Success Rate',
      value: stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : '0%',
      change: 'Overall completion rate',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Urgent Alerts',
      value: urgentDonations.toString(),
      change: 'Expiring within 2 hours',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Safety Alerts',
      value: activeSafetyAlerts.toString(),
      change: 'Active food safety concerns',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'High Risk Items',
      value: safetyStats.highRisk.toString(),
      change: 'Require immediate attention',
      icon: Thermometer,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;