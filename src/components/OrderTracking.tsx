import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MessageCircle, Phone, Star } from 'lucide-react';
import useStore from '../store/useStore';

const deliverySteps = [
  { status: 'confirmed', title: 'Order Confirmed' },
  { status: 'preparing', title: 'Preparing Your Food' },
  { status: 'on-the-way', title: 'On the Way' },
  { status: 'delivered', title: 'Delivered' }
];

export default function OrderTracking() {
  const currentOrder = useStore((state) => state.currentOrder);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (currentOrder?.status === 'delivered') {
      setShowRating(true);
    }
  }, [currentOrder?.status]);

  if (!currentOrder) {
    return <div>No active order found.</div>;
  }

  const currentStepIndex = deliverySteps.findIndex(
    step => step.status === currentOrder.status
  );

  const handleSubmitRating = () => {
    // Submit rating to backend
    console.log({ rating, comment });
    setShowRating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="space-y-6">
              {deliverySteps.map((step, index) => (
                <div
                  key={step.status}
                  className={`flex items-center ${
                    index <= currentStepIndex ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full border-2 ${
                      index <= currentStepIndex ? 'border-orange-500' : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {index < currentStepIndex ? '✓' : index + 1}
                    </div>
                    {index < deliverySteps.length - 1 && (
                      <div className={`absolute top-8 left-1/2 w-0.5 h-8 ${
                        index < currentStepIndex ? 'bg-orange-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                  <span className="ml-4 font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {currentOrder.deliveryPerson && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Partner</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-medium">{currentOrder.deliveryPerson.name}</p>
                    <p className="text-gray-600">Delivery Partner</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={currentOrder.deliveryPerson?.location}
              zoom={15}
            >
              <Marker position={currentOrder.deliveryPerson?.location} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {showRating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Rate Your Experience</h2>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              rows={4}
            />
            <button
              onClick={handleSubmitRating}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Submit Rating
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}