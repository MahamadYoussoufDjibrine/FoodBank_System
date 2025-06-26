import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Donation {
  id: string;
  donor: string;
  organizationType: string;
  foodType: string;
  quantity: string;
  location: string;
  phone: string;
  urgency: 'High' | 'Medium' | 'Low';
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Assigned' | 'In Transit' | 'Completed';
  submittedAt: Date;
  expiryTime: Date;
  specialInstructions?: string;
  rejectionReason?: string;
  assignedVolunteer?: string;
  // New food safety fields
  storageConditions?: 'hot' | 'cold' | 'ambient' | 'frozen';
  foodCategory?: 'prepared' | 'raw' | 'packaged';
  preparationTime?: Date;
  temperatureLog?: string;
  allergens?: string[];
  handlingNotes?: string;
  safetyAlerts?: string[];
  safetyScore?: number;
}

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'submittedAt' | 'status'>) => void;
  updateDonationStatus: (id: string, status: Donation['status'], reason?: string) => void;
  assignVolunteer: (id: string, volunteer: string) => void;
  getDonationById: (id: string) => Donation | undefined;
  getStats: () => {
    total: number;
    pending: number;
    approved: number;
    inTransit: number;
    completed: number;
    rejected: number;
  };
  getSafetyStats: () => {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    withAllergens: number;
  };
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};

interface DonationProviderProps {
  children: ReactNode;
}

// Helper function to calculate safety score
const calculateSafetyScore = (donation: Partial<Donation>): number => {
  let score = 100;
  
  // Deduct points based on risk factors
  if (donation.preparationTime && donation.storageConditions !== 'cold' && donation.storageConditions !== 'frozen') {
    const hoursOld = (Date.now() - donation.preparationTime.getTime()) / (1000 * 60 * 60);
    if (hoursOld > 24) score -= 50;
    else if (hoursOld > 4 && donation.storageConditions === 'hot') score -= 30;
    else if (hoursOld > 2 && donation.foodCategory === 'prepared') score -= 20;
  }
  
  if (donation.foodCategory === 'raw' && donation.storageConditions !== 'cold' && donation.storageConditions !== 'frozen') {
    score -= 40;
  }
  
  if (donation.expiryTime) {
    const hoursUntilExpiry = (donation.expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursUntilExpiry < 1) score -= 30;
    else if (hoursUntilExpiry < 2) score -= 15;
  }
  
  return Math.max(0, score);
};

export const DonationProvider: React.FC<DonationProviderProps> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: 'FD1001',
      donor: 'Mario\'s Restaurant',
      organizationType: 'restaurant',
      foodType: 'Prepared Meals',
      quantity: '50 portions',
      location: '123 Main St, Downtown',
      phone: '+1 (555) 123-4567',
      urgency: 'High',
      status: 'Pending Review',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // expires in 2 hours
      specialInstructions: 'Food is still hot, please collect ASAP',
      storageConditions: 'hot',
      foodCategory: 'prepared',
      preparationTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // prepared 3 hours ago
      temperatureLog: '65°C',
      allergens: ['Gluten', 'Dairy'],
      handlingNotes: 'Keep hot until pickup, use insulated containers',
      safetyScore: 75
    },
    {
      id: 'FD1002',
      donor: 'Grand Event Hall',
      organizationType: 'event-venue',
      foodType: 'Buffet Items',
      quantity: '30kg mixed',
      location: '456 Event Ave',
      phone: '+1 (555) 987-6543',
      urgency: 'Medium',
      status: 'Assigned',
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // expires in 6 hours
      assignedVolunteer: 'john.smith',
      storageConditions: 'cold',
      foodCategory: 'prepared',
      preparationTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
      temperatureLog: '4°C',
      allergens: ['Nuts', 'Eggs'],
      safetyScore: 90
    },
    {
      id: 'FD1003',
      donor: 'Fresh Bakery',
      organizationType: 'grocery-store',
      foodType: 'Bread & Pastries',
      quantity: '25 loaves',
      location: '789 Baker St',
      phone: '+1 (555) 456-7890',
      urgency: 'Low',
      status: 'In Transit',
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // expires in 12 hours
      assignedVolunteer: 'sarah.johnson',
      storageConditions: 'ambient',
      foodCategory: 'packaged',
      allergens: ['Gluten'],
      safetyScore: 85
    },
    {
      id: 'FD1004',
      donor: 'Corporate Cafeteria',
      organizationType: 'other',
      foodType: 'Lunch Surplus',
      quantity: '40 meals',
      location: '321 Business Blvd',
      phone: '+1 (555) 654-3210',
      urgency: 'High',
      status: 'Pending Review',
      submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      expiryTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // expires in 1 hour
      specialInstructions: 'Located on 5th floor, ask for manager',
      storageConditions: 'hot',
      foodCategory: 'prepared',
      preparationTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      temperatureLog: '70°C',
      allergens: ['Soy'],
      safetyAlerts: ['⚠️ CAUTION: Prepared food at serving temperature for 2 hours'],
      safetyScore: 70
    },
    {
      id: 'FD1005',
      donor: 'Pizza Palace',
      organizationType: 'restaurant',
      foodType: 'Pizza & Sides',
      quantity: '15 pizzas',
      location: '555 Food Court',
      phone: '+1 (555) 111-2222',
      urgency: 'Medium',
      status: 'Completed',
      submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      expiryTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // expired 2 hours ago
      assignedVolunteer: 'mike.davis',
      storageConditions: 'ambient',
      foodCategory: 'prepared',
      allergens: ['Gluten', 'Dairy'],
      safetyScore: 60
    }
  ]);

  const addDonation = (donationData: Omit<Donation, 'id' | 'submittedAt' | 'status'>) => {
    const safetyScore = calculateSafetyScore(donationData);
    const newDonation: Donation = {
      ...donationData,
      id: `FD${Math.floor(Math.random() * 10000)}`,
      submittedAt: new Date(),
      status: 'Pending Review',
      safetyScore
    };
    setDonations(prev => [newDonation, ...prev]);
  };

  const updateDonationStatus = (id: string, status: Donation['status'], reason?: string) => {
    setDonations(prev => prev.map(donation => 
      donation.id === id 
        ? { 
            ...donation, 
            status,
            ...(reason && { rejectionReason: reason })
          }
        : donation
    ));
  };

  const assignVolunteer = (id: string, volunteer: string) => {
    setDonations(prev => prev.map(donation => 
      donation.id === id 
        ? { ...donation, assignedVolunteer: volunteer, status: 'Assigned' }
        : donation
    ));
  };

  const getDonationById = (id: string) => {
    return donations.find(donation => donation.id === id);
  };

  const getStats = () => {
    const stats = donations.reduce((acc, donation) => {
      acc.total++;
      switch (donation.status) {
        case 'Pending Review':
          acc.pending++;
          break;
        case 'Approved':
        case 'Assigned':
          acc.approved++;
          break;
        case 'In Transit':
          acc.inTransit++;
          break;
        case 'Completed':
          acc.completed++;
          break;
        case 'Rejected':
          acc.rejected++;
          break;
      }
      return acc;
    }, { total: 0, pending: 0, approved: 0, inTransit: 0, completed: 0, rejected: 0 });

    return stats;
  };

  const getSafetyStats = () => {
    const stats = donations.reduce((acc, donation) => {
      const score = donation.safetyScore || 100;
      if (score < 60) acc.highRisk++;
      else if (score < 80) acc.mediumRisk++;
      else acc.lowRisk++;
      
      if (donation.allergens && donation.allergens.length > 0) {
        acc.withAllergens++;
      }
      
      return acc;
    }, { highRisk: 0, mediumRisk: 0, lowRisk: 0, withAllergens: 0 });

    return stats;
  };

  return (
    <DonationContext.Provider value={{
      donations,
      addDonation,
      updateDonationStatus,
      assignVolunteer,
      getDonationById,
      getStats,
      getSafetyStats
    }}>
      {children}
    </DonationContext.Provider>
  );
};