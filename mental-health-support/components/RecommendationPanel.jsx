'use client';

import { useState } from 'react';
import { useRecommendations } from '@/lib/useRecommendations';
import { cn } from '@/lib/utils';

export function RecommendationPanel({ onSelectResource }) {
  const [query, setQuery] = useState('');
  const { recommendations, isLoading, error, getRecommendations } = useRecommendations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getRecommendations(query);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Personalized Recommendations
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Describe your current concerns, interests, or what you're looking for help with, and we'll recommend resources tailored to your needs.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., I'm feeling anxious about exams"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-white transition-colors",
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              )}
            >
              {isLoading ? "Finding..." : "Get Recommendations"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recommended Resources
            </h3>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recommendations.map((resource) => (
                <div key={resource.id} className="py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {resource.type === 'video' && (
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </span>
                      )}
                      {resource.type === 'audio' && (
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242-4.243a1 1 0 00-1.415 0L8.414 8.464l-4.243 4.242a1 1 0 000 1.415l4.243 4.242a1 1 0 001.414 0l4.242-4.242z"></path>
                          </svg>
                        </span>
                      )}
                      {resource.type === 'guide' && (
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        {resource.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {resource.description}
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Why it's relevant:</span> {resource.relevance}
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs dark:bg-gray-700 dark:text-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() => onSelectResource(resource.id)}
                          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          View Resource
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && recommendations.length === 0 && query && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-gray-600 dark:text-gray-300">No recommendations found. Try a different query.</p>
          </div>
        )}
      </div>
    </div>
  );
}