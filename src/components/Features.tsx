import React from 'react';
import { Clock, Shield, Truck, Utensils } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Quick Delivery',
    description: 'Fast & reliable delivery to your doorstep',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Secure payments and reliable service',
  },
  {
    icon: Truck,
    title: 'Live Tracking',
    description: 'Real-time order tracking system',
  },
  {
    icon: Utensils,
    title: 'Wide Selection',
    description: 'Choose from thousands of restaurants',
  },
];

export default function Features() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose FeastFinder?</h2>
          <p className="mt-4 text-xl text-gray-600">
            We make food ordering and delivery a seamless experience
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white mx-auto">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}