import React, { useState } from 'react';
import { X, MapPin, Clock, Package, User, Thermometer, Shield, AlertTriangle } from 'lucide-react';
import { useDonations } from '../contexts/DonationContext';

interface DonationFormProps {
  onClose: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onClose }) => {
  const { addDonation } = useDonations();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSafetyChecklist, setShowSafetyChecklist] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    donor: '',
    organizationType: 'restaurant',
    foodType: '',
    quantity: '',
    expiryTime: '',
    location: '',
    phone: '',
    specialInstructions: '',
    urgency: 'Medium' as 'High' | 'Medium' | 'Low',
    // New food safety fields
    storageConditions: 'ambient' as 'hot' | 'cold' | 'ambient' | 'frozen',
    foodCategory: 'prepared' as 'prepared' | 'raw' | 'packaged',
    preparationTime: '',
    temperatureLog: '',
    allergens: [] as string[],
    handlingNotes: '',
    safetyChecked: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const allergenOptions = [
    'Nuts', 'Dairy', 'Eggs', 'Gluten', 'Soy', 'Shellfish', 'Fish', 'Sesame'
  ];

  // Comprehensive form validation
  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    // Basic required fields
    if (!formData.donor.trim()) errors.push('Donor name is required');
    if (!formData.foodType.trim()) errors.push('Food type is required');
    if (!formData.quantity.trim()) errors.push('Quantity is required');
    if (!formData.location.trim()) errors.push('Pickup address is required');
    if (!formData.phone.trim()) errors.push('Contact phone is required');
    if (!formData.expiryTime) errors.push('Best before time is required');
    
    // Validate expiry time
    if (formData.expiryTime) {
      const expiryDate = new Date(formData.expiryTime);
      const now = new Date();
      
      if (expiryDate <= now) {
        errors.push('Best before time must be in the future');
      }
      
      // Check if expiry is too far in the future (more than 7 days)
      const maxFutureTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (expiryDate > maxFutureTime) {
        errors.push('Best before time cannot be more than 7 days in the future');
      }
    }
    
    // Validate preparation time if provided
    if (formData.preparationTime) {
      const prepTime = new Date(formData.preparationTime);
      const now = new Date();
      
      if (prepTime > now) {
        errors.push('Preparation time cannot be in the future');
      }
      
      // Check if preparation time is too old (more than 3 days)
      const minPastTime = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      if (prepTime < minPastTime) {
        errors.push('Preparation time cannot be more than 3 days ago');
      }
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form first
    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors([]);
    
    // Run safety checks before submission
    const alerts = runSafetyChecks();
    if (alerts.length > 0) {
      setSafetyAlerts(alerts);
      setShowSafetyChecklist(true);
      return;
    }
    
    // Calculate urgency based on expiry time and storage conditions
    const expiryDate = new Date(formData.expiryTime);
    const hoursUntilExpiry = (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60);
    
    let urgency: 'High' | 'Medium' | 'Low' = 'Medium';
    
    // Adjust urgency based on storage conditions and time
    if (formData.storageConditions === 'hot' && hoursUntilExpiry <= 4) urgency = 'High';
    else if (formData.storageConditions === 'ambient' && hoursUntilExpiry <= 2) urgency = 'High';
    else if (hoursUntilExpiry <= 6) urgency = 'Medium';
    else urgency = 'Low';

    addDonation({
      donor: formData.donor,
      organizationType: formData.organizationType,
      foodType: formData.foodType,
      quantity: formData.quantity,
      location: formData.location,
      phone: formData.phone,
      urgency,
      expiryTime: expiryDate,
      specialInstructions: formData.specialInstructions,
      storageConditions: formData.storageConditions,
      foodCategory: formData.foodCategory,
      preparationTime: formData.preparationTime ? new Date(formData.preparationTime) : undefined,
      temperatureLog: formData.temperatureLog,
      allergens: formData.allergens,
      handlingNotes: formData.handlingNotes
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const runSafetyChecks = (): string[] => {
    const alerts: string[] = [];
    
    // Check preparation time vs current time for unrefrigerated food
    if (formData.preparationTime && formData.storageConditions !== 'cold' && formData.storageConditions !== 'frozen') {
      const prepTime = new Date(formData.preparationTime);
      const hoursOld = (Date.now() - prepTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursOld > 24) {
        alerts.push('⚠️ CRITICAL: Food has been unrefrigerated for over 24 hours. This poses significant food safety risks and should be collected within 1 day of donation submission.');
      } else if (hoursOld > 4 && formData.storageConditions === 'hot') {
        alerts.push('⚠️ WARNING: Hot food should not be kept at serving temperature for more than 4 hours. Collection should occur within 1 day.');
      } else if (hoursOld > 2 && formData.foodCategory === 'prepared') {
        alerts.push('⚠️ CAUTION: Prepared food at room temperature for over 2 hours requires careful handling. Collection recommended within 1 day.');
      }
    }
    
    // Check expiry time and set collection timeframe
    const expiryDate = new Date(formData.expiryTime);
    const hoursUntilExpiry = (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60);
    
    if (hoursUntilExpiry < 1) {
      alerts.push('⚠️ URGENT: Food expires in less than 1 hour. Immediate collection required within 1 day.');
    } else if (hoursUntilExpiry <= 24) {
      alerts.push('⚠️ PRIORITY: Food expires within 24 hours. Collection should occur within 1 day of donation.');
    }
    
    // Check storage conditions vs food type
    if (formData.foodCategory === 'raw' && formData.storageConditions !== 'cold' && formData.storageConditions !== 'frozen') {
      alerts.push('⚠️ WARNING: Raw food should be kept refrigerated or frozen to prevent bacterial growth. Collection within 1 day is essential.');
    }
    
    // Add general collection timeframe notice
    if (alerts.length === 0) {
      alerts.push('ℹ️ NOTICE: All food donations should be collected within 1 day of submission to ensure food safety and quality.');
    }
    
    return alerts;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear errors when user starts typing
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const handleAllergenChange = (allergen: string) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.includes(allergen)
        ? formData.allergens.filter(a => a !== allergen)
        : [...formData.allergens, allergen]
    });
  };

  const proceedWithSubmission = () => {
    setFormData({ ...formData, safetyChecked: true });
    setShowSafetyChecklist(false);
    
    // Proceed with original submission logic
    const expiryDate = new Date(formData.expiryTime);
    const hoursUntilExpiry = (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60);
    
    let urgency: 'High' | 'Medium' | 'Low' = 'High'; // Set to high due to safety concerns
    
    addDonation({
      donor: formData.donor,
      organizationType: formData.organizationType,
      foodType: formData.foodType,
      quantity: formData.quantity,
      location: formData.location,
      phone: formData.phone,
      urgency,
      expiryTime: expiryDate,
      specialInstructions: formData.specialInstructions,
      storageConditions: formData.storageConditions,
      foodCategory: formData.foodCategory,
      preparationTime: formData.preparationTime ? new Date(formData.preparationTime) : undefined,
      temperatureLog: formData.temperatureLog,
      allergens: formData.allergens,
      handlingNotes: formData.handlingNotes,
      safetyAlerts: safetyAlerts
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const canProceedToStep2 = () => {
    return formData.donor.trim() && 
           formData.foodType.trim() && 
           formData.quantity.trim() && 
           formData.location.trim() && 
           formData.phone.trim() && 
           formData.expiryTime;
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center animate-slide-up">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your donation has been submitted successfully with food safety information. Our admin team will review and contact you shortly to coordinate pickup within 1 day.
          </p>
          <div className="text-sm text-gray-500">
            Your donation is now pending admin review with safety verification
          </div>
        </div>
      </div>
    );
  }

  // Safety Checklist Modal
  if (showSafetyChecklist) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b bg-red-50">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold text-red-900">Food Safety Alert</h2>
            </div>
            <button
              onClick={() => setShowSafetyChecklist(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">Safety Concerns Detected:</h3>
              <ul className="space-y-2">
                {safetyAlerts.map((alert, index) => (
                  <li key={index} className="text-red-700 text-sm">{alert}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Food Safety Guidelines:</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Hot food should be kept above 60°C (140°F) or cooled quickly</li>
                <li>• Cold food should be kept below 4°C (40°F)</li>
                <li>• Prepared food should not be at room temperature for more than 2 hours</li>
                <li>• Raw meat, poultry, and seafood must be kept refrigerated</li>
                <li>• Always practice good hygiene when handling food</li>
                <li>• Label food with preparation time and allergen information</li>
                <li>• <strong>All donations will be collected within 1 day of submission</strong></li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-3">Collection Timeline:</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• <strong>Standard Collection:</strong> Within 1 day of donation submission</li>
                <li>• <strong>High Priority:</strong> Same day collection for urgent items</li>
                <li>• <strong>Emergency:</strong> Within 2-4 hours for critical safety concerns</li>
                <li>• Volunteers will contact you to confirm pickup time</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowSafetyChecklist(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Review Donation
              </button>
              <button
                onClick={proceedWithSubmission}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Proceed with Caution
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Submit Food Donation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm font-medium">Basic Info</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">Food Safety</span>
            </div>
          </div>
        </div>

        {/* Form Errors */}
        {formErrors.length > 0 && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">Please fix the following errors:</h3>
            <ul className="space-y-1">
              {formErrors.map((error, index) => (
                <li key={index} className="text-red-700 text-sm">• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {currentStep === 1 && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    Donor Name *
                  </label>
                  <input
                    type="text"
                    name="donor"
                    required
                    value={formData.donor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name or organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Type *
                  </label>
                  <select
                    name="organizationType"
                    required
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="event-venue">Event Venue</option>
                    <option value="grocery-store">Grocery Store</option>
                    <option value="individual">Individual</option>
                    <option value="catering">Catering Service</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Package className="h-4 w-4 mr-2 text-gray-400" />
                    Food Type *
                  </label>
                  <input
                    type="text"
                    name="foodType"
                    required
                    value={formData.foodType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Prepared meals, Bread, Vegetables"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Quantity *
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 50 portions, 10kg, 20 loaves"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    Best Before Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="expiryTime"
                    required
                    value={formData.expiryTime}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)}
                    max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Collection will occur within 1 day of donation</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  Pickup Address *
                </label>
                <textarea
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Full pickup address with any specific instructions"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (canProceedToStep2()) {
                      setCurrentStep(2);
                    } else {
                      setFormErrors(['Please fill in all required fields before proceeding']);
                    }
                  }}
                  className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
                    canProceedToStep2()
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next: Food Safety Info
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Food Safety Information</h3>
                </div>
                <p className="text-sm text-blue-700">
                  This information helps ensure safe food handling and distribution to protect community health. 
                  <strong> All donations will be collected within 1 day of submission.</strong>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Thermometer className="h-4 w-4 mr-2 text-gray-400" />
                    Storage Conditions *
                  </label>
                  <select
                    name="storageConditions"
                    required
                    value={formData.storageConditions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="hot">Hot (Above 60°C/140°F)</option>
                    <option value="ambient">Room Temperature</option>
                    <option value="cold">Refrigerated (Below 4°C/40°F)</option>
                    <option value="frozen">Frozen (Below -18°C/0°F)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Food Category *
                  </label>
                  <select
                    name="foodCategory"
                    required
                    value={formData.foodCategory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="prepared">Prepared/Cooked Food</option>
                    <option value="raw">Raw Food (meat, dairy, produce)</option>
                    <option value="packaged">Packaged/Processed Food</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparation/Cooking Time
                  </label>
                  <input
                    type="datetime-local"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    max={new Date().toISOString().slice(0, 16)}
                    min={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">When was this food prepared or cooked?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Temperature (if known)
                  </label>
                  <input
                    type="text"
                    name="temperatureLog"
                    value={formData.temperatureLog}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 65°C, 4°C, Room temp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergen Information
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {allergenOptions.map((allergen) => (
                    <label key={allergen} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.allergens.includes(allergen)}
                        onChange={() => handleAllergenChange(allergen)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span>{allergen}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Handling Notes
                </label>
                <textarea
                  name="handlingNotes"
                  value={formData.handlingNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any special handling requirements, hygiene notes, or safety concerns..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any additional pickup instructions or notes..."
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Collection Timeline</h3>
                </div>
                <p className="text-sm text-green-700">
                  <strong>Guaranteed Collection:</strong> Your donation will be collected within 1 day of submission. 
                  High-priority items may be collected the same day. Our volunteers will contact you to confirm the pickup time.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  Submit Donation
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default DonationForm;