'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Orb from '@/components/Orb';
import PMInternshipScheme from '@/components/PMInternshipScheme';
import CompanyLogoStrip from '@/components/CompanyLogoStrip';

export default function Home() {
  const [language, setLanguage] = useState('en');
  
  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // You could also save the language preference to localStorage here
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Effect to load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'hi', 'gu', 'mr', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Background Orbs */}
      <div className="fixed inset-0 z-0">
        {/* Main Orb */}
        <div className="absolute inset-0 opacity-40 orb-animate">
          <Orb
            hue={270}
            hoverIntensity={0.4}
            rotateOnHover={true}
            forceHoverState={false}
          />
        </div>
        
        {/* Secondary Orb - Different hue and position
        <div className="absolute inset-0 opacity-20 transform translate-x-1/3 translate-y-1/4 scale-75 orb-pulse" style={{animationDelay: '2s'}}>
          <Orb
            hue={220}
            hoverIntensity={0.2}
            rotateOnHover={true}
            forceHoverState={true}
          />
        </div> */}
        
        {/* Tertiary Orb - Accent
        <div className="absolute inset-0 opacity-15 transform -translate-x-1/4 translate-y-1/2 scale-50 orb-animate" style={{animationDelay: '5s', animationDuration: '25s'}}>
          <Orb
            hue={300}
            hoverIntensity={0.1}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </div> */}
        
        {/* Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-900/10 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar language={language} setLanguage={handleLanguageChange} />
        <Hero language={language} />
        <CompanyLogoStrip />
        <Features language={language} />
        <PMInternshipScheme />
        <HowItWorks language={language} />
        <TestimonialCarousel language={language} />
        <FAQ language={language} />
        <ContactForm language={language} />
        <Footer language={language} />
      </div>
    </div>
  );
}
