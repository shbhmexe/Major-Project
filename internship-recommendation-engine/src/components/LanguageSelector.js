'use client';

import React from 'react';
import { t } from '../utils/translations';

const LanguageSelector = ({ onLanguageSelect, currentLanguage = 'en' }) => {
  const languages = [
    { code: 'en', name: 'English', abbrev: 'EN' },
    { code: 'hi', name: 'हिंदी', abbrev: 'HI' },
    { code: 'gu', name: 'ગુજરાતી', abbrev: 'GU' },
    { code: 'mr', name: 'मराठी', abbrev: 'MR' },
    { code: 'ta', name: 'தமிழ்', abbrev: 'TA' },
    { code: 'ur', name: 'اردو', abbrev: 'UR' }
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 text-center font-medium">
        {t('chatbotSelectLanguage', currentLanguage)}
      </p>
      
      <div className="grid grid-cols-1 gap-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageSelect(language.code)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              currentLanguage === language.code
                ? 'bg-purple-50 border-purple-300 text-purple-800'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold bg-gray-200 px-2 py-1 rounded text-gray-600">{language.abbrev}</span>
              <span className="font-medium">{language.name}</span>
            </div>
            
            {currentLanguage === language.code && (
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;