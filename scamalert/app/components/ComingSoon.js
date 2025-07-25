'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ComingSoon({ title, description, date = "December 2023" }) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Container with glow effect */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
        <div className="relative bg-gray-800 rounded-lg shadow-xl p-10 md:p-16 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 md:h-2 md:w-2 bg-blue-400 rounded-full"
                animate={{
                  x: [
                    Math.random() * 100 - 50 + '%', 
                    Math.random() * 100 - 50 + '%',
                    Math.random() * 100 - 50 + '%'
                  ],
                  y: [
                    Math.random() * 100 - 50 + '%', 
                    Math.random() * 100 - 50 + '%',
                    Math.random() * 100 - 50 + '%'
                  ],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="flex justify-center mb-8"
            >
              <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gray-700/50 border-4 border-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="absolute w-full h-full rounded-full animate-ping bg-blue-500 opacity-10"></div>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {title || "Coming Soon"}
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {description || "We're working on creating valuable resources to help you stay safe online. Check back soon!"}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/" className="inline-block">
                <motion.button
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Home
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12"
            >
              <p className="text-gray-400">Estimated completion: <span className="text-blue-400 font-semibold">{date}</span></p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 