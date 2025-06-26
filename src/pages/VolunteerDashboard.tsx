import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDonations } from '../contexts/DonationContext';
import { useVolunteers } from '../contexts/VolunteerContext';
import { Package, MapPin, Phone, Clock, CheckCircle, Truck, User, LogOut, Shield, AlertTriangle, Thermometer, Bell } from 'lucide-react';

const VolunteerDashboard: React.FC = () => {
  const { volunteerId } = useParams<{ volunteerId: string }>();
  const { donations, updateDonationStatus } = useDonations();
  const { getVolunteerById } = useVolunteers();
  const navigate = useNavigate();
  const [volunteerName, setVolunteerName] = useState('');
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [newAssignments, setNewAssignments] = useState<string[]>([]);
  const [lastChecked, setLastChecked] = useState<number>(0);

  // Get volunteer's assigned donations
  const volunteerDonations = donations.filter(
    donation => donation.assignedVolunteer === volunteerId && 
    (donation.status === 'Assigned' || donation.status === 'In Transit')
  );

  const completedDonations = donations.filter(
    donation => donation.assignedVolunteer === volunteerId && 
    donation.status === 'Completed'
  );

  // Calculate safety metrics for volunteer
  const highRiskAssignments = volunteerDonations.filter(d => {
    const score = d.safetyScore || 100;
    return score < 60;
  }).length;

  const withSafetyAlerts = volunteerDonations.filter(d => 
    d.safetyAlerts && d.safetyAlerts.length > 0
  ).length;

  useEffect(() => {
    // Get volunteer information
    const volunteer = getVolunteerById(volunteerId || '');
    if (volunteer) {
      setVolunteerName(volunteer.name);
    } else {
      // Fallback to ID-based names for demo
      const volunteerNames: { [key: string]: string } = {
        'john.smith': 'John Smith',
        'sarah.johnson': 'Sarah Johnson',
        'mike.davis': 'Mike Davis',
        'emily.brown': 'Emily Brown',
        'david.wilson': 'David Wilson',
        'john@foodbank.org': 'John Smith',
        'sarah@foodbank.org': 'Sarah Johnson',
        'mike@foodbank.org': 'Mike Davis',
        'emily@foodbank.org': 'Emily Brown',
        'david@foodbank.org': 'David Wilson'
      };
      
      setVolunteerName(volunteerNames[volunteerId || ''] || volunteerId || 'Volunteer');
    }
  }, [volunteerId, getVolunteerById]);

  // Enhanced notification system - check for new assignments
  useEffect(() => {
    const currentTime = Date.now();
    const currentAssignments = volunteerDonations.map(d => ({
      id: d.id,
      assignedAt: d.submittedAt.getTime() // Use submission time as proxy for assignment time
    }));
    
    // Get stored data
    const storageKey = `volunteer_${volunteerId}_data`;
    const storedData = JSON.parse(localStorage.getItem(storageKey) || '{"assignments": [], "lastChecked": 0}');
    
    // Find truly new assignments (assigned after last check)
    const newOnes = currentAssignments.filter(assignment => {
      const wasNotPreviouslyAssigned = !storedData.assignments.some((stored: any) => stored.id === assignment.id);
      const assignedAfterLastCheck = assignment.assignedAt > storedData.lastChecked;
      return wasNotPreviouslyAssigned || assignedAfterLastCheck;
    });
    
    if (newOnes.length > 0) {
      setNewAssignments(newOnes.map(a => a.id));
      
      // Show browser notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Food Collection Assignment!', {
          body: `You have ${newOnes.length} new collection${newOnes.length > 1 ? 's' : ''} assigned.`,
          icon: '/favicon.ico'
        });
      }
      
      // Auto-clear notifications after 15 seconds
      setTimeout(() => {
        setNewAssignments([]);
      }, 15000);
    }
    
    // Update stored data
    localStorage.setItem(storageKey, JSON.stringify({
      assignments: currentAssignments,
      lastChecked: currentTime
    }));
    
    setLastChecked(currentTime);
  }, [volunteerDonations, volunteerId]);

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleStartCollection = (donationId: string) => {
    updateDonationStatus(donationId, 'In Transit');
    // Remove from new assignments when action is taken
    setNewAssignments(prev => prev.filter(id => id !== donationId));
  };

  const handleCompleteCollection = (donationId: string) => {
    updateDonationStatus(donationId, 'Completed');
    // Remove from new assignments when action is taken
    setNewAssignments(prev => prev.filter(id => id !== donationId));
  };

  const getTimeUntilExpiry = (expiryTime: Date) => {
    const hoursUntilExpiry = (expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursUntilExpiry < 0) return 'Expired';
    if (hoursUntilExpiry < 1) return `${Math.round(hoursUntilExpiry * 60)}m left`;
    return `${Math.round(hoursUntilExpiry)}h left`;
  };

  const isExpiringSoon = (expiryTime: Date) => {
    const hoursUntilExpiry = (expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0;
  };

  const getSafetyColor = (score?: number) => {
    if (!score) return 'bg-gray-100 text-gray-800';
    if (score < 60) return 'bg-red-100 text-red-800';
    if (score < 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getSafetyLabel = (score?: number) => {
    if (!score) return 'Unknown';
    if (score < 60) return 'High Risk';
    if (score < 80) return 'Medium Risk';
    return 'Low Risk';
  };

  const getStorageIcon = (conditions?: string) => {
    switch (conditions) {
      case 'hot': return '🔥';
      case 'cold': return '❄️';
      case 'frozen': return '🧊';
      case 'ambient': return '🌡️';
      default: return '❓';
    }
  };

  const dismissNewAssignment = (donationId: string) => {
    setNewAssignments(prev => prev.filter(id => id !== donationId));
  };

  const dismissAllNotifications = () => {
    setNewAssignments([]);
  };

  const handleLogout = () => {
    // Clear volunteer-specific data on logout
    localStorage.removeItem(`volunteer_${volunteerId}_data`);
    navigate('/volunteer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-secondary-600 to-accent-600 p-2 rounded-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Volunteer Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {volunteerName}</p>
              </div>
              {newAssignments.length > 0 && (
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full animate-pulse">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm font-medium">{newAssignments.length} new assignment{newAssignments.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Assignment Notifications */}
        {newAssignments.length > 0 && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-blue-900">🔔 New Assignments</h3>
              <button
                onClick={dismissAllNotifications}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Dismiss All
              </button>
            </div>
            {newAssignments.map((assignmentId) => {
              const donation = donations.find(d => d.id === assignmentId);
              if (!donation) return null;
              
              return (
                <div key={assignmentId} className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-4 animate-slide-up shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">🎯 New Collection Assignment!</h4>
                        <p className="text-sm text-blue-800">
                          <strong>{donation.donor}</strong> - {donation.foodType} ({donation.quantity})
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-blue-700">
                          <span>📍 {donation.location}</span>
                          <span>⏰ Expires: {getTimeUntilExpiry(donation.expiryTime)}</span>
                          <span>🛡️ Safety: {donation.safetyScore || 'N/A'}/100</span>
                        </div>
                        {donation.urgency === 'High' && (
                          <span className="inline-block mt-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            🚨 HIGH PRIORITY
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => dismissNewAssignment(assignmentId)}
                      className="text-blue-400 hover:text-blue-600 text-xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Collections</p>
                <p className="text-3xl font-bold text-secondary-600 mt-2">{volunteerDonations.length}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-secondary-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{completedDonations.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Items</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{highRiskAssignments}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Safety Alerts</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{withSafetyAlerts}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Guidelines Banner */}
        {(highRiskAssignments > 0 || withSafetyAlerts > 0) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-900">Food Safety Reminder</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  You have high-risk items assigned. Please follow safety protocols: verify food condition, 
                  maintain temperature control, and document any concerns.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Active Collections */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Active Collections</h2>
            <p className="text-sm text-gray-500 mt-1">Donations assigned to you for pickup with safety information</p>
          </div>
          
          {volunteerDonations.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active collections assigned</p>
              <p className="text-sm text-gray-400 mt-1">Check back later for new assignments</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {volunteerDonations.map((donation) => (
                <div 
                  key={donation.id} 
                  className={`p-6 transition-all duration-300 ${
                    newAssignments.includes(donation.id) 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 shadow-md' 
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{donation.donor}</h3>
                          <p className="text-sm text-gray-600">{donation.foodType} • {donation.quantity}</p>
                        </div>
                        {newAssignments.includes(donation.id) && (
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                            🆕 NEW ASSIGNMENT
                          </span>
                        )}
                        {isExpiringSoon(donation.expiryTime) && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            URGENT
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(donation.safetyScore)}`}>
                          {getSafetyLabel(donation.safetyScore)}
                        </span>
                      </div>
                      
                      {/* Safety Information */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-blue-900">Food Safety Information</h4>
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setShowSafetyModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Shield className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-blue-700 font-medium">Storage:</span>
                            <div className="flex items-center space-x-1">
                              <span>{getStorageIcon(donation.storageConditions)}</span>
                              <span className="capitalize">{donation.storageConditions || 'Unknown'}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-700 font-medium">Category:</span>
                            <span className="capitalize ml-1">{donation.foodCategory || 'Unknown'}</span>
                          </div>
                          {donation.allergens && donation.allergens.length > 0 && (
                            <div className="col-span-2">
                              <span className="text-blue-700 font-medium">Allergens:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {donation.allergens.map((allergen, index) => (
                                  <span key={index} className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">
                                    {allergen}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {donation.safetyAlerts && donation.safetyAlerts.length > 0 && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                            <div className="flex items-center space-x-1 mb-1">
                              <AlertTriangle className="h-3 w-3 text-red-600" />
                              <span className="text-xs font-medium text-red-900">Safety Alerts:</span>
                            </div>
                            {donation.safetyAlerts.map((alert, index) => (
                              <p key={index} className="text-xs text-red-700">{alert}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Pickup Location</p>
                            <p className="text-sm text-gray-600">{donation.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Contact</p>
                            <p className="text-sm text-gray-600">{donation.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {getTimeUntilExpiry(donation.expiryTime)}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          ID: {donation.id}
                        </span>
                        <span className="flex items-center">
                          <Thermometer className="h-4 w-4 mr-1" />
                          Score: {donation.safetyScore || 'N/A'}/100
                        </span>
                      </div>
                      
                      {(donation.specialInstructions || donation.handlingNotes) && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          {donation.specialInstructions && (
                            <>
                              <p className="text-sm font-medium text-blue-900">Special Instructions:</p>
                              <p className="text-sm text-blue-700 mt-1">{donation.specialInstructions}</p>
                            </>
                          )}
                          {donation.handlingNotes && (
                            <>
                              <p className="text-sm font-medium text-blue-900 mt-2">Handling Notes:</p>
                              <p className="text-sm text-blue-700 mt-1">{donation.handlingNotes}</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6 flex flex-col space-y-2">
                      {donation.status === 'Assigned' && (
                        <button
                          onClick={() => handleStartCollection(donation.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Start Collection
                        </button>
                      )}
                      
                      {donation.status === 'In Transit' && (
                        <button
                          onClick={() => handleCompleteCollection(donation.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Mark Completed
                        </button>
                      )}
                      
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        donation.status === 'Assigned' 
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Collections */}
        {completedDonations.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recently Completed</h2>
              <p className="text-sm text-gray-500 mt-1">Your successful collections</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {completedDonations.slice(0, 3).map((donation) => (
                <div key={donation.id} className="p-6 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{donation.donor}</h3>
                        <p className="text-xs text-gray-600">{donation.foodType} • {donation.quantity}</p>
                        <p className="text-xs text-gray-500">Safety Score: {donation.safetyScore || 'N/A'}/100</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Safety Details Modal */}
      {showSafetyModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Complete Safety Information</h3>
              </div>
              <button
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Safety Score</h4>
                  <div className={`inline-flex px-3 py-2 rounded-lg ${getSafetyColor(selectedDonation.safetyScore)}`}>
                    <span className="font-semibold">{selectedDonation.safetyScore || 'N/A'}/100</span>
                    <span className="ml-2">{getSafetyLabel(selectedDonation.safetyScore)}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Storage Conditions</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getStorageIcon(selectedDonation.storageConditions)}</span>
                    <span className="capitalize">{selectedDonation.storageConditions || 'Unknown'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">Collection Guidelines</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Verify food condition upon arrival</li>
                  <li>• Check temperature if possible</li>
                  <li>• Use appropriate containers for storage type</li>
                  <li>• Document any safety concerns</li>
                  <li>• Follow allergen handling protocols</li>
                </ul>
              </div>
              
              {selectedDonation.temperatureLog && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Temperature Log</h4>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    {selectedDonation.temperatureLog}
                  </span>
                </div>
              )}
              
              {selectedDonation.allergens && selectedDonation.allergens.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Allergen Information</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDonation.allergens.map((allergen: string, index: number) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;