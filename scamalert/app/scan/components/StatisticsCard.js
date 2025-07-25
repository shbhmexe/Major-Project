'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StatisticsCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Static data - in a real app, this would come from an API
  const scamStats = [
    { name: 'Phishing', percent: 45, color: 'bg-red-500' },
    { name: 'Financial', percent: 25, color: 'bg-orange-500' },
    { name: 'Identity Theft', percent: 15, color: 'bg-yellow-500' },
    { name: 'Tech Support', percent: 10, color: 'bg-green-500' },
    { name: 'Other', percent: 5, color: 'bg-blue-500' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (percent) => ({ 
      width: `${percent}%`,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
      }
    })
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      <div className="p-6">
        <motion.div 
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Scam Statistics</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</span>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Scams Detected', value: '2,458', icon: '🔍', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Accuracy Rate', value: '98.2%', icon: '✓', color: 'text-green-600 dark:text-green-400' },
            { label: 'Avg Response', value: '1.2s', icon: '⚡', color: 'text-purple-600 dark:text-purple-400' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Top Scam Types Chart */}
        <motion.div variants={itemVariants}>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Top Scam Types</h4>
          <div className="space-y-4">
            {scamStats.map((scam, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{scam.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{scam.percent}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-2 ${scam.color}`}
                    custom={scam.percent}
                    variants={barVariants}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Safety Tips */}
        <motion.div 
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
          variants={itemVariants}
        >
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Safety Tip</h4>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            Always verify the sender's identity before clicking on links or sharing personal information. When in doubt, scan it with ScamAlert!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 