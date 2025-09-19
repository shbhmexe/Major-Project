'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import DishaAvatar from './DishaAvatar';
import WelcomePopup from './WelcomePopup';
import LanguageSelector from './LanguageSelector';
import { t } from '../utils/translations';

// Fallback chatbot knowledge base (used when API fails)
const chatbotData = {
  about: 'The Internship Recommendation Engine is a platform designed to help students find the perfect internship opportunities based on their skills, interests, and career goals. It uses advanced matching algorithms to suggest the most relevant internships.',
  features: 'Our platform offers personalized internship recommendations, skill matching, company insights, application tracking, and internship match score visualization.',
  howItWorks: 'Simply create an account, complete your profile with your skills and interests, and our system will automatically recommend the most suitable internships for you. You can also save and track your applications.',
  benefits: 'Save time by finding relevant internships quickly, discover opportunities that match your skills, track your application progress, and improve your chances of landing the perfect internship.',
  companies: 'We partner with top companies in India including TCS, Infosys, Wipro, HCL, Tech Mahindra, and many startups and mid-sized companies across various industries.',
  contact: 'For any assistance, please email us at support@internship-engine.com or use the contact form on our website.',
};

// Typewriter component for AI responses
const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Adjust speed here (lower = faster)
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// Message component for chat bubbles
const Message = ({ text, isUser, isTyping = false }) => {
  const [showTypewriter, setShowTypewriter] = useState(isTyping && !isUser);
  const [isComplete, setIsComplete] = useState(!isTyping || isUser);

  const handleTypewriterComplete = () => {
    setIsComplete(true);
    setShowTypewriter(false);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 px-1`}>
      <div 
        className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base ${isUser 
          ? 'bg-purple-600 text-white rounded-tr-none' 
          : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
      >
        {showTypewriter ? (
          <TypewriterText text={text} onComplete={handleTypewriterComplete} />
        ) : (
          <div className="break-words">{text}</div>
        )}
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    if (!isOpen) {
      // First time opening - show language selector if not selected yet
      if (!hasSelectedLanguage) {
        setShowLanguageSelector(true);
      }
      setShowWelcomePopup(false);
    }
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
    setHasSelectedLanguage(true);
    
    // Add language confirmation message
    const confirmationMessage = {
      text: t('chatbotLanguageSelected', language),
      isUser: false,
      isTyping: true,
      id: Date.now()
    };
    setMessages([confirmationMessage]);
  };

  const handleWelcomePopupClose = () => {
    setShowWelcomePopup(false);
  };

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: inputValue, isUser: true, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Call the Gemini AI API with enhanced context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputValue,
          language: selectedLanguage,
          requestDetailedResponse: true,
          context: {
            previousMessages: messages.slice(-5), // Send last 5 messages for context
            userQuery: inputValue,
            selectedLanguage: selectedLanguage
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Add AI response to chat with typewriter effect
        setMessages(prev => [...prev, { text: data.message, isUser: false, isTyping: true, id: Date.now() }]);
      } else {
        // Handle API error with fallback response
        console.warn('API returned success: false, using fallback response');
        let fallbackResponse = "I'm having trouble connecting to my AI brain. Please try again later.";
        
        // Try to use the fallback knowledge base
        const query = inputValue.toLowerCase();
        if (query.includes('about') || query.includes('what is') || query.includes('platform')) {
          fallbackResponse = chatbotData.about;
        } else if (query.includes('feature') || query.includes('offer') || query.includes('provide')) {
          fallbackResponse = chatbotData.features;
        } else if (query.includes('how') || query.includes('work') || query.includes('use')) {
          fallbackResponse = chatbotData.howItWorks;
        } else if (query.includes('benefit') || query.includes('advantage')) {
          fallbackResponse = chatbotData.benefits;
        } else if (query.includes('compan') || query.includes('partner') || query.includes('business')) {
          fallbackResponse = chatbotData.companies;
        } else if (query.includes('contact') || query.includes('help') || query.includes('support')) {
          fallbackResponse = chatbotData.contact;
        }
        
        setMessages(prev => [...prev, { text: `${fallbackResponse} (Note: Using fallback response due to API issues)`, isUser: false, isTyping: true, id: Date.now() }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Use fallback knowledge base on error
      let fallbackResponse = "I'm having trouble connecting to my AI brain. Please try again later.";
      
      // Try to use the fallback knowledge base
      const query = inputValue.toLowerCase();
      if (query.includes('about') || query.includes('what is') || query.includes('platform')) {
        fallbackResponse = chatbotData.about;
      } else if (query.includes('feature') || query.includes('offer') || query.includes('provide')) {
        fallbackResponse = chatbotData.features;
      } else if (query.includes('how') || query.includes('work') || query.includes('use')) {
        fallbackResponse = chatbotData.howItWorks;
      } else if (query.includes('benefit') || query.includes('advantage')) {
        fallbackResponse = chatbotData.benefits;
      } else if (query.includes('compan') || query.includes('partner') || query.includes('business')) {
        fallbackResponse = chatbotData.companies;
      } else if (query.includes('contact') || query.includes('help') || query.includes('support')) {
        fallbackResponse = chatbotData.contact;
      }
      
      setMessages(prev => [...prev, { 
        text: `${fallbackResponse} (Note: Using fallback response due to API issues)`, 
        isUser: false,
        isTyping: true,
        id: Date.now()
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-50">
      {/* Disha Avatar with Welcome Popup */}
      <div className="relative">
        {/* Welcome Popup */}
        <WelcomePopup
          message={t('chatbotWelcome', selectedLanguage)}
          visible={showWelcomePopup}
          onClose={handleWelcomePopupClose}
          position="top"
        />
        
        {/* Avatar Toggle */}
        <button
          type="button"
          onClick={toggleChatbot}
          className="transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Toggle chatbot"
        >
          <DishaAvatar size={60} className="sm:w-[70px] sm:h-[70px] cursor-pointer" />
        </button>
      </div>

      {/* Chatbot container */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-0 sm:bottom-16 left-0 right-0 sm:left-auto sm:right-0 w-full sm:w-80 md:w-96 bg-white rounded-t-lg sm:rounded-lg shadow-xl overflow-hidden flex flex-col h-[90vh] sm:h-[500px] z-40">
          {/* Header */}
          <div className="bg-purple-700 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-medium text-sm sm:text-base">{t('chatbotAssistant', selectedLanguage)}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLanguageSelector(true)}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors cursor-pointer"
                title="Change Language"
              >
                🌐 {selectedLanguage.toUpperCase()}
              </button>
              {/* Close button for mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50">
            {/* Language Selector */}
            {showLanguageSelector && (
              <div className="mb-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm border">
                <LanguageSelector
                  onLanguageSelect={handleLanguageSelect}
                  currentLanguage={selectedLanguage}
                />
              </div>
            )}
            
            {/* Messages */}
            {messages.map((message, index) => (
              <Message key={message.id || index} text={message.text} isUser={message.isUser} isTyping={message.isTyping} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none px-3 sm:px-4 py-2 flex items-center text-sm">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t('chatbotThinking', selectedLanguage)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={showLanguageSelector ? 'Please select a language first...' : t('chatbotPlaceholder', selectedLanguage)}
                disabled={showLanguageSelector}
                className={`flex-1 border border-gray-300 rounded-full px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${showLanguageSelector ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim() || showLanguageSelector}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-full p-2 sm:p-2.5 transition-colors duration-300 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;