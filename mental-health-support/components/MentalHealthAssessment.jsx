'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language';
import { EmergencySOS } from './EmergencySOS';
import { 
  assessmentData, 
  calculateScore, 
  classifyScore, 
  shouldShowEmergencyContact 
} from '@/lib/assessments';

export function MentalHealthAssessment({ 
  assessmentType = 'phq9', 
  onComplete,
  onSkip 
}) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assessment = assessmentData[assessmentType];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const goToNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate score and classification
    const score = calculateScore(answers, assessmentType);
    const classification = classifyScore(score, assessmentType);
    
    // Simulate API call to save results
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowResults(true);
    setIsSubmitting(false);
    
    // Pass results to parent component
    if (onComplete) {
      onComplete({
        assessmentType,
        score,
        classification,
        answers,
        completedAt: new Date().toISOString()
      });
    }
  };

  const renderQuestion = () => {
    const question = assessment.questions[currentQuestion];
    const selectedValue = answers[question.id];

    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {assessment.questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {question.text}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedValue === option.value
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleAnswer(question.id, option.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <span className="ml-3 text-gray-900 dark:text-gray-100">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={goToNext}
            disabled={selectedValue === undefined}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {currentQuestion === assessment.questions.length - 1 ? (
              isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                'Complete Assessment'
              )
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const score = calculateScore(answers, assessmentType);
    const classification = classifyScore(score, assessmentType);
    const showEmergency = shouldShowEmergencyContact(score, assessmentType);

    const getScoreColor = (color) => {
      const colors = {
        green: 'text-green-600 bg-green-50 border-green-200',
        yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        orange: 'text-orange-600 bg-orange-50 border-orange-200',
        red: 'text-red-600 bg-red-50 border-red-200'
      };
      return colors[color] || colors.green;
    };

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Assessment Complete
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {assessment.title} Results
          </p>
        </div>

        {/* Score Display */}
        <div className={`rounded-lg border-2 p-6 ${getScoreColor(classification.color)}`}>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{score}</div>
            <div className="text-xl font-semibold mb-1">{classification.severity}</div>
            <div className="text-sm opacity-80">{classification.description}</div>
          </div>
        </div>

        {/* Emergency Contact - Only for moderate/severe */}
        {showEmergency && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                    Need Immediate Support?
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Your assessment results suggest seeking professional help
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <EmergencySOS className="scale-110" />
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h3>
          <ul className="space-y-3">
            {classification.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  {recommendation}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/resources'}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Resources
          </button>
          <button
            onClick={() => window.location.href = '/booking'}
            className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Session
          </button>
        </div>

        {/* Continue Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => window.location.href = '/'}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Continue to Platform →
          </button>
        </div>
      </div>
    );
  };

  if (showResults) {
    return renderResults();
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Assessment Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {assessment.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {assessment.description}
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            {assessment.instructions}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
            Timeframe: {assessment.timeframe}
          </p>
        </div>
      </div>

      {/* Question Interface */}
      {renderQuestion()}

      {/* Skip Option */}
      {onSkip && (
        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
          >
            Skip this assessment for now
          </button>
        </div>
      )}
    </div>
  );
}