import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

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
    {
      id: 'ny2',
      name: 'Little Italy Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
      rating: 4.6,
      deliveryTime: '25-40',
      cuisine: 'Italian, Pizza',
      minOrder: 20,
      items: [
        { id: 'ny2-1', name: 'Margherita Pizza', price: 16.99, description: 'Fresh mozzarella, basil, and tomato sauce', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500' },
        { id: 'ny2-2', name: 'Pepperoni Pizza', price: 18.99, description: 'Classic pepperoni with mozzarella and tomato sauce', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500' },
        { id: 'ny2-3', name: 'Supreme Pizza', price: 20.99, description: 'Pepperoni, sausage, bell peppers, onions, and mushrooms', image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500' },
        { id: 'ny2-4', name: 'Buffalo Chicken Pizza', price: 19.99, description: 'Spicy buffalo chicken with blue cheese and ranch', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500' },
        { id: 'ny2-5', name: 'Garlic Knots', price: 6.99, description: 'Fresh-baked knots with garlic butter and parmesan', image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?w=500' },
        { id: 'ny2-6', name: 'Caesar Salad', price: 8.99, description: 'Romaine lettuce with house-made Caesar dressing', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500' },
        { id: 'ny2-7', name: 'Meatballs', price: 9.99, description: 'House-made meatballs in marinara sauce', image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=500' },
        { id: 'ny2-8', name: 'Calzone', price: 14.99, description: 'Ricotta, mozzarella, and your choice of two toppings', image: 'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?w=500' },
        { id: 'ny2-9', name: 'Tiramisu', price: 7.99, description: 'Classic Italian dessert with coffee and mascarpone', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500' },
        { id: 'ny2-10', name: 'Cannoli', price: 5.99, description: 'Crispy shell filled with sweet ricotta cream', image: 'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=500' }
      ]
    }
  ],
  'Los Angeles, CA': [
    {
      id: 'la1',
      name: 'Sunset Sushi',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
      rating: 4.7,
      deliveryTime: '30-45',
      cuisine: 'Japanese, Sushi',
      minOrder: 25,
      items: [
        { id: 'la1-1', name: 'California Roll', price: 8.99, description: 'Crab, avocado, and cucumber', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500' },
        { id: 'la1-2', name: 'Spicy Tuna Roll', price: 10.99, description: 'Fresh tuna with spicy mayo', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500' },
        { id: 'la1-3', name: 'Rainbow Roll', price: 15.99, description: 'California roll topped with assorted sashimi', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500' },
        { id: 'la1-4', name: 'Dragon Roll', price: 16.99, description: 'Eel and cucumber topped with avocado', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500' },
        { id: 'la1-5', name: 'Miso Soup', price: 3.99, description: 'Traditional Japanese soup with tofu and seaweed', image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59a?w=500' },
        { id: 'la1-6', name: 'Edamame', price: 4.99, description: 'Steamed soybeans with sea salt', image: 'https://images.unsplash.com/photo-1542379653-b204d90f2a3e?w=500' },
        { id: 'la1-7', name: 'Tempura', price: 12.99, description: 'Assorted vegetables and shrimp in light batter', image: 'https://images.unsplash.com/photo-1581167363863-5a1d33a92381?w=500' },
        { id: 'la1-8', name: 'Salmon Nigiri', price: 6.99, description: 'Fresh salmon over seasoned rice', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500' },
        { id: 'la1-9', name: 'Tuna Sashimi', price: 14.99, description: 'Premium cuts of raw tuna', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500' },
        { id: 'la1-10', name: 'Green Tea Ice Cream', price: 5.99, description: 'Traditional Japanese dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500' }
      ]
    },
    {
      id: 'la2',
      name: 'Taco Fiesta',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
      rating: 4.5,
      deliveryTime: '20-35',
      cuisine: 'Mexican',
      minOrder: 15,
      items: [
        { id: 'la2-1', name: 'Street Tacos', price: 9.99, description: 'Three tacos with choice of meat, onions, and cilantro', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500' },
        { id: 'la2-2', name: 'Burrito Supreme', price: 11.99, description: 'Large burrito with rice, beans, meat, and toppings', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500' },
        { id: 'la2-3', name: 'Quesadilla', price: 10.99, description: 'Cheese quesadilla with choice of meat', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=500' },
        { id: 'la2-4', name: 'Nachos', price: 12.99, description: 'Loaded nachos with all the toppings', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500' },
        { id: 'la2-5', name: 'Enchiladas', price: 13.99, description: 'Three enchiladas with red or green sauce', image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=500' },
        { id: 'la2-6', name: 'Guacamole & Chips', price: 7.99, description: 'Fresh-made guacamole with tortilla chips', image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500' },
        { id: 'la2-7', name: 'Mexican Rice', price: 3.99, description: 'Traditional Mexican rice', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500' },
        { id: 'la2-8', name: 'Refried Beans', price: 3.99, description: 'Creamy refried pinto beans', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500' },
        { id: 'la2-9', name: 'Churros', price: 5.99, description: 'Mexican-style fried dough with cinnamon sugar', image: 'https://images.unsplash.com/photo-1624471458733-b1c1b1896731?w=500' },
        { id: 'la2-10', name: 'Horchata', price: 3.99, description: 'Traditional Mexican rice drink', image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500' }
      ]
    }
  ]
};

export default function RestaurantList() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const selectedLocation = localStorage.getItem('selectedLocation') || 'New York, NY';
  
  const filteredRestaurants = useMemo(() => {
    const locationRestaurants = restaurantsByLocation[selectedLocation] || [];
    if (!searchQuery) return locationRestaurants;
    
    return locationRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchQuery) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery)
    );
  }, [selectedLocation, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Restaurants in {selectedLocation}</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => {
              const sp = new URLSearchParams(searchParams);
              if (e.target.value) {
                sp.set('search', e.target.value);
              } else {
                sp.delete('search');
              }
              // Update URL with search params
              window.history.pushState({}, '', `${window.location.pathname}?${sp}`);
            }}
          />
        </div>
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime} mins</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Min. order ${restaurant.minOrder}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}