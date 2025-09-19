'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { MentalHealthAssessment } from '@/components/MentalHealthAssessment';
import { getNextAssessment, getIncompleteAssessments } from '@/lib/assessments';

export default function AssessmentPage() {
  const router = useRouter();
  const { user, isAuthenticated, isGuest } = useAuth();
  const { t } = useLanguage();
  
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [userAssessments, setUserAssessments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !isGuest) {
      router.push('/login');
      return;
    }

    // Load user assessment data (would normally come from API)
    loadUserAssessments();
  }, [isAuthenticated, isGuest]);

  const loadUserAssessments = async () => {
    setIsLoading(true);
    
    // Simulate API call to load user's assessment history
    // In real implementation, this would fetch from your database
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const savedAssessments = JSON.parse(localStorage.getItem('user_assessments') || '{}');
    setUserAssessments(savedAssessments);
    
    const nextAssessment = getNextAssessment(savedAssessments);
    setCurrentAssessment(nextAssessment);
    setIsLoading(false);
  };

  const handleAssessmentComplete = (results) => {
    // Save assessment results
    const updatedAssessments = {
      ...userAssessments,
      [results.assessmentType]: {
        ...results,
        completed: true
      }
    };
    
    setUserAssessments(updatedAssessments);
    localStorage.setItem('user_assessments', JSON.stringify(updatedAssessments));
    
    // Check if there are more assessments to complete
    const nextAssessment = getNextAssessment(updatedAssessments);
    
    if (nextAssessment) {
      // Move to next assessment after a brief delay
      setTimeout(() => {
        setCurrentAssessment(nextAssessment);
        setShowWelcome(false);
      }, 2000);
    } else {
      // All assessments complete, allow immediate navigation
      // Don't auto-redirect, let user choose when to continue
      setCurrentAssessment(null);
    }
  };

  const handleSkipAssessment = () => {
    const incompleteAssessments = getIncompleteAssessments(userAssessments);
    const currentIndex = incompleteAssessments.indexOf(currentAssessment);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < incompleteAssessments.length) {
      setCurrentAssessment(incompleteAssessments[nextIndex]);
    } else {
      // No more assessments, allow access to platform
      router.push('/');
    }
  };

  const renderWelcomeScreen = () => {
    const incompleteCount = getIncompleteAssessments(userAssessments).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            {/* Welcome Header */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to {t('appName')}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {user?.name || 'Welcome'}
              </p>
            </div>

            {/* Assessment Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Initial Mental Health Assessment
              </h2>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Before we get started, we'd like to understand your current mental health status. 
                This helps us provide you with personalized support and resources.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <span className="text-blue-700 dark:text-blue-300">
                    Clinically validated screening tools
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <span className="text-blue-700 dark:text-blue-300">
                    Takes approximately 5-10 minutes
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <span className="text-blue-700 dark:text-blue-300">
                    Completely confidential
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <span className="text-blue-700 dark:text-blue-300">
                    Personalized recommendations
                  </span>
                </div>
              </div>
            </div>

            {/* Assessment Count */}
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We have <span className="font-semibold text-teal-600">{incompleteCount} assessment{incompleteCount !== 1 ? 's' : ''}</span> for you to complete:
              </p>
              <div className="space-y-2">
                {getIncompleteAssessments(userAssessments).map((assessment, index) => (
                  <div key={assessment} className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {assessment === 'phq9' ? 'PHQ-9 Depression Screening' : 'GAD-7 Anxiety Screening'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Start Assessment
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Skip for now (You can complete this later)
              </button>
            </div>

            {/* Privacy Note */}
            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              <p>🔒 Your responses are confidential and used only to provide you with personalized support.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAssessment = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <MentalHealthAssessment
          assessmentType={currentAssessment}
          onComplete={handleAssessmentComplete}
          onSkip={handleSkipAssessment}
        />
      </div>
    );
  };

  const renderCompletionScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              All Assessments Complete!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for completing your mental health assessments. You can now access the full platform.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Continue to Platform →
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // If user has completed all assessments
  if (!currentAssessment) {
    return renderCompletionScreen();
  }

  // Show welcome screen first
  if (showWelcome) {
    return renderWelcomeScreen();
  }

  // Show current assessment
  return renderAssessment();
}