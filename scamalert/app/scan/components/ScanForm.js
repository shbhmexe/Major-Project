'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ScanForm({ onScan }) {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setIsValid(false);
      return;
    }
    
    onScan(text);
  };
  
  const handleChange = (e) => {
    setText(e.target.value);
    setIsValid(true);
  };

  const formVariants = {
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="scanText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Text or URL
          </label>
          <motion.div
            animate={!isValid ? { x: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`relative border ${
              !isValid 
                ? 'border-red-500' 
                : isFocused
                  ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/30'
                  : 'border-gray-300 dark:border-gray-600'
            } rounded-lg transition-all duration-200`}
          >
            <textarea
              id="scanText"
              rows="6"
              value={text}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste a suspicious message, email content, or URL here..."
              className="w-full p-4 bg-transparent rounded-lg focus:outline-none dark:text-white text-gray-800"
            />
            {text && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setText('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </motion.button>
            )}
          </motion.div>
          {!isValid && (
            <motion.p 
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Please enter some text to scan
            </motion.p>
          )}
        </motion.div>
        
        <motion.div 
          className="flex justify-end"
          variants={itemVariants}
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2 transition-colors"
          >
            <motion.span
              animate={{ 
                rotate: [0, 0, 0, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </motion.span>
            Scan Now
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
} 