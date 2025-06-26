import React from 'react';
import { Package, TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface InventoryOverviewProps {
  expanded?: boolean;
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ expanded = false }) => {
  const inventory = [
    {
      category: 'Prepared Meals',
      current: 145,
      capacity: 200,
      status: 'Good',
      trend: 'up',
      lastUpdated: '5 mins ago'
    },
    {
      category: 'Fruits & Vegetables',
      current: 89,
      capacity: 150,
      status: 'Low',
      trend: 'down',
      lastUpdated: '12 mins ago'
    },
    {
      category: 'Bread & Bakery',
      current: 67,
      capacity: 100,
      status: 'Medium',
      trend: 'up',
      lastUpdated: '8 mins ago'
    },
    {
      category: 'Dairy Products',
      current: 23,
      capacity: 80,
      status: 'Very Low',
      trend: 'down',
      lastUpdated: '3 mins ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-orange-600 bg-orange-100';
      case 'Very Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressWidth = (current: number, capacity: number) => {
    return Math.min((current / capacity) * 100, 100);
  };

  const getProgressColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage > 70) return 'bg-green-500';
    if (percentage > 40) return 'bg-yellow-500';
    if (percentage > 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const displayInventory = expanded ? inventory : inventory.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Inventory Overview</h3>
        <p className="text-sm text-gray-500 mt-1">Current stock levels by category</p>
      </div>
      
      <div className="p-6 space-y-4">
        {displayInventory.map((item, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary-100 p-2 rounded-lg">
                  <Package className="h-4 w-4 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.category}</h4>
                  <p className="text-sm text-gray-500">{item.current} / {item.capacity} units</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                {item.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.current, item.capacity)}`}
                style={{ width: `${getProgressWidth(item.current, item.capacity)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{Math.round(getProgressWidth(item.current, item.capacity))}% capacity</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {item.lastUpdated}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {!expanded && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-primary-600 hover:text-primary-800 font-medium text-sm">
            View Full Inventory →
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryOverview;