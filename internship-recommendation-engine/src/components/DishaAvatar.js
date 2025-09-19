'use client';

import React from 'react';

const DishaAvatar = ({ size = 60, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="rounded-full shadow-lg border-3 border-white overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Face background */}
          <circle cx="50" cy="45" r="35" fill="#FDBCB4" />
          
          {/* Hair */}
          <path 
            d="M15 35 Q50 10 85 35 L85 25 Q50 5 15 25 Z" 
            fill="#3B1F14" 
          />
          
          {/* Eyes */}
          <circle cx="40" cy="40" r="3" fill="#2D1B69" />
          <circle cx="60" cy="40" r="3" fill="#2D1B69" />
          <circle cx="40" cy="39" r="1" fill="white" />
          <circle cx="60" cy="39" r="1" fill="white" />
          
          {/* Nose */}
          <ellipse cx="50" cy="50" rx="2" ry="3" fill="#F4A6A0" />
          
          {/* Mouth */}
          <path 
            d="M45 55 Q50 60 55 55" 
            stroke="#E91E63" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Blush */}
          <circle cx="35" cy="48" r="4" fill="#F8BBD9" opacity="0.7" />
          <circle cx="65" cy="48" r="4" fill="#F8BBD9" opacity="0.7" />
          
          {/* Hair accessories */}
          <circle cx="65" cy="30" r="3" fill="#FF6B9D" />
          <circle cx="35" cy="28" r="2" fill="#FF6B9D" />
        </svg>
      </div>
      
      {/* Online indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
  );
};

export default DishaAvatar;