'use client';

import { Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { t } from '@/utils/translations';

export default function Footer({ language }) {
  const quickLinks = [
    { label: 'Official PM Portal', href: 'https://pminternship.mca.gov.in/login/', external: true },
    { label: t('aboutScheme', language), href: '#' },
    { label: t('guidelines', language), href: '#' },
    { label: t('support', language), href: '#' },
    { label: t('privacy', language), href: '#' },
    { label: t('terms', language), href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 tablet:px-8 lg:px-8 py-12 tablet:py-16">
        <div className="grid grid-cols-1 tablet:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 tablet:gap-12">
          {/* Brand Section */}
          <div className="tablet:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 tablet:mb-8">
              <div className="w-12 h-12 tablet:w-16 tablet:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 tablet:w-8 tablet:h-8 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="text-xl tablet:text-2xl font-bold text-white">Interndisha</div>
                <div className="text-sm tablet:text-base text-gray-400">Recommendation Engine</div>
              </div>
            </div>
            
            <p className="text-gray-300 tablet:text-lg mb-6 tablet:mb-8 max-w-md leading-relaxed">
              Empowering rural and emerging talent through AI-powered internship recommendations. 
              Find your perfect career opportunity with the PM Internship Scheme.
            </p>

            <div className="flex items-center space-x-2 text-sm tablet:text-base text-gray-400 mb-6 tablet:mb-8">
              <div className="w-2 h-2 tablet:w-3 tablet:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Serving 29 states & 8 union territories</span>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 tablet:w-12 tablet:h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 text-gray-300 hover:text-white"
                  >
                    <IconComponent className="w-5 h-5 tablet:w-6 tablet:h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg tablet:text-xl font-semibold text-white mb-6 tablet:mb-8">
              {t('quickLinks', language)}
            </h3>
            <ul className="space-y-4 tablet:space-y-5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`text-gray-300 tablet:text-lg hover:text-white transition-colors duration-200 flex items-center group ${
                      link.external ? 'text-green-300 hover:text-green-200' : ''
                    }`}
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg tablet:text-xl font-semibold text-white mb-6 tablet:mb-8">
              {t('contact', language)}
            </h3>
            <div className="space-y-4 tablet:space-y-5 text-gray-300 tablet:text-lg">
              <div>
                <div className="font-medium text-white mb-1">Email</div>
                <a 
                  href="mailto:support@pminternship.gov.in" 
                  className="hover:text-white transition-colors duration-200"
                >
                  support@pminternship.gov.in
                </a>
              </div>
              
              <div>
                <div className="font-medium text-white mb-1">Helpline</div>
                <a 
                  href="tel:1800-123-4567" 
                  className="hover:text-white transition-colors duration-200"
                >
                  1800-123-4567
                </a>
              </div>
              
              <div>
                <div className="font-medium text-white mb-1">Hours</div>
                <div className="text-sm">
                  Monday - Friday: 9 AM - 6 PM IST<br />
                  Saturday: 10 AM - 4 PM IST
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 tablet:mt-16 pt-8 tablet:pt-10">
          <div className="flex flex-col tablet:flex-row md:flex-row justify-between items-center space-y-4 tablet:space-y-0 md:space-y-0">
            <div className="text-gray-400 text-sm tablet:text-base">
              © 2024 PM Internship Scheme. {t('allRightsReserved', language)}
            </div>
            
            <div className="flex items-center space-x-6 text-sm tablet:text-base">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('privacy', language)}
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('terms', language)}
              </a>
              <div className="text-gray-400">
                Made with ❤️ for Bharat
              </div>
            </div>
          </div>
        </div>

        {/* Government Attribution */}
        <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-2">
              🇮🇳 An initiative by the Government of India
            </p>
            <p>
              Ministry of Skill Development and Entrepreneurship | Digital India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
