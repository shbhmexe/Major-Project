'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './auth';
import { usePreferences } from './usePreferences';

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { preferences } = usePreferences();

  // Function to get recommendations based on a query
  const getRecommendations = useCallback(async (query) => {
    if (!query || query.trim() === '') {
      setError('Please provide a search query');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare user preferences to send to the API
      const userPreferences = {
        language: preferences?.language || 'English',
        interests: user?.interests || [],
        responseStyle: preferences?.aiResponseStyle || 'supportive'
      };

      // Call the recommendations API
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          userPreferences
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data = await response.json();
      const recommendationsList = data.recommendations || [];
      
      setRecommendations(recommendationsList);
      setIsLoading(false);
      return recommendationsList;
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError(err.message || 'Failed to get recommendations');
      setIsLoading(false);
      return [];
    }
  }, [user, preferences]);

  // Function to clear recommendations
  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
    setError(null);
  }, []);

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations,
    clearRecommendations
  };
}