'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { useLanguage } from '@/lib/language';
import { AnimatedText } from '@/components/AnimatedText';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MobileNavigation } from '@/components/MobileNavigation';
import { EmergencySOS } from '@/components/EmergencySOS';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ShootingStars } from '@/components/ShootingStars';
import { StarsBackground } from '@/components/StarsBackground';

export default function HomePage() {
  // Doctor-themed mental health support page
  const router = useRouter();
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-x-hidden">
      {/* Navigation - Doctor Themed */}
      <nav className="bg-white dark:bg-gray-800 shadow-md border-b-2 border-teal-100 dark:border-teal-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xl font-bold text-teal-600 dark:text-teal-400">{t('appName')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => router.push('/chat')}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {t('chat')}
                    </button>
                    <button 
                      onClick={() => router.push('/resources')}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {t('resources')}
                    </button>
                    <button 
                      onClick={() => router.push('/booking')}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {t('booking')}
                    </button>
                    <button 
                      onClick={() => router.push('/forum')}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {t('forum')}
                    </button>
                    <button 
                      onClick={() => router.push('/profile')}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {user?.name || t('profile')}
                    </button>
                    <button 
                      onClick={logout}
                      className="ml-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => router.push('/login')}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      {t('login')}
                    </button>
                    <button 
                      onClick={() => router.push('/signup')}
                      className="ml-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      {t('signup')}
                    </button>
                  </>
                )}
                <LanguageSwitcher />
                <EmergencySOS className="ml-4" />
              </div>
              
              {/* Mobile Emergency SOS Button */}
              <div className="md:hidden mr-2">
                <EmergencySOS className="" />
              </div>
              
              {/* Mobile Navigation */}
              <MobileNavigation />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Guest Mode Banner - Medical Themed */}
      {isGuest && (
        <div className="bg-teal-50 dark:bg-teal-900/30 border-b border-teal-100 dark:border-teal-800/50 p-3 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-teal-800 dark:text-teal-200">{t('anonymousMode')}</h3>
                  <p className="text-xs text-teal-700 dark:text-teal-300 mt-0.5">{t('browssingAnonymously')}</p>
                </div>
              </div>
              <button 
                onClick={() => router.push('/signup')}
                className="text-xs px-3 py-1.5 rounded-md bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                {t('signUpNow')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Background Components */}
      <StarsBackground className="z-0" />
      <ShootingStars className="z-0" />
      
      {/* Hero Section - Medical Themed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <div className="inline-block bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Professional Mental Health Support
            </div>
            <AnimatedText 
              text={t('heroTitle')} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white" 
              duration={0.7}
            />
            <p className="mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              {t('heroSubtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => router.push('/resources')}
                className="px-8 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t('exploreResources')}
              </button>
              <button 
                onClick={() => router.push('/chat')}
                className="px-8 py-3 rounded-lg border-2 border-teal-600 text-teal-600 font-medium hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/30 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                {t('talkToAI')}
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-800 text-xs font-bold">DR</div>
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-xs font-bold">SP</div>
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 text-xs font-bold">JK</div>
              </div>
              <p className="ml-4 text-sm text-gray-600 dark:text-gray-400">Trusted by <span className="font-bold">50+ mental health professionals</span></p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-200 dark:bg-teal-800/50 rounded-full filter blur-xl opacity-80"></div>
              <div className="absolute -bottom-10 -right-6 w-32 h-32 bg-blue-200 dark:bg-blue-800/50 rounded-full filter blur-xl opacity-80"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Dr. Sarah Johnson</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Clinical Psychologist</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300">
                    Available
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-800 dark:text-gray-200">"I specialize in anxiety, depression, and stress management for students. Book a session to discuss your concerns in a safe space."</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book Session
                    </button>
                    <button className="flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section - Medical Themed */}
      <div className="bg-white dark:bg-gray-800 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 dark:bg-teal-900/20 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 mb-4">
              Professional Care Features
            </span>
            <AnimatedText 
              text={t('featuresTitle')} 
              className="text-3xl font-bold text-gray-900 dark:text-white" 
            />
            <div className="w-24 h-1 bg-teal-500 rounded-full mt-6"></div>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 - AI Chat */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1 transform">
              <div className="w-14 h-14 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feature1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('feature1Desc')}</p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => router.push('/chat')} className="inline-flex items-center text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                  Try AI Chat
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Feature 2 - Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1 transform">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feature2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('feature2Desc')}</p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => router.push('/resources')} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  Browse Resources
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Feature 3 - Booking */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1 transform">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feature3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('feature3Desc')}</p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => router.push('/booking')} className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  Book Appointment
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Feature 4 - Community */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1 transform">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-800/30 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('feature4Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('feature4Desc')}</p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => router.push('/forum')} className="inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">
                  Join Forum
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
            <div className="w-24 h-1 bg-teal-500 rounded-full mt-6 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <div className="mb-4 text-teal-500 dark:text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"The AI chat helped me understand my anxiety better than months of searching online. The resources provided were exactly what I needed."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-800/30 rounded-full flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-lg">S</div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Sarah K.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">University Student</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <div className="mb-4 text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"Booking an appointment was seamless, and the professional I spoke with truly understood what I was going through. Highly recommend!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-lg">M</div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Michael T.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Graduate Student</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <div className="mb-4 text-purple-500 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"The forum community has been incredibly supportive. It's comforting to know I'm not alone in my struggles with mental health."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-lg">J</div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Jamie L.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">First-Year Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-b-gray-900 dark:bg-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SukoonU</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Professional mental health support for students, accessible anytime, anywhere.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">About Us</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">Our Professionals</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Resources</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Crisis Hotline: 988</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">support@SukoonU.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              &copy; {new Date().getFullYear()} SukoonU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}