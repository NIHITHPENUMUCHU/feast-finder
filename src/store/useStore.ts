import { create } from 'zustand';

interface UserState {
  user: User | null;
  cart: CartItem[];
  currentOrder: Order | null;
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrentOrder: (order: Order | null) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface Address {
  id: string;
  type: string;
  address: string;
  landmark?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';
  total: number;
  deliveryPerson?: {
    name: string;
    phone: string;
    location: {
      lat: number;
      lng: number;
    };
  };
}

const useStore = create<UserState>((set) => ({
  user: null,
  cart: [],
  currentOrder: null,
  
  setUser: (user) => set({ user }),
  
  addToCart: (item) => set((state) => ({
    cart: [...state.cart, item]
  })),
  
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== itemId)
  })),
  
  updateCartItemQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    )
  })),
  
  clearCart: () => set({ cart: [] }),
  
  setCurrentOrder: (order) => set({ currentOrder: order })
}));

export default useStore;