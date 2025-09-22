'use client';

import { useState, useEffect } from 'react';
import { usePreferences } from '@/lib/usePreferences';
import { useText } from '@/app/providers';

export function PreferencesPanel({ isOpen, onClose }) {
  const { preferences, updatePreferences } = usePreferences();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get text content from text.md
  const prefsTitle = useText('preferences.title', 'Customize Your Experience');
  const prefsTheme = useText('preferences.theme', 'Theme');
  const prefsFontSize = useText('preferences.font_size', 'Font Size');
  const prefsResponseStyle = useText('preferences.response_style', 'AI Response Style');
  const prefsNotifications = useText('preferences.notifications', 'Enable Notifications');
  const prefsSound = useText('preferences.sound', 'Enable Sound');
  const prefsCustomPrompt = useText('preferences.custom_prompt', 'Custom AI Instructions');
  const prefsSave = useText('preferences.save', 'Save Preferences');
  const prefsCancel = useText('preferences.cancel', 'Cancel');
  
  // Update local state when preferences change
  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updatePreferences(localPreferences);
      onClose();
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{prefsTitle}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {prefsTheme}
              </label>
              <select
                name="theme"
                value={localPreferences.theme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {prefsFontSize}
              </label>
              <select
                name="fontSize"
                value={localPreferences.fontSize}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            {/* AI Response Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {prefsResponseStyle}
              </label>
              <select
                name="aiResponseStyle"
                value={localPreferences.aiResponseStyle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="supportive">Supportive</option>
              </select>
            </div>
            
            {/* Notifications Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationsEnabled"
                name="notificationsEnabled"
                checked={localPreferences.notificationsEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationsEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                {prefsNotifications}
              </label>
            </div>
            
            {/* Sound Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="soundEnabled"
                name="soundEnabled"
                checked={localPreferences.soundEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="soundEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                {prefsSound}
              </label>
            </div>
            
            {/* Text-to-Speech Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="textToSpeechEnabled"
                name="textToSpeechEnabled"
                checked={localPreferences.textToSpeechEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="textToSpeechEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Enable Text-to-Speech (AI responses will be spoken automatically)
              </label>
            </div>
            
            {/* Custom Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {prefsCustomPrompt}
              </label>
              <textarea
                name="customPrompt"
                value={localPreferences.customPrompt || ''}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Add specific instructions for the AI assistant..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {localPreferences.customPrompt?.length || 0}/500 characters
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {prefsCancel}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : prefsSave}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}