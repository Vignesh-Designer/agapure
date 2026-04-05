import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 pb-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center">
          <img 
            src="/images/logo-footer.png" 
            alt="Agapure Logo" 
            className="h-50 w-50 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-gray-500 max-w-md mx-auto mb-10">Your trusted partner in delivering pure, high-quality edible oils based in Coimbatore.</p>
        <div className="flex justify-center space-x-6 mb-10">
          <Facebook className="hover:text-primary cursor-pointer" />
          <Instagram className="hover:text-primary cursor-pointer" />
          <Twitter className="hover:text-primary cursor-pointer" />
        </div>
        <div className="pt-8 border-t border-white/5 text-gray-600 text-xs">
          © 2026 Agapure Edible Oils. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
