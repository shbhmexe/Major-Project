'use client';

import React from 'react';
import Image from 'next/image';

export default function CompanyLogoStrip() {
  // Company logos array with image paths
  const companyLogos = [
    {
      name: 'HCL',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">HCL</span>
        </div>
      )
    },
    {
      name: 'Infosys',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 ">
          <span className="text-blue-600 font-bold">Infosys</span>
        </div>
      )
    },
    {
      name: 'HCLTech',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">HCLTech</span>
        </div>
      )
    },
    {
      name: 'Accenture',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-purple-600 font-bold">Accenture</span>
        </div>
      )
    },
    {
      name: 'Cognizant',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">Cognizant</span>
        </div>
      )
    },
    {
      name: 'Wipro',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-green-600 font-bold">Wipro</span>
        </div>
      )
    },
    {
      name: 'MCL',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-red-600 font-bold">MCL</span>
        </div>
      )
    },
    {
      name: 'NMDC Limited',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-gray-700 font-bold">NMDC</span>
        </div>
      )
    },
    {
      name: 'Unilever',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-500 font-bold">Unilever</span>
        </div>
      )
    },
    {
      name: 'REC',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-red-500 font-bold">REC</span>
        </div>
      )
    },
    {
      name: 'JSW',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-700 font-bold">JSW</span>
        </div>
      )
    },
    // Duplicate logos to ensure continuous scrolling
    {
      name: 'HCL-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">HCL</span>
        </div>
      )
    },
    {
      name: 'Infosys-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">Infosys</span>
        </div>
      )
    },
    {
      name: 'HCLTech-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">HCLTech</span>
        </div>
      )
    },
    {
      name: 'Accenture-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-purple-600 font-bold">Accenture</span>
        </div>
      )
    },
    {
      name: 'Cognizant-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-600 font-bold">Cognizant</span>
        </div>
      )
    },
    {
      name: 'Wipro-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-green-600 font-bold">Wipro</span>
        </div>
      )
    },
    {
      name: 'MCL-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-red-600 font-bold">MCL</span>
        </div>
      )
    },
    {
      name: 'NMDC Limited-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-gray-700 font-bold">NMDC</span>
        </div>
      )
    },
    {
      name: 'Unilever-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-500 font-bold">Unilever</span>
        </div>
      )
    },
    {
      name: 'REC-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-red-500 font-bold">REC</span>
        </div>
      )
    },
    {
      name: 'JSW-2',
      logo: (
        <div className="h-8 w-auto bg-white flex items-center justify-center px-3 rounded">
          <span className="text-blue-700 font-bold">JSW</span>
        </div>
      )
    },
  ];

  return (
    <section className="py-12 bg-purple-900 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Partnered with India&apos;s Top Companies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>
      </div>
      
      {/* Infinite Scrolling Logo Strip */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {companyLogos.map((company, index) => (
            <div 
              key={`${company.name}-${index}`} 
              className="mx-8 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 h-20 w-40 shadow-sm"
            >
              {company.logo}
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {companyLogos.map((company, index) => (
            <div 
              key={`${company.name}-duplicate-${index}`} 
              className="mx-8 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 h-20 w-40 shadow-sm"
            >
              {company.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}