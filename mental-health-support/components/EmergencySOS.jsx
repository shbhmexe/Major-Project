'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';

export function EmergencySOS({ className = '', isMobile = false }) {
  const { t } = useLanguage();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEmergencyCall = () => {
    setShowConfirmation(true);
  };

  const confirmCall = () => {
    // Use tel: protocol to open dialer with Kiran Helpline number
    window.location.href = 'tel:18005990019';
    setShowConfirmation(false);
  };

  const cancelCall = () => {
    setShowConfirmation(false);
  };

  const buttonContent = (
    <>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 mr-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
        />
      </svg>
      <span className="font-bold text-xs">
        SOS
      </span>
    </>
  );

  return (
    <>
      {/* Emergency SOS Button */}
      <button
        onClick={handleEmergencyCall}
        className={`
          flex items-center px-2 py-1.5 text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md transition-colors shadow-md font-medium border border-red-500
          ${className}
          transform hover:scale-105 active:scale-95 transition-transform duration-200
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        `}
        title={t('emergencySOSTooltip')}
        aria-label={t('emergencySOSAriaLabel')}
      >
        {buttonContent}
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-red-600 dark:text-red-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('emergencyCallTitle')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('emergencyCallSubtitle')}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-red-600 dark:text-red-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 dark:text-red-200 text-sm">
                        {t('kiranHelplineTitle')}
                      </h4>
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        1800-599-0019
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {t('emergencyCallDescription')}
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('emergencyCallNote')}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={confirmCall}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors font-medium"
                >
                  {t('callNow')}
                </button>
                <button
                  onClick={cancelCall}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors font-medium"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}