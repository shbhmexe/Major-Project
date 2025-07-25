'use client';

import { motion } from 'framer-motion';
import ThreatInfoCard from './ThreatInfoCard';

export default function ScanResult({ result }) {
  const { threatLevel, explanation } = result;
  
  // Determine the color scheme based on threat level
  const getColorScheme = () => {
    switch(threatLevel.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-800 dark:text-yellow-200',
        };
      default: // safe/low
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
        };
    }
  };
  
  const colorScheme = getColorScheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      className={`rounded-xl shadow-lg overflow-hidden border ${colorScheme.border}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`p-6 ${colorScheme.bg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <motion.div 
            className="mb-4 sm:mb-0"
            variants={itemVariants}
          >
            <h2 className={`text-2xl font-bold ${colorScheme.text}`}>
              Scan Result
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Analysis completed
            </p>
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <ThreatInfoCard threatLevel={threatLevel} />
          </motion.div>
        </div>
        
        <motion.div 
          className={`mt-4 p-4 rounded-lg ${colorScheme.bg} border ${colorScheme.border}`}
          variants={itemVariants}
        >
          <h3 className={`font-semibold mb-2 ${colorScheme.text}`}>Analysis:</h3>
          <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
        </motion.div>
        
        <motion.div 
          className="mt-6 flex justify-end"
          variants={itemVariants}
        >
          <motion.button
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            More information
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
} 