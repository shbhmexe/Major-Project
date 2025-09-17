'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { t } from '@/utils/translations';

export default function TestimonialCarousel({ language }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: t('testimonial1', language),
      name: t('testimonial1Name', language),
      role: t('testimonial1Role', language),
      image: '👩‍💻'
    },
    {
      text: t('testimonial2', language),
      name: t('testimonial2Name', language),
      role: t('testimonial2Role', language),
      image: '👨‍💼'
    },
    {
      text: t('testimonial3', language),
      name: t('testimonial3Name', language),
      role: t('testimonial3Role', language),
      image: '👩‍⚕️'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('testimonialsTitle', language)}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from candidates who found their dream internships through our AI recommendation engine
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"></div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-12 text-center">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            
            {/* Testimonial Text */}
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 italic">
              &quot;{testimonials[currentIndex].text}&quot;
            </p>
            
            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                {testimonials[currentIndex].image}
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-white">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-purple-200">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-200 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-200 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-purple-500 scale-110'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">15 Days</div>
            <div className="text-gray-300">Average Time to Placement</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">5,000+</div>
            <div className="text-gray-300">Rural Candidates Placed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
