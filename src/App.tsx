import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import RestaurantList from './components/RestaurantList';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import OrderTracking from './components/OrderTracking';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Features />
                </>
              } />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/track-order/:orderId" element={<OrderTracking />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;