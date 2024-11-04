import React, { useState } from 'react';
import { Search, MapPin, User, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LocationModal from './LocationModal';
import useStore from '../store/useStore';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, cart } = useStore();
  
  const selectedLocation = localStorage.getItem('selectedLocation') || '';

  const handleLocationSelect = (location: string) => {
    localStorage.setItem('selectedLocation', location);
    setIsLocationModalOpen(false);
    navigate('/restaurants');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <ShoppingBag className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-2xl font-bold text-gray-900">FeastFinder</span>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{selectedLocation || 'Select Location'}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:block">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for restaurants and food"
                    className="pl-10 pr-4 py-2 w-[400px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              <Link 
                to={user ? "/profile" : "/login"}
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-500"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:inline">{user ? user.name : 'Sign in'}</span>
              </Link>
              <Link 
                to="/cart"
                className="relative flex items-center space-x-1 text-gray-700 hover:text-orange-500"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />
    </>
  );
}