'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { RecommendationPanel } from '@/components/RecommendationPanel';
import { cn } from '@/lib/utils';

// Mock resource data
const RESOURCES = [
  {
    id: 1,
    title: 'Understanding Anxiety',
    description: 'Learn about the causes, symptoms, and management strategies for anxiety.',
    type: 'video',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1726866269685-3b36a1217342?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '12:45',
    languages: ['English', 'Hindi', 'Tamil'],
    tags: ['anxiety', 'stress', 'coping']
  },
  {
    id: 2,
    title: 'Mindfulness Meditation Guide',
    description: 'A step-by-step guide to practicing mindfulness meditation for beginners.',
    type: 'audio',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1726862981769-7c514d959ac7?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '18:30',
    languages: ['English', 'Hindi', 'Bengali', 'Telugu'],
    tags: ['meditation', 'mindfulness', 'relaxation']
  },
  {
    id: 3,
    title: 'Coping with Academic Pressure',
    description: 'Strategies to manage academic stress and maintain mental well-being during exams.',
    type: 'guide',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1661274089335-a830e5564149?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    pages: 15,
    languages: ['English', 'Hindi', 'Marathi', 'Kannada'],
    tags: ['academic', 'stress', 'exams', 'time-management']
  },
  {
    id: 4,
    title: 'Sleep Hygiene for Students',
    description: 'Improve your sleep quality with these evidence-based techniques.',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1688383454417-b11a123846e9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '09:20',
    languages: ['English', 'Hindi', 'Gujarati'],
    tags: ['sleep', 'health', 'routine']
  },
  {
    id: 5,
    title: 'Managing Social Anxiety',
    description: 'Practical exercises to overcome social anxiety in university settings.',
    type: 'guide',
    thumbnail: 'https://images.unsplash.com/photo-1650850048713-5460c8f143ab?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    pages: 22,
    languages: ['English', 'Hindi', 'Tamil', 'Malayalam'],
    tags: ['social-anxiety', 'communication', 'confidence']
  },
  {
    id: 6,
    title: 'Progressive Muscle Relaxation',
    description: 'Audio guide for progressive muscle relaxation technique to reduce physical tension.',
    type: 'audio',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1663047098407-8ee57de900f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '15:10',
    languages: ['English', 'Hindi', 'Punjabi', 'Bengali'],
    tags: ['relaxation', 'stress-relief', 'physical-health']
  },
  {
    id: 7,
    title: 'Understanding Depression',
    description: 'Signs, symptoms, and support strategies for depression among young adults.',
    type: 'video',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1663012950852-83c7f6e25d46?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '14:35',
    languages: ['English', 'Hindi', 'Telugu', 'Kannada'],
    tags: ['depression', 'mood', 'support']
  },
  {
    id: 8,
    title: 'Building Healthy Relationships',
    description: 'Guide to developing and maintaining healthy relationships in college.',
    type: 'guide',
    thumbnail: 'https://images.unsplash.com/photo-1531174941052-1233fe13cc0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    pages: 18,
    languages: ['English', 'Hindi', 'Marathi'],
    tags: ['relationships', 'communication', 'boundaries']
  }
];

// Available languages for filtering
const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];

// Available resource types for filtering
const RESOURCE_TYPES = ['video', 'audio', 'guide'];

// Available tags for filtering
const TAGS = ['anxiety', 'stress', 'coping', 'meditation', 'mindfulness', 'relaxation', 
              'academic', 'exams', 'time-management', 'sleep', 'health', 'routine',
              'social-anxiety', 'communication', 'confidence', 'relaxation', 'stress-relief',
              'physical-health', 'depression', 'mood', 'support', 'relationships', 'boundaries'];

export default function ResourcesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest } = useAuth();
  const [resources, setResources] = useState(RESOURCES);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Get text content from text.md
  const resourcesTitle = useText('resource_hub.title', 'Psychoeducational Resource Hub');
  const resourcesSubtitle = useText('resource_hub.subtitle', 'Videos, audios, and guides in multiple languages');
  const searchPlaceholder = useText('resource_hub.search_placeholder', 'Search resources...');
  const languageFilterLabel = useText('resource_hub.language_filter', 'Language');
  const typeFilterLabel = useText('resource_hub.type_filter', 'Resource Type');
  const tagsFilterLabel = useText('resource_hub.tags_filter', 'Topics');
  const allTypesText = useText('resource_hub.all_types', 'All Types');
  const videoTypeText = useText('resource_hub.video_type', 'Videos');
  const audioTypeText = useText('resource_hub.audio_type', 'Audio Guides');
  const guideTypeText = useText('resource_hub.guide_type', 'Written Guides');
  const backToResourcesText = useText('resource_hub.back_button', 'Back to Resources');
  const watchNowText = useText('resource_hub.watch_button', 'Watch Now');
  const listenNowText = useText('resource_hub.listen_button', 'Listen Now');
  const readNowText = useText('resource_hub.read_button', 'Read Now');
  const durationText = useText('resource_hub.duration_label', 'Duration');
  const pagesText = useText('resource_hub.pages_label', 'Pages');
  const availableLanguagesText = useText('resource_hub.available_languages', 'Available in');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [isAuthenticated, isGuest, router]);
  
  // Filter resources based on search, language, type, and tags
  useEffect(() => {
    let filteredResources = [...RESOURCES];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredResources = filteredResources.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by language
    if (selectedLanguage) {
      filteredResources = filteredResources.filter(resource => 
        resource.languages.includes(selectedLanguage)
      );
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filteredResources = filteredResources.filter(resource => 
        resource.type === selectedType
      );
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filteredResources = filteredResources.filter(resource => 
        selectedTags.some(tag => resource.tags.includes(tag))
      );
    }
    
    setResources(filteredResources);
  }, [searchQuery, selectedLanguage, selectedType, selectedTags]);
  
  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Get action button text based on resource type
  const getActionButtonText = (type) => {
    switch (type) {
      case 'video': return watchNowText;
      case 'audio': return listenNowText;
      case 'guide': return readNowText;
      default: return 'View';
    }
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
                onClick={() => router.push('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Resource Hub Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <AnimatedText 
            text={resourcesTitle} 
            className="text-3xl font-bold text-gray-900 dark:text-white" 
            duration={0.5}
          />
          <AnimatedText 
            text={resourcesSubtitle} 
            className="mt-2 text-xl text-gray-600 dark:text-gray-300" 
            duration={0.5}
            delay={0.1}
          />
        </div>
        
        {/* Personalized Recommendations Panel */}
        {!selectedResource && (
          <div className="mb-8">
            <RecommendationPanel 
              onSelectResource={(resourceId) => {
                const resource = RESOURCES.find(r => r.id === resourceId);
                if (resource) {
                  setSelectedResource(resource);
                }
              }} 
            />
          </div>
        )}
        
        {!selectedResource ? (
          <>
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  {/* Search */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  {/* Language Filter */}
                  <div className="w-full md:w-48">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{languageFilterLabel}</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {LANGUAGES.map((language) => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Type Filter */}
                  <div className="w-full md:w-48">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{typeFilterLabel}</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">{allTypesText}</option>
                      <option value="video">{videoTypeText}</option>
                      <option value="audio">{audioTypeText}</option>
                      <option value="guide">{guideTypeText}</option>
                    </select>
                  </div>
                </div>
                
                {/* Tags Filter */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{tagsFilterLabel}</label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                          selectedTags.includes(tag)
                            ? "bg-blue-600 text-white dark:bg-blue-500"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resource Grid */}
            {resources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {resources.map((resource) => (
                  <div 
                    key={resource.id}
                    onClick={() => setSelectedResource(resource)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="relative">
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black bg-opacity-70 text-white text-xs font-medium">
                        {resource.type === 'guide' ? (
                          <span>{resource.pages} {pagesText}</span>
                        ) : (
                          <span>{resource.duration}</span>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="flex space-x-2">
                          {resource.type === 'video' && (
                            <span className="px-2 py-1 rounded-full bg-red-600 text-white text-xs font-medium">{videoTypeText}</span>
                          )}
                          {resource.type === 'audio' && (
                            <span className="px-2 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">{audioTypeText}</span>
                          )}
                          {resource.type === 'guide' && (
                            <span className="px-2 py-1 rounded-full bg-green-600 text-white text-xs font-medium">{guideTypeText}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{resource.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {availableLanguagesText} {resource.languages.length} {resource.languages.length > 1 ? 'languages' : 'language'}
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                          {getActionButtonText(resource.type)}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No resources found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        ) : (
          /* Resource Detail View */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={selectedResource.thumbnail} 
                alt={selectedResource.title} 
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedResource(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h2 className="text-2xl font-bold text-white">{selectedResource.title}</h2>
                <div className="flex space-x-2 mt-2">
                  {selectedResource.type === 'video' && (
                    <span className="px-2 py-1 rounded-full bg-red-600 text-white text-xs font-medium">{videoTypeText}</span>
                  )}
                  {selectedResource.type === 'audio' && (
                    <span className="px-2 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">{audioTypeText}</span>
                  )}
                  {selectedResource.type === 'guide' && (
                    <span className="px-2 py-1 rounded-full bg-green-600 text-white text-xs font-medium">{guideTypeText}</span>
                  )}
                  {selectedResource.type !== 'guide' ? (
                    <span className="px-2 py-1 rounded-full bg-gray-700 text-white text-xs font-medium">{durationText}: {selectedResource.duration}</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-gray-700 text-white text-xs font-medium">{pagesText}: {selectedResource.pages}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedResource.description}</p>
              
              {/* Language Options */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{availableLanguagesText}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.languages.map((language) => (
                    <button
                      key={language}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        language === selectedLanguage
                          ? "bg-blue-600 text-white dark:bg-blue-500"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      )}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{tagsFilterLabel}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Mock Content Player */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 flex flex-col items-center justify-center">
                {selectedResource.type === 'video' && (
                  <>
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                      {watchNowText}
                    </button>
                  </>
                )}
                
                {selectedResource.type === 'audio' && (
                  <>
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242-4.243a1 1 0 00-1.415 0L8.414 8.464l-4.243 4.242a1 1 0 000 1.415l4.243 4.242a1 1 0 001.414 0l4.242-4.242z"></path>
                    </svg>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      {listenNowText}
                    </button>
                  </>
                )}
                
                {selectedResource.type === 'guide' && (
                  <>
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                      {readNowText}
                    </button>
                  </>
                )}
              </div>
              
              {/* Back Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {backToResourcesText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}