'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe, LogIn, LogOut, User, Check, List } from 'lucide-react';
import { t } from '@/utils/translations';
import { useAuth } from '@/contexts/AuthContext';
import GooeyNav from './GooeyNav';

export default function Navbar({ language, setLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  // Handle GooeyNav link clicks for smooth scrolling
  const handleGooeyNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  // Update active nav index based on current pathname
  useEffect(() => {
    if (isAuthenticated) {
      if (pathname === '/dashboard') {
        setActiveNavIndex(1);
      } else if (pathname === '/internship-list') {
        setActiveNavIndex(2);
      } else if (pathname === '/profile') {
        setActiveNavIndex(3);
      } else {
        setActiveNavIndex(0); // Home
      }
    } else {
      if (pathname === '/') {
        setActiveNavIndex(0);
      }
    }
  }, [pathname, isAuthenticated]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/90 via-slate-900/90 to-purple-900/90 backdrop-blur-md border-b border-purple-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-xl font-bold text-white">
              Interndisha
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="ml-10 flex items-baseline space-x-4">
                <div onClick={(e) => {
                  const target = e.target.closest('a');
                  if (target && target.href) {
                    const href = target.getAttribute('href');
                    handleGooeyNavClick(e, href);
                  }
                }}>
                  <GooeyNav
                    items={[
                      { label: t('home', language), href: '/' },
                      { label: 'Dashboard', href: '/dashboard' },
                      { label: 'Internships', href: '/internship-list' },
                      { label: 'Profile', href: '/profile' }
                    ]}
                    particleCount={10}
                    colors={[1, 2, 3, 4]}
                    initialActiveIndex={activeNavIndex}
                  />
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-2 text-purple-200 px-3 py-2 bg-purple-800/30 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user?.displayName || user?.email?.split('@')[0] || user?.phoneNumber || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-purple-200 hover:text-white bg-red-600/20 hover:bg-red-600/40 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-red-500/30"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="ml-10 flex items-baseline space-x-4">
                <div onClick={(e) => {
                  const target = e.target.closest('a');
                  if (target && target.href) {
                    const href = target.getAttribute('href');
                    handleGooeyNavClick(e, href);
                  }
                }}>
                  <GooeyNav
                    items={[
                      { label: t('home', language), href: '/' },
                      { label: t('features', language), href: '#features' },
                      { label: t('howItWorks', language), href: '#how-it-works' }
                    ]}
                    particleCount={10}
                    colors={[1, 2, 3, 4]}
                  />
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <a 
                    href="https://pminternship.mca.gov.in/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-300 hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-green-500/30 bg-green-600/20 hover:bg-green-600/40"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    PM Portal
                  </a>
                  <Link href="/login" className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link href="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{t('language', language)}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <button
                  onClick={() => setLanguage('en')}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'en' ? 'bg-gray-100' : ''}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'hi' ? 'bg-gray-100' : ''}`}
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  onClick={() => setLanguage('gu')}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'gu' ? 'bg-gray-100' : ''}`}
                >
                  ગુજરાતી (Gujarati)
                </button>
                <button
                  onClick={() => setLanguage('mr')}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'mr' ? 'bg-gray-100' : ''}`}
                >
                  मराठी (Marathi)
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'ta' ? 'bg-gray-100' : ''}`}
                >
                  தமிழ் (Tamil)
                </button>
                <button
                  onClick={() => setLanguage('ur')}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${language === 'ur' ? 'bg-gray-100' : ''}`}
                >
                  اردو (Urdu)
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-purple-900/95 via-slate-900/95 to-purple-900/95 backdrop-blur-md border-t border-purple-500/20">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home', language)}
            </Link>
            
            {/* Language Selector for Mobile */}
            <div className="border-t border-white/10 pt-2 pb-1">
              <div className="px-3 py-2 text-gray-400 text-sm">
                {t('language', language)}:
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-sm ${language === 'en' ? 'text-white bg-gray-700' : 'text-gray-300'} rounded-md`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-4 h-4 ml-auto" />}
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-sm ${language === 'hi' ? 'text-white bg-gray-700' : 'text-gray-300'} rounded-md`}
                >
                  <span>हिन्दी (Hindi)</span>
                  {language === 'hi' && <Check className="w-4 h-4 ml-auto" />}
                </button>
                <button
                  onClick={() => setLanguage('gu')}
                  className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-sm ${language === 'gu' ? 'text-white bg-gray-700' : 'text-gray-300'} rounded-md`}
                >
                  <span>ગુજરાતી (Gujarati)</span>
                  {language === 'gu' && <Check className="w-4 h-4 ml-auto" />}
                </button>
                <button
                  onClick={() => setLanguage('mr')}
                  className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-sm ${language === 'mr' ? 'text-white bg-gray-700' : 'text-gray-300'} rounded-md`}
                >
                  <span>मराठी (Marathi)</span>
                  {language === 'mr' && <Check className="w-4 h-4 ml-auto" />}
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-sm ${language === 'ta' ? 'text-white bg-gray-700' : 'text-gray-300'} rounded-md`}
                >
                  <span>தமிழ் (Tamil)</span>
                  {language === 'ta' && <Check className="w-4 h-4 ml-auto" />}
                </button>
              </div>
            </div>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link href="/internship-list" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Internships
                </Link>
                <Link href="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 border-t border-purple-500/20 bg-purple-800/20 rounded-lg">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-200 text-sm font-medium">
                    {user?.displayName || user?.email?.split('@')[0] || user?.phoneNumber || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                >
                  {t('features', language)}
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                >
                  {t('howItWorks', language)}
                </button>
                <Link href="/login" className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-all duration-200 mx-3 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
