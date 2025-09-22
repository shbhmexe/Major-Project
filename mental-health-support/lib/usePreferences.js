'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth';

export function usePreferences() {
  const { user, isAuthenticated, isGuest } = useAuth();
  const [preferences, setPreferences] = useState({
    theme: 'system',
    fontSize: 'medium',
    aiResponseStyle: 'supportive',
    language: 'en',
    notificationsEnabled: true,
    soundEnabled: true,
    textToSpeechEnabled: true,
    customPrompt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Generate a guest ID for anonymous users
  const getGuestId = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    let guestId = localStorage.getItem('mh_guest_id');
    if (!guestId) {
      guestId = 'guest_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('mh_guest_id', guestId);
    }
    return guestId;
  }, []);

  // Fetch user preferences
  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = isAuthenticated && user ? user.id : null;
      const guestId = !isAuthenticated || isGuest ? getGuestId() : null;
      
      const queryParams = new URLSearchParams();
      if (userId) queryParams.append('userId', userId);
      if (guestId) queryParams.append('guestId', guestId);
      
      const response = await fetch(`/api/preferences?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch preferences');
      }
      
      const data = await response.json();
      setPreferences(data.preferences);
      setHasFetched(true);
      
      // Also store in localStorage for faster access
      localStorage.setItem('mh_preferences', JSON.stringify(data.preferences));
      
      return data.preferences;
    } catch (err) {
      console.error('Error fetching preferences:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const storedPrefs = localStorage.getItem('mh_preferences');
      if (storedPrefs) {
        try {
          const parsedPrefs = JSON.parse(storedPrefs);
          setPreferences(parsedPrefs);
          return parsedPrefs;
        } catch (e) {
          console.error('Failed to parse stored preferences');
        }
      }
      
      // Return default preferences as fallback
      const defaultPrefs = {
        theme: 'system',
        fontSize: 'medium',
        aiResponseStyle: 'supportive',
        language: 'en',
        notificationsEnabled: true,
        soundEnabled: true,
        textToSpeechEnabled: true,
        customPrompt: ''
      };
      return defaultPrefs;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isGuest, user, getGuestId]);

  // Update user preferences
  const updatePreferences = useCallback(async (newPreferences) => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = isAuthenticated && user && !isGuest ? user.id : null;
      const guestId = !isAuthenticated || isGuest ? getGuestId() : null;
      
      // Merge with current preferences
      const updatedPreferences = { ...preferences, ...newPreferences };
      
      // Optimistically update local state
      setPreferences(updatedPreferences);
      localStorage.setItem('mh_preferences', JSON.stringify(updatedPreferences));
      
      // Send to server
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          guestId,
          ...newPreferences
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update preferences');
      }
      
      const data = await response.json();
      return data.preferences;
    } catch (err) {
      console.error('Error updating preferences:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isGuest, user, getGuestId, preferences]);

  // Apply theme preference
  const applyTheme = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const { theme } = preferences;
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on preference
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Store theme in localStorage for faster access on page load
    localStorage.setItem('mh_theme', theme);
  }, [preferences]);

  // Apply font size preference
  const applyFontSize = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const { fontSize } = preferences;
    const root = window.document.documentElement;
    
    // Remove existing font size classes
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    
    // Apply font size based on preference
    switch (fontSize) {
      case 'small':
        root.classList.add('text-sm');
        break;
      case 'medium':
        root.classList.add('text-base');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
      default:
        root.classList.add('text-base');
    }
  }, [preferences]);

  // Initialize preferences from localStorage or fetch from server
  useEffect(() => {
    let isMounted = true;
    
    const initPreferences = async () => {
      // Try to load from localStorage first for faster initial load
      const storedPrefs = localStorage.getItem('mh_preferences');
      if (storedPrefs && isMounted) {
        try {
          setPreferences(JSON.parse(storedPrefs));
        } catch (e) {
          console.error('Failed to parse stored preferences');
        }
      }
      
      // Then fetch from server to ensure we have the latest (only if we haven't fetched yet)
      if ((isAuthenticated || isGuest) && isMounted && !hasFetched) {
        await fetchPreferences();
      }
    };
    
    initPreferences();
    
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, isGuest, hasFetched, fetchPreferences]);

  // Apply theme and font size whenever preferences change
  useEffect(() => {
    applyTheme();
    applyFontSize();
  }, [preferences, applyTheme, applyFontSize]);

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    fetchPreferences
  };
}