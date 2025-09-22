'use client';

import { Brain, Users, Languages, Zap } from 'lucide-react';
import { t } from '@/utils/translations';


export default function Features({ language }) {
  const features = [
    {
      icon: Brain,
      title: t('smartMatching', language),
      description: t('smartMatchingDesc', language),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: t('ruralFriendly', language),
      description: t('ruralFriendlyDesc', language),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Languages,
      title: t('multilingual', language),
      description: t('multilingualDesc', language),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: t('quickResults', language),
      description: t('quickResultsDesc', language),
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 tablet:py-24 bg-black/20 backdrop-blur-sm bg-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 tablet:px-8 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 tablet:mb-20">
          <h2 className="text-3xl sm:text-4xl tablet:text-5xl font-bold text-white mb-4 tablet:mb-6">
            {t('featuresTitle', language)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 tablet:gap-10">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 tablet:p-10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className={`w-16 h-16 tablet:w-20 tablet:h-20 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 tablet:mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 tablet:w-10 tablet:h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl tablet:text-2xl font-semibold text-white mb-4 tablet:mb-5">
                  {feature.title}
                </h3>
                <p className="text-gray-300 tablet:text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 tablet:mt-20">
          <p className="text-gray-300 text-lg tablet:text-xl mb-6 tablet:mb-8">
            Ready to find your perfect internship match?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('recommendation-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-8 tablet:px-10 py-4 tablet:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('getStarted', language)}
          </button>
        </div>
      </div>
    </section>
  );
}
