import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Package, User, Mail, Phone, Plus, Pencil, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';

interface Address {
  id: string;
  type: string;
  address: string;
  landmark?: string;
}

export default function UserProfile() {
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    newAddressData: {
      type: 'home',
      address: '',
      landmark: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      newAddressData: {
        ...prev.newAddressData,
        [name]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
    }
    setEditMode(false);
  };

  const handleAddAddress = () => {
    if (user) {
      const newAddr: Address = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData.newAddressData
      };
      setUser({
        ...user,
        addresses: [...user.addresses, newAddr]
      });
      setNewAddress(false);
      setFormData(prev => ({
        ...prev,
        newAddressData: {
          type: 'home',
          address: '',
          landmark: ''
        }
      }));
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.filter(addr => addr.id !== addressId)
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In production, upload to server and get URL
        console.log('Upload image to server:', file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'profile'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="h-5 w-5 inline-block mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'addresses'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MapPin className="h-5 w-5 inline-block mr-2" />
            Addresses
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'orders'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="h-5 w-5 inline-block mr-2" />
            Orders
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-full h-full p-4 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'Guest User'}</h2>
                  <p className="text-gray-600">{user?.email || 'No email provided'}</p>
                </div>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Personal Information</p>
                      <button
                        onClick={() => setEditMode(true)}
                        className="text-orange-500 hover:text-orange-600 font-medium flex items-center mt-1"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <button
                  onClick={() => setNewAddress(true)}
                  className="flex items-center space-x-2 text-orange-500 hover:text-orange-600"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {newAddress && (
                <div className="mb-6 p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Type
                      </label>
                      <select
                        name="type"
                        value={formData.newAddressData.type}
                        onChange={handleAddressInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.newAddressData.address}
                        onChange={handleAddressInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter your address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.newAddressData.landmark}
                        onChange={handleAddressInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter a landmark"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setNewAddress(false)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddAddress}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {user?.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="capitalize font-medium">{address.type}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 capitalize">
                          {address.type}
                        </span>
                      </div>
                      <p className="text-gray-600">{address.address}</p>
                      {address.landmark && (
                        <p className="text-gray-500 text-sm mt-1">
                          Landmark: {address.landmark}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              {/* Add order history component here */}
              <p className="text-gray-600">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}