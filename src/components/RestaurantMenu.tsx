import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../store/useStore';

const restaurantsByLocation = {
  'New York, NY': [
    {
      id: 'ny1',
      name: 'Manhattan Burger Co.',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500',
      rating: 4.8,
      deliveryTime: '20-30',
      cuisine: 'American, Burgers',
      minOrder: 15,
      items: [
        { id: 'ny1-1', name: 'Classic Cheeseburger', price: 12.99, description: 'Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
        { id: 'ny1-2', name: 'Bacon BBQ Burger', price: 14.99, description: 'Topped with crispy bacon, BBQ sauce, onion rings, and cheddar', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500' },
        { id: 'ny1-3', name: 'Mushroom Swiss Burger', price: 13.99, description: 'Sautéed mushrooms and Swiss cheese with garlic aioli', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500' },
        { id: 'ny1-4', name: 'Veggie Burger', price: 11.99, description: 'House-made black bean patty with avocado and chipotle mayo', image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=500' },
        { id: 'ny1-5', name: 'Truffle Fries', price: 6.99, description: 'Crispy fries with truffle oil and parmesan', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500' },
        { id: 'ny1-6', name: 'Onion Rings', price: 5.99, description: 'Beer-battered onion rings with ranch dipping sauce', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500' },
        { id: 'ny1-7', name: 'Milkshake', price: 6.99, description: 'Hand-spun vanilla, chocolate, or strawberry', image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500' },
        { id: 'ny1-8', name: 'Caesar Salad', price: 8.99, description: 'Romaine lettuce, croutons, parmesan, and Caesar dressing', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500' },
        { id: 'ny1-9', name: 'Chicken Wings', price: 12.99, description: 'Choose from Buffalo, BBQ, or Garlic Parmesan', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500' },
        { id: 'ny1-10', name: 'Ice Cream Sundae', price: 7.99, description: 'Vanilla ice cream with chocolate sauce, whipped cream, and a cherry', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500' }
      ]
    },
    // ... other NY restaurants
  ],
  'Los Angeles, CA': [
    // ... LA restaurants
  ]
};

export default function RestaurantMenu() {
  const { id } = useParams();
  const addToCart = useStore((state) => state.addToCart);
  const selectedLocation = localStorage.getItem('selectedLocation') || 'New York, NY';
  
  const restaurant = restaurantsByLocation[selectedLocation]?.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
      </div>
    );
  }

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: id!,
      restaurantName: restaurant.name
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <div className="relative h-64 rounded-lg overflow-hidden mb-6">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1">{restaurant.rating}</span>
              </div>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime} mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurant.items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden flex"
          >
            <div className="flex-1 p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
            <div className="w-1/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}