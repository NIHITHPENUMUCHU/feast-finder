import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      // Store location in localStorage for persistence
      localStorage.setItem('selectedLocation', location);
      navigate('/restaurants');
    }
  };

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Discover the Best Food & Drinks
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          From local favorites to premium restaurants, we deliver it all
        </p>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your delivery location"
              className="pl-12 pr-4 py-3 w-full rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors w-full md:w-auto"
          >
            Find Food
          </button>
        </form>
      </div>
    </div>
  );
}