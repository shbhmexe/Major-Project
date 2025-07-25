'use client';

import { motion } from 'framer-motion';

export default function AuthButton({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-blue-500',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} w-full`}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      style={{
        boxShadow: variant === 'primary' ? '0 4px 15px rgba(66, 133, 244, 0.3)' : undefined
      }}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
      
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      
      {isLoading && loadingText && (
        <span className="absolute inset-0 flex items-center justify-center ml-8 text-sm">
          {loadingText}
        </span>
      )}
    </motion.button>
  );
}
