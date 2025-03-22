import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FONTS = [
  { id: 'sans', name: 'Sans-Serif (Inter)', class: 'font-sans' },
  { id: 'serif', name: 'Serif (Merriweather)', class: 'font-serif' },
  { id: 'mono', name: 'Monospace (JetBrains Mono)', class: 'font-mono' }
];

const FontSelector = ({ onFontChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    onFontChange(font.class);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20">
      <motion.button
        className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 flex items-center space-x-2 shadow-lg hover:bg-white/20 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm font-medium">Font: {selectedFont.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-12 right-0 bg-dark/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl w-64 z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-1">
              {FONTS.map((font) => (
                <motion.li
                  key={font.id}
                  className={`px-4 py-3 cursor-pointer ${font.class} ${
                    selectedFont.id === font.id ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white' : 'text-white/80 hover:bg-white/10'
                  } transition-colors duration-200`}
                  onClick={() => handleFontSelect(font)}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <span>{font.name}</span>
                  {selectedFont.id === font.id && (
                    <span className="float-right text-blue-300">✓</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FontSelector; 