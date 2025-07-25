'use client';

import { motion } from 'framer-motion';

export default function ThreatInfoCard({ threatLevel }) {
  // Define the appearance based on the threat level
  const getThreatConfig = () => {
    switch (threatLevel.toLowerCase()) {
      case 'high':
        return {
          label: 'High Risk',
          badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          animationProps: {
            rotate: [0, -5, 5, -5, 5, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 0.5,
              repeat: 1,
              ease: "easeInOut"
            }
          }
        };
      case 'medium':
        return {
          label: 'Medium Risk',
          badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          animationProps: {
            rotate: [0, 0, 0, 0],
            scale: [1, 1.05, 1],
            transition: {
              duration: 0.5,
              repeat: 0,
              ease: "easeInOut"
            }
          }
        };
      default: // safe/low
        return {
          label: 'Safe',
          badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          animationProps: {
            rotate: [0, 0, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 0.6,
              repeat: 0,
              ease: "easeInOut"
            }
          }
        };
    }
  };

  const { label, badge, icon, animationProps } = getThreatConfig();

  return (
    <div className="flex items-center gap-2">
      <motion.div 
        className="h-10 w-10 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          ...animationProps
        }}
        whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 10 
        }}
      >
        {icon}
      </motion.div>
      
      <motion.span 
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge}`}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 8px rgba(0,0,0,0.1)"
        }}
      >
        {label}
      </motion.span>
    </div>
  );
} 