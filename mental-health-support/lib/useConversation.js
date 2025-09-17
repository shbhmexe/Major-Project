'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth';

export function useConversation() {
  const { user, isAuthenticated, isGuest } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Fetch user's conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = isAuthenticated && user ? user.id : null;
      const guestId = !isAuthenticated || isGuest ? getGuestId() : null;
      
      const queryParams = new URLSearchParams();
      if (userId) queryParams.append('userId', userId);
      if (guestId) queryParams.append('guestId', guestId);
      
      const response = await fetch(`/api/conversations?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isGuest, user, getGuestId]);

  // Create a new conversation
  const createConversation = useCallback(async (initialMessages, title = 'New Conversation') => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = isAuthenticated && user && !isGuest ? user.id : null;
      const guestId = !isAuthenticated || isGuest ? getGuestId() : null;
      
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          guestId,
          messages: initialMessages,
          title
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create conversation');
      }
      
      const data = await response.json();
      const newConversation = data.conversation;
      
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
      
      return newConversation;
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isGuest, user, getGuestId]);

  // Add messages to an existing conversation
  const addMessages = useCallback(async (conversationId, newMessages) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/conversations/${conversationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update conversation');
      }
      
      const data = await response.json();
      const updatedConversation = data.conversation;
      
      // Update conversations list
      setConversations(prev => 
        prev.map(conv => 
          conv._id === conversationId ? updatedConversation : conv
        )
      );
      
      // Update current conversation if it's the one being modified
      if (currentConversation && currentConversation._id === conversationId) {
        setCurrentConversation(updatedConversation);
      }
      
      return updatedConversation;
    } catch (err) {
      console.error('Error adding messages:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentConversation]);

  // Delete a conversation
  const deleteConversation = useCallback(async (conversationId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/conversations/${conversationId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete conversation');
      }
      
      // Remove from conversations list
      setConversations(prev => 
        prev.filter(conv => conv._id !== conversationId)
      );
      
      // Clear current conversation if it's the one being deleted
      if (currentConversation && currentConversation._id === conversationId) {
        setCurrentConversation(null);
      }
      
      return true;
    } catch (err) {
      console.error('Error deleting conversation:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentConversation]);

  // Load a specific conversation
  const loadConversation = useCallback(async (conversationId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/conversations/${conversationId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load conversation');
      }
      
      const data = await response.json();
      setCurrentConversation(data.conversation);
      
      return data.conversation;
    } catch (err) {
      console.error('Error loading conversation:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch conversations when auth state changes
  useEffect(() => {
    if (isAuthenticated || isGuest) {
      fetchConversations();
    }
  }, [isAuthenticated, isGuest, fetchConversations]);

  return {
    conversations,
    currentConversation,
    loading,
    error,
    fetchConversations,
    createConversation,
    addMessages,
    deleteConversation,
    loadConversation,
    setCurrentConversation
  };
}