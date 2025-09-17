'use client';

import { User, Brain, Target, Send } from 'lucide-react';
import { t } from '@/utils/translations';

export default function HowItWorks({ language }) {
  const steps = [
    {
      icon: User,
      title: t('step1', language),
      description: t('step1Desc', language),
      color: 'from-blue-500 to-blue-600',
      step: '01'
    },
    {
      icon: Brain,
      title: t('step2', language),
      description: t('step2Desc', language),
      color: 'from-purple-500 to-purple-600',
      step: '02'
    },
    {
      icon: Target,
      title: t('step3', language),
      description: t('step3Desc', language),
      color: 'from-green-500 to-green-600',
      step: '03'
    },
    {
      icon: Send,
      title: t('step4', language),
      description: t('step4Desc', language),
      color: 'from-orange-500 to-red-500',
      step: '04'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('howItWorksTitle', language)}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get personalized internship recommendations in just 4 simple steps
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    {/* Step Card */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-2">
                      {/* Step Number */}
                      <div className="text-6xl font-bold text-white/20 mb-4">
                        {step.step}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow (except for last step) */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-l-4 border-l-blue-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start space-x-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div className="text-2xl font-bold text-white/30 mb-2">
                          {step.step}
                        </div>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              const element = document.getElementById('recommendation-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
