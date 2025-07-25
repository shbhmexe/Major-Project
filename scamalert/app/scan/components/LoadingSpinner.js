'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 2
  };

  const pulseVariants = {
    initial: {
      scale: 0.8,
      opacity: 0.5,
    },
    animate: {
      scale: [0.8, 1, 0.8],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dotVariants = {
    initial: { opacity: 0, y: 0 },
    animate: index => ({
      opacity: [0, 1, 0],
      y: [-2, 0, -2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: index * 0.2
      }
    })
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="relative w-24 h-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        
        {/* Spinning arc */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Secondary arc */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-r-blue-500/40 dark:border-r-blue-500/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner pulse */}
        <motion.div
          className="absolute inset-0 m-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-0 m-10 bg-blue-600 dark:bg-blue-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <div className="mt-6 flex items-center gap-1">
        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Analyzing
        </motion.p>
        
        {[0, 1, 2].map((index) => (
          <motion.span 
            key={index}
            className="text-blue-600 dark:text-blue-400 text-xl"
            custom={index}
            variants={dotVariants}
            initial="initial"
            animate="animate"
          >
            .
          </motion.span>
        ))}
      </div>
    </div>
  );
} 