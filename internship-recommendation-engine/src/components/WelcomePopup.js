'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WelcomePopup = ({ message, onClose, visible, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (visible) {
      // Small delay to trigger animation
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  if (!visible) return null;

  const positionClasses = position === 'top' 
    ? 'bottom-full mb-2' 
    : 'top-full mt-2';

  const triangleClasses = position === 'top'
    ? 'top-full right-6 border-t-white border-l-transparent border-r-transparent border-b-transparent border-8'
    : 'bottom-full right-6 border-b-white border-l-transparent border-r-transparent border-t-transparent border-8';

  return (
    <div 
      className={`absolute ${positionClasses} right-0 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Speech bubble */}
      <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 max-w-[280px] sm:max-w-xs min-w-[240px] sm:min-w-[250px]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close welcome message"
        >
          <X size={16} />
        </button>
        
        {/* Message content */}
        <div className="pr-6">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {message}
          </p>
        </div>
        
        {/* Speech bubble triangle */}
        <div className={`absolute ${triangleClasses}`}></div>
      </div>
    </div>
  );
};

export default WelcomePopup;