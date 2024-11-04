import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About FeastFinder</h3>
            <p className="text-gray-400">
              Created by John Doe, FeastFinder aims to revolutionize food delivery
              by combining the best features of popular platforms.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Restaurants</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Partner with us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Restaurant App</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Business Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@feastfinder.com</li>
              <li className="text-gray-400">+1 (555) 123-4567</li>
              <li className="text-gray-400">
                123 Food Street,<br />
                Cuisine City, FC 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} FeastFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}