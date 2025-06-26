import React, { useState } from 'react';
import { Clock, MapPin, Phone, Package, Check, X, User, AlertTriangle, Thermometer, Shield } from 'lucide-react';
import { useDonations, Donation } from '../../contexts/DonationContext';
import { useVolunteers } from '../../contexts/VolunteerContext';

interface DonationsTableProps {
  expanded?: boolean;
}

const DonationsTable: React.FC<DonationsTableProps> = ({ expanded = false }) => {
  const { donations, updateDonationStatus, assignVolunteer } = useDonations();
  const { volunteers } = useVolunteers();
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [volunteerName, setVolunteerName] = useState('');

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-purple-100 text-purple-800';
      case 'In Transit': return 'bg-indigo-100 text-indigo-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const handleApprove = (donation: Donation) => {
    updateDonationStatus(donation.id, 'Approved');
  };

  const handleReject = () => {
    if (selectedDonation && rejectionReason.trim()) {
      updateDonationStatus(selectedDonation.id, 'Rejected', rejectionReason);
      setShowRejectModal(false);
      setSelectedDonation(null);
      setRejectionReason('');
    }
  };

  const handleAssign = () => {
    if (selectedDonation && volunteerName.trim()) {
      assignVolunteer(selectedDonation.id, volunteerName);
      setShowAssignModal(false);
      setSelectedDonation(null);
      setVolunteerName('');
    }
  };

  const handleMarkInTransit = (donation: Donation) => {
    updateDonationStatus(donation.id, 'In Transit');
  };

  const handleMarkCompleted = (donation: Donation) => {
    updateDonationStatus(donation.id, 'Completed');
  };

  // Get active volunteers for assignment dropdown
  const activeVolunteers = volunteers.filter(volunteer => volunteer.status === 'Active');

  const displayDonations = expanded ? donations : donations.slice(0, 5);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Donation Management</h3>
          <p className="text-sm text-gray-500 mt-1">Review and manage food donations with safety tracking</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donation Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location & Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food Safety
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Package className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{donation.donor}</p>
                        <p className="text-sm text-gray-600">{donation.foodType}</p>
                        <p className="text-xs text-gray-500">Qty: {donation.quantity}</p>
                        <p className="text-xs text-gray-400">ID: {donation.id}</p>
                        {donation.assignedVolunteer && (
                          <p className="text-xs text-blue-600 flex items-center mt-1">
                            <User className="h-3 w-3 mr-1" />
                            {volunteers.find(v => v.id === donation.assignedVolunteer)?.name || donation.assignedVolunteer}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-900">{donation.location}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {donation.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSafetyColor(donation.safetyScore)}`}>
                          {getSafetyLabel(donation.safetyScore)}
                        </span>
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
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <span>{getStorageIcon(donation.storageConditions)}</span>
                        <span>{donation.storageConditions || 'Unknown'}</span>
                      </div>
                      {donation.allergens && donation.allergens.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {donation.allergens.slice(0, 2).map((allergen, index) => (
                            <span key={index} className="inline-flex px-1 py-0.5 text-xs bg-orange-100 text-orange-800 rounded">
                              {allergen}
                            </span>
                          ))}
                          {donation.allergens.length > 2 && (
                            <span className="text-xs text-gray-500">+{donation.allergens.length - 2}</span>
                          )}
                        </div>
                      )}
                      {donation.safetyAlerts && donation.safetyAlerts.length > 0 && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(donation.urgency)}`}>
                          {donation.urgency}
                        </span>
                        {isExpiringSoon(donation.expiryTime) && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeUntilExpiry(donation.expiryTime)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      {donation.status === 'Pending Review' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(donation)}
                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                          >
                            <Check className="h-3 w-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setShowRejectModal(true);
                            }}
                            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                          >
                            <X className="h-3 w-3" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                      
                      {donation.status === 'Approved' && (
                        <button
                          onClick={() => {
                            setSelectedDonation(donation);
                            setShowAssignModal(true);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          Assign Volunteer
                        </button>
                      )}
                      
                      {donation.status === 'Assigned' && (
                        <button
                          onClick={() => handleMarkInTransit(donation)}
                          className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
                        >
                          Mark In Transit
                        </button>
                      )}
                      
                      {donation.status === 'In Transit' && (
                        <button
                          onClick={() => handleMarkCompleted(donation)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!expanded && donations.length > 5 && (
          <div className="p-4 border-t border-gray-200 text-center">
            <button className="text-primary-600 hover:text-primary-800 font-medium text-sm">
              View All Donations ({donations.length}) →
            </button>
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
                <h3 className="text-lg font-semibold text-gray-900">Food Safety Details</h3>
              </div>
              <button
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
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
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Food Category</h4>
                  <span className="capitalize bg-gray-100 px-3 py-1 rounded-lg">
                    {selectedDonation.foodCategory || 'Unknown'}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Temperature Log</h4>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    {selectedDonation.temperatureLog || 'Not recorded'}
                  </span>
                </div>
              </div>
              
              {selectedDonation.preparationTime && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Preparation Time</h4>
                  <p className="text-gray-600">
                    {selectedDonation.preparationTime.toLocaleString()}
                  </p>
                </div>
              )}
              
              {selectedDonation.allergens && selectedDonation.allergens.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Allergen Information</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDonation.allergens.map((allergen, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedDonation.handlingNotes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Handling Notes</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedDonation.handlingNotes}
                  </p>
                </div>
              )}
              
              {selectedDonation.safetyAlerts && selectedDonation.safetyAlerts.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-900 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Safety Alerts
                  </h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    {selectedDonation.safetyAlerts.map((alert, index) => (
                      <p key={index} className="text-red-700 text-sm">{alert}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Donation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this donation from {selectedDonation.donor}:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
              placeholder="Enter rejection reason..."
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedDonation(null);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Donation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Volunteer Modal */}
      {showAssignModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign Volunteer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Assign a volunteer to collect donation from {selectedDonation.donor}:
            </p>
            <select
              value={volunteerName}
              onChange={(e) => setVolunteerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            >
              <option value="">Select a volunteer...</option>
              {activeVolunteers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.name} ({volunteer.email})
                </option>
              ))}
            </select>
            {activeVolunteers.length === 0 && (
              <p className="text-sm text-red-600 mb-4">
                No active volunteers available. Please add volunteers first.
              </p>
            )}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedDonation(null);
                  setVolunteerName('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!volunteerName || activeVolunteers.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Volunteer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationsTable;