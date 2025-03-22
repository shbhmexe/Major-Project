import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' }
];

const TranslatorForm = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);
  const translateTimeoutRef = useRef(null);

  const handleLanguageChange = (code) => {
    setTargetLanguage(code);
    setIsSelectOpen(false);
    
    // Auto-translate when changing language if there's input text
    if (inputText.trim()) {
      translateText();
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-translate with debounce when input changes
  useEffect(() => {
    if (inputText.trim()) {
      // Clear previous timeout
      if (translateTimeoutRef.current) {
        clearTimeout(translateTimeoutRef.current);
      }
      
      // Set new timeout for translation (700ms after typing stops)
      translateTimeoutRef.current = setTimeout(() => {
        translateText();
      }, 700);
    } else {
      setOutputText('');
    }
    
    return () => {
      if (translateTimeoutRef.current) {
        clearTimeout(translateTimeoutRef.current);
      }
    };
  }, [inputText, targetLanguage]);

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '4218e772d8mshd3036d10d2f0012p1a8adbjsnbdbc9d7a30a6',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: inputText,
          source: 'en',
          target: targetLanguage,
          format: 'text'
        }
      };

      const response = await axios.request(options);
      
      if (response.data?.data?.translations?.[0]?.translatedText) {
        setOutputText(response.data.data.translations[0].translatedText);
      } else if (response.data?.translatedText) {
        // Alternative response format
        setOutputText(response.data.translatedText);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(`Translation failed: ${err.response.data?.message || 'Server error'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from translation server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update input text and trigger translation
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Find the current language name
  const currentLanguage = LANGUAGES.find(lang => lang.code === targetLanguage)?.name || 'Select Language';

  return (
    <div className="container">
      <div className="translator-card">
        <h1 className="translator-title">Universal Translator</h1>
        
        <div className="translator-grid">
          <div>
            <div className="translator-header">
              <label className="translator-label">Source Text (English)</label>
              <button 
                className="clear-button"
                onClick={() => {
                  setInputText('');
                  setOutputText('');
                }}
              >
                Clear
              </button>
            </div>
            <textarea
              className="input-field"
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <div className="translator-header">
              <label className="translator-label">Translated Text</label>
              <div className="custom-select" ref={selectRef}>
                <button 
                  className="select-button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                >
                  {currentLanguage} <span className="arrow-down">▼</span>
                </button>
                {isSelectOpen && (
                  <div className="select-dropdown">
                    {LANGUAGES.filter(lang => lang.code !== 'en').map(lang => (
                      <div 
                        key={lang.code} 
                        className={`select-option ${lang.code === targetLanguage ? 'selected' : ''}`}
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        {lang.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <textarea
              className="input-field"
              placeholder="Translation will appear here..."
              value={outputText}
              readOnly
            />
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button
          className="translate-button"
          onClick={translateText}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Translating...
            </>
          ) : 'Translate'}
        </button>
      </div>
    </div>
  );
};

export default TranslatorForm; 