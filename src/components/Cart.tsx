import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, setCurrentOrder } = useStore();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    const order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: cart,
      status: 'confirmed' as const,
      total,
      deliveryPerson: {
        name: 'John Doe',
        phone: '+1 234-567-8900',
        location: {
          lat: 40.7128,
          lng: -74.0060
        }
      }
    };

    setCurrentOrder(order);
    clearCart();
    navigate(`/track-order/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/restaurants')}
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <motion.div
              key={`${item.id}-${item.restaurantId}`}
              layout
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.restaurantName}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}