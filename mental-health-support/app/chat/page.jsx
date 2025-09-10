'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { cn } from '@/lib/utils';

// Mock AI responses for demonstration
const AI_RESPONSES = {
  greeting: [
    "Hi there! I'm your mental health support assistant. How are you feeling today?",
    "You can talk about your feelings, ask for coping strategies, or learn about mental health resources.",
    "Remember, I'm an AI assistant and not a replacement for professional help. If you're in crisis, please contact emergency services or talk to a counselor."
  ],
  anxiety: [
    "It sounds like you might be experiencing anxiety. This is very common among students.",
    "Deep breathing can help. Try breathing in for 4 counts, holding for 4, and exhaling for 6.",
    "Would you like to learn more coping strategies for anxiety?"
  ],
  stress: [
    "Academic stress can be overwhelming. Remember that it's okay to take breaks.",
    "Try breaking down your tasks into smaller, manageable steps.",
    "Have you tried any relaxation techniques like mindfulness or progressive muscle relaxation?"
  ],
  sadness: [
    "I'm sorry to hear you're feeling down. It's important to acknowledge these feelings.",
    "Connecting with friends or family can sometimes help when we're feeling sad.",
    "Would it help to talk about what might be contributing to these feelings?"
  ],
  sleep: [
    "Sleep problems can significantly impact mental health and academic performance.",
    "Try establishing a consistent sleep schedule and a relaxing bedtime routine.",
    "Limiting screen time before bed can also help improve sleep quality."
  ],
  escalation: [
    "It sounds like you might benefit from talking to a professional counselor. Would you like me to help you book a session?",
    "While I'm here to support you, a trained counselor could provide more personalized guidance for what you're experiencing.",
    "Would you prefer to continue chatting with me, or would you like to explore booking options?"
  ]
};

// Function to determine AI response based on message content
function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
    return AI_RESPONSES.anxiety;
  } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
    return AI_RESPONSES.stress;
  } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('unhappy')) {
    return AI_RESPONSES.sadness;
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
    return AI_RESPONSES.sleep;
  } else if (lowerMessage.includes('suicid') || lowerMessage.includes('harm') || lowerMessage.includes('kill')) {
    return AI_RESPONSES.escalation;
  } else {
    // Default response for messages that don't match specific keywords
    return ["I'm here to listen. Can you tell me more about how you're feeling?"];
  }
}

export default function ChatPage() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
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
  
  // Initialize chat with welcome message
  useEffect(() => {
    if (isAuthenticated || isGuest) {
      setMessages([
        {
          id: 'welcome',
          type: 'ai',
          content: welcomeMessage,
          timestamp: new Date().toISOString(),
        }
      ]);
    }
  }, [isAuthenticated, isGuest, welcomeMessage]);
  
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
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponses = getAIResponse(input);
      
      // Add AI responses with staggered timing
      aiResponses.forEach((response, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `ai-${Date.now()}-${index}`,
            type: 'ai',
            content: response,
            timestamp: new Date().toISOString(),
          }]);
          
          // Set typing to false after last message
          if (index === aiResponses.length - 1) {
            setIsTyping(false);
          }
        }, index * 1500); // Stagger responses by 1.5 seconds
      });
    }, 1000);
  };
  
  // Handle starting a new chat
  const handleNewChat = () => {
    setMessages([
      {
        id: 'welcome',
        type: 'ai',
        content: welcomeMessage,
        timestamp: new Date().toISOString(),
      }
    ]);
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
                MindfulCampus
              </button>
            </div>
            <div className="flex items-center space-x-4">
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
          <div className="p-4 h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-900">
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
                      "max-w-[80%] rounded-lg p-4",
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
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <button
              onClick={handleNewChat}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {chatRestart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}