import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

export default function LocationModal({ isOpen, onClose, onSelectLocation }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulated locations - in production, this would come from a geocoding API
  const suggestedLocations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
  ].filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLocationSelect = (location: string) => {
    onSelectLocation(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="relative mb-4">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for area, street name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {suggestedLocations.map((location) => (
            <button
              key={location}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                {location}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}