'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScanForm from './components/ScanForm';
import ScanResult from './components/ScanResult';
import LoadingSpinner from './components/LoadingSpinner';
import StatisticsCard from './components/StatisticsCard';

export default function ScanPage() {
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  const handleScan = async (text) => {
    setIsLoading(true);
    setScanResult(null);
    setError(null);
    
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Scan failed. Please try again.');
      }
      
      const data = await response.json();
      setScanResult(data);
      
      // Add to scan history
      setScanHistory(prev => [
        {
          id: Date.now(),
          text: text.length > 30 ? `${text.substring(0, 30)}...` : text,
          result: data.threatLevel,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev.slice(0, 4) // Keep only the most recent 5 items
      ]);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-10"
          variants={itemVariants}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Scan for Potential Scams
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Paste any suspicious text, message, or URL below and our AI will analyze it for potential scams or phishing attempts.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ScanForm onScan={handleScan} />
            
            <div className="mt-6">
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <motion.div 
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300"
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              ) : scanResult ? (
                <ScanResult result={scanResult} />
              ) : null}
            </div>
          </div>
          
          <div className="space-y-6">
            <StatisticsCard />
            
            {/* Scan History */}
            {scanHistory.length > 0 && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                variants={itemVariants}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Scans</h3>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {scanHistory.map(item => (
                      <div key={item.id} className="py-3">
                        <div className="flex justify-between items-start">
                          <div className="truncate pr-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.text}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            item.result === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                            item.result === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {item.result.charAt(0).toUpperCase() + item.result.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Quick Tips */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Check for spelling errors and poor grammar</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Be wary of urgent requests for personal information</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hover over links to check the actual URL</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Don't share financial details via email or text</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 