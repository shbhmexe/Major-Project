'use client';

import React from 'react';

export default function PMInternshipScheme() {
  return (
    <section id="pm-internship" className="py-20 bg-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            PM Internship Scheme
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* PM Internship Scheme Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Eligibility Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-3 text-white font-bold">?</span>
              Are you Eligible?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  <div className="text-yellow-400 font-bold text-xl">21</div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Age</h4>
                  <p className="text-gray-300">21-24 Years</p>
                </div>
              </div>
              
              {/* Job Status */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Job Status</h4>
                  <p className="text-gray-300">Not Employed Full Time</p>
                </div>
              </div>
              
              {/* Education */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Education</h4>
                  <p className="text-gray-300">Not Enrolled Full Time</p>
                </div>
              </div>
              
              {/* Family */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Family (Self/Spouse/Parents)</h4>
                  <ul className="text-gray-300 list-disc list-inside">
                    <li>No one is Earning more than ₹8 Lakhs PA</li>
                    <li>No Member has a Govt. Job</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-3 text-white font-bold">+</span>
              Core Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Real-life Experience</h4>
                  <p className="text-gray-300">12 months real-life experience in India&apos;s top companies</p>
                </div>
              </div>
              
              {/* Monthly Assistance */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Monthly Assistance</h4>
                  <p className="text-gray-300">₹4500 by Government of India and ₹500 by Industry</p>
                </div>
              </div>
              
              {/* One-time Grant */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">One-time Grant</h4>
                  <p className="text-gray-300">₹6000 for incidentals</p>
                </div>
              </div>
              
              {/* Various Sectors */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Various Sectors</h4>
                  <p className="text-gray-300">Select from Various Sectors and from top Companies of India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}