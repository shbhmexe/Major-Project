'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { cn } from '@/lib/utils';
import { generateGeminiResponse, splitResponseIntoMessages } from '@/lib/gemini';
import { useConversation } from '@/lib/useConversation';
import { usePreferences } from '@/lib/usePreferences';
import { PreferencesPanel } from '@/components/PreferencesPanel';

// Fallback responses in case the API fails
const FALLBACK_RESPONSES = [
  "I'm having trouble connecting right now. Please try again in a moment.",
  "It seems there's a technical issue. Let me try to help you anyway.",
  "I apologize for the inconvenience. Our systems are experiencing some delays."
];

export default function ChatPage() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPreferencesPanelOpen, setIsPreferencesPanelOpen] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const speechSynthesisRef = useRef(null);
  
  // Use conversation hook for persistence
  const {
    conversations,
    currentConversation,
    loading: conversationLoading,
    createConversation,
    addMessages,
    loadConversation,
    setCurrentConversation
  } = useConversation();
  
  // Use preferences hook for customization
  const { preferences } = usePreferences();
  
  // Get text content from text.md
  const chatTitle = useText('ai_chatbot.chat_interface.chat_title', 'AI Support Assistant');
  const chatSubtitle = useText('ai_chatbot.chat_interface.chat_subtitle', 'I\'m here to listen and help. What\'s on your mind?');
  const chatPlaceholder = useText('ai_chatbot.chat_interface.chat_placeholder', 'Type your message here...');
  const chatSend = useText('ai_chatbot.chat_interface.chat_send', 'Send');
  const chatLoading = useText('ai_chatbot.chat_interface.chat_loading', 'Thinking...');
  const chatRestart = useText('ai_chatbot.chat_interface.chat_restart', 'Start New Chat');
  
  const welcomeMessage = useText('ai_chatbot.initial_messages.chat_welcome', 'Hi there! I\'m your mental health support assistant. How are you feeling today?');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [isAuthenticated, isGuest, router]);
  
  // Initialize chat with welcome message or load existing conversation
  useEffect(() => {
    if (isAuthenticated || isGuest) {
      // If there are conversations, load the most recent one
      if (conversations.length > 0 && !currentConversation) {
        const mostRecentConversation = conversations[0];
        loadConversation(mostRecentConversation._id);
      } else if (conversations.length === 0 && !currentConversation) {
        // If no conversations exist, initialize with welcome message
        setMessages([
          {
            id: 'welcome',
            type: 'ai',
            content: welcomeMessage,
            timestamp: new Date().toISOString(),
          }
        ]);
      }
    }
  }, [isAuthenticated, isGuest, welcomeMessage, conversations, currentConversation, loadConversation]);
  
  // Update messages when current conversation changes
  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages.map(msg => ({
        id: msg._id || msg.id,
        type: msg.role || msg.type, // Fix: use both role and type
        content: msg.content,
        timestamp: msg.timestamp
      })));
    }
  }, [currentConversation]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    const userInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Get response from Gemini API with user preferences
      const response = await generateGeminiResponse(userInput, {
        responseStyle: preferences.aiResponseStyle,
        customPrompt: preferences.customPrompt
      });
      
      // Split the response into multiple messages if it's too long
      const aiResponses = splitResponseIntoMessages(response);
      
      // Create array to collect all AI responses
      const allAiMessages = [];
      
      // Add AI responses with staggered timing
      aiResponses.forEach((responseContent, index) => {
        setTimeout(() => {
          const aiMessage = {
            id: `ai-${Date.now()}-${index}`,
            type: 'ai',
            role: 'ai',
            content: responseContent,
            timestamp: new Date().toISOString(),
          };
          
          allAiMessages.push(aiMessage);
          setMessages(prev => [...prev, aiMessage]);
          
          // Play sound if enabled
          if (preferences.soundEnabled && index === 0) {
            playMessageSound();
          }

          // Auto-play text-to-speech for AI responses (first message only)
          if (index === 0 && preferences.textToSpeechEnabled) {
            setTimeout(() => {
              speakText(responseContent, aiMessage.id);
            }, 500); // Small delay to ensure message is rendered
          }
          
          // Set typing to false after last message
          if (index === aiResponses.length - 1) {
            setIsTyping(false);
            
            // Save conversation to database
            saveConversation([userMessage, ...allAiMessages]);
          }
        }, index * 1500); // Stagger responses by 1.5 seconds
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Use a fallback response if the API fails
      const fallbackResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      
      setTimeout(() => {
        const aiMessage = {
          id: `ai-${Date.now()}-fallback`,
          type: 'ai',
          role: 'ai',
          content: fallbackResponse,
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        
        // Save conversation to database
        saveConversation([userMessage, aiMessage]);
      }, 1000);
    }
  };
  
  // Play message sound
  const playMessageSound = () => {
    if (typeof window !== 'undefined' && preferences.soundEnabled) {
      try {
        const audio = new Audio('/sounds/message.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => {
          // Silently fail if sound file is missing
          console.debug('Audio play failed (sound file may be missing):', e);
        });
      } catch (error) {
        console.debug('Failed to play sound (sound file may be missing):', error);
      }
    }
  };

  // Text-to-speech function
  const speakText = (text, messageId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.log('Speech synthesis not supported');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    if (speakingMessageId === messageId) {
      // If already speaking this message, stop it
      setSpeakingMessageId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    // Try to use a female voice for more comforting mental health support
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('hazel')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => {
      setSpeakingMessageId(messageId);
    };

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
      console.log('Speech synthesis error');
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech function
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);
  
  // Save conversation to database
  const saveConversation = async (newMessages) => {
    try {
      if (currentConversation) {
        // Add messages to existing conversation
        await addMessages(currentConversation._id, newMessages);
      } else {
        // Create a new conversation
        const title = newMessages[0]?.content?.substring(0, 50) + '...' || 'New Conversation';
        await createConversation(newMessages, title);
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };
  
  // Handle starting a new chat
  const handleNewChat = () => {
    // Clear current conversation
    setCurrentConversation(null);
    
    // Reset messages to welcome message
    const welcomeMsg = {
      id: 'welcome',
      type: 'ai',
      role: 'ai',
      content: welcomeMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([welcomeMsg]);
  };
  
  // If not authenticated and not guest, show nothing while redirecting
  if (!isAuthenticated && !isGuest) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              >
                SukoonU
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreferencesPanelOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Preferences"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button 
                onClick={() => router.push('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 dark:bg-blue-700 p-4 text-white">
            <h2 className="text-xl font-bold">{chatTitle}</h2>
            <p className="text-blue-100 text-sm mt-1">{chatSubtitle}</p>
          </div>
          
          {/* Chat Messages */}
          <div className={`p-4 h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-900 ${preferences.fontSize === 'small' ? 'text-sm' : preferences.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-lg p-4 relative",
                      message.type === 'user' 
                        ? "bg-blue-600 text-white" 
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm"
                    )}
                  >
                    <AnimatedText 
                      text={message.content} 
                      className="text-sm md:text-base" 
                      duration={0.3}
                    />
                    
                    {/* Speaker button for AI messages */}
                    {message.type === 'ai' && (
                      <button
                        onClick={() => speakText(message.content, message.id)}
                        className={cn(
                          "absolute top-2 right-2 p-1 rounded-full transition-colors",
                          speakingMessageId === message.id
                            ? "bg-blue-500 text-white animate-pulse"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                        )}
                        title={speakingMessageId === message.id ? "Stop speaking" : "Listen to message"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          {speakingMessageId === message.id ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9v6l4-3-4-3z" />
                          )}
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm max-w-[80%]">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{chatLoading}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={chatPlaceholder}
                disabled={isTyping}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className={cn(
                  "px-4 py-2 rounded-lg text-white font-medium transition-colors",
                  !input.trim() || isTyping
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                )}
              >
                {chatSend}
              </button>
            </form>
          </div>
          
          {/* Chat Actions */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-center space-x-4">
            <button
              onClick={handleNewChat}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {chatRestart}
            </button>
            
            {conversations.length > 0 && (
              <div className="relative inline-block text-left">
                <select 
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onChange={(e) => {
                    if (e.target.value === 'new') {
                      handleNewChat();
                    } else {
                      loadConversation(e.target.value);
                    }
                  }}
                  value={currentConversation?._id || 'new'}
                >
                  <option value="new">New Conversation</option>
                  {conversations.map((conv) => (
                    <option key={conv._id} value={conv._id}>
                      {conv.title || 'Untitled Conversation'}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Preferences Panel */}
      <PreferencesPanel 
        isOpen={isPreferencesPanelOpen} 
        onClose={() => setIsPreferencesPanelOpen(false)} 
      />
    </div>
  );
}