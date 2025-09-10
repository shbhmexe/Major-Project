'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setTextContent } from '@/lib/textContent';
import { SessionProvider } from 'next-auth/react';

// Create a context for text content
const TextContentContext = createContext({});

// Provider component for text content
export function TextContentProvider({ textContent, children }) {
  // Set the text content in the client-side cache
  useEffect(() => {
    setTextContent(textContent);
  }, [textContent]);

  return (
    <TextContentContext.Provider value={textContent}>
      {children}
    </TextContentContext.Provider>
  );
}

// Hook to access text content
export function useTextContent() {
  return useContext(TextContentContext);
}

// Hook to get a specific text item
export function useText(path, fallback = '') {
  const textContent = useTextContent();
  
  if (!textContent) return fallback;
  
  const parts = path.split('.');
  let current = textContent;
  
  for (const part of parts) {
    if (!current[part]) return fallback;
    current = current[part];
  }
  
  return current || fallback;
}

// Context for animation preferences
const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
});

// Provider component for animation preferences
export function AnimationProvider({ children, initialState = true }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(initialState);

  // Check for prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setAnimationsEnabled(false);
    }

    // Listen for changes
    const handleChange = (e) => {
      setAnimationsEnabled(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}

// Hook to access animation preferences
export function useAnimationPreference() {
  return useContext(AnimationContext);
}

// NextAuth SessionProvider wrapper
export function AuthSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}