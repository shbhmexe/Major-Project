'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ScrambledText from './ScrambledText';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  // Listen for scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Neon glow styles
  const neonGlowStyle = {
    boxShadow: isScrolled 
      ? "0 4px 15px rgba(66, 133, 244, 0.3)" 
      : "none",
    backgroundImage: isScrolled
      ? "linear-gradient(180deg, rgba(30, 30, 60, 0.95) 0%, rgba(30, 30, 60, 0.9) 100%)"
      : "none",
    borderBottom: isScrolled 
      ? "1px solid rgba(80, 100, 240, 0.3)" 
      : "none",
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md' : 'bg-transparent'
      }`}
      style={neonGlowStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: isScrolled ? "0 0 15px rgba(66, 133, 244, 0.7)" : "none"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <span 
                className={`font-bold text-lg sm:text-xl ${
                  isScrolled ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}
                style={{
                  textShadow: isScrolled ? "0 0 5px rgba(66, 133, 244, 0.7)" : "none"
                }}
              >
                <ScrambledText 
                  chars="!@#$%^&*()_+="
                  duration={0.8}
                  speed={0.05}
                  radius={15}
                >
                  ScamAlert
                </ScrambledText>
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink href="/" isScrolled={isScrolled}>
              <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                Home
              </ScrambledText>
            </NavLink>
            <NavLink href="/scan" isScrolled={isScrolled}>
              <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                Scan
              </ScrambledText>
            </NavLink>
            <NavLink href="/how-it-works" isScrolled={isScrolled}>
              <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                How It Works
              </ScrambledText>
            </NavLink>
            
            {/* Resources Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center ${
                  isScrolled 
                    ? 'text-white hover:text-blue-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                } transition-colors`}
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                  Resources
                </ScrambledText>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div 
                    className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                    style={{
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 133, 244, 0.3)"
                    }}
                  >
                    <div className="py-1">
                      <ResourceLink href="/blog">Blog</ResourceLink>
                      <ResourceLink href="/guides">Guides</ResourceLink>
                      <ResourceLink href="/reports">Reports</ResourceLink>
                      <ResourceLink href="/tools">Tools</ResourceLink>
                      <ResourceLink href="/resources">All Resources</ResourceLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <NavLink href="/about" isScrolled={isScrolled}>
              <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                About
              </ScrambledText>
            </NavLink>
            <NavLink href="/faq" isScrolled={isScrolled}>
              <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                FAQ
              </ScrambledText>
            </NavLink>
            <NavLink href="/contact" isScrolled={isScrolled}>
              <ScrambledText chars="!@#$%^&*()_+=" duration={0.6} speed={0.04} radius={12}>
                Contact
              </ScrambledText>
            </NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            {isAuthenticated ? (
              <UserMenu user={user} logout={logout} isScrolled={isScrolled} />
            ) : (
              <>
                <Link href="/auth">
                  <motion.button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isScrolled
                        ? 'text-white hover:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/auth">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)'
                    }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                isScrolled ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              } focus:outline-none`}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 133, 244, 0.3)"
            }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-1">
                <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                <MobileNavLink href="/scan" onClick={() => setIsMenuOpen(false)}>Scan</MobileNavLink>
                <MobileNavLink href="/how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</MobileNavLink>
                
                {/* Mobile Resources Submenu */}
                <div className="block px-2 py-2 border-b border-gray-200 dark:border-gray-700">
                  <button
                    className="flex items-center justify-between w-full text-gray-600 dark:text-gray-300"
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  >
                    <span>Resources</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-1 space-y-1"
                      >
                        <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
                        <MobileNavLink href="/guides" onClick={() => setIsMenuOpen(false)}>Guides</MobileNavLink>
                        <MobileNavLink href="/reports" onClick={() => setIsMenuOpen(false)}>Reports</MobileNavLink>
                        <MobileNavLink href="/tools" onClick={() => setIsMenuOpen(false)}>Tools</MobileNavLink>
                        <MobileNavLink href="/resources" onClick={() => setIsMenuOpen(false)}>All Resources</MobileNavLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
                <MobileNavLink href="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>
                <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
                
                {/* Mobile Auth Buttons */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  {isAuthenticated ? (
                    <>
                      <MobileNavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</MobileNavLink>
                      <MobileNavLink href="/profile" onClick={() => setIsMenuOpen(false)}>Profile</MobileNavLink>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-2 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <MobileNavLink href="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</MobileNavLink>
                      <div className="px-2 py-2">
                        <Link href="/auth">
                          <motion.button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-lg transition-all"
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Started
                          </motion.button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Desktop navigation link
function NavLink({ href, children, isScrolled }) {
  return (
    <Link href={href} className="inline-block">
      <motion.span 
        className={`${
          isScrolled 
            ? 'text-white hover:text-blue-300' 
            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        } transition-colors`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          textShadow: isScrolled ? "0 0 5px rgba(66, 133, 244, 0.5)" : "none"
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

// Resource dropdown link
function ResourceLink({ href, children }) {
  return (
    <Link href={href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
      <motion.span 
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

// Mobile navigation link
function MobileNavLink({ href, onClick, children }) {
  return (
    <Link href={href} onClick={onClick} className="block px-2 py-2 border-b border-gray-200 dark:border-gray-700">
      <motion.span 
        className="block text-gray-600 dark:text-gray-300"
        whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

// User menu dropdown for authenticated users
function UserMenu({ user, logout, isScrolled }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          isScrolled
            ? 'text-white hover:bg-white/10'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </span>
        </div>
        <span className="hidden lg:block font-medium">
          {user?.firstName || 'User'}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 133, 244, 0.3)"
            }}
          >
            <div className="py-1">
              <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <motion.span className="flex items-center" whileHover={{ x: 2 }}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  Dashboard
                </motion.span>
              </Link>
              
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <motion.span className="flex items-center" whileHover={{ x: 2 }}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </motion.span>
              </Link>
              
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <motion.span className="flex items-center" whileHover={{ x: 2 }}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </motion.span>
              </Link>
              
              <div className="border-t border-gray-100 dark:border-gray-600">
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <motion.span className="flex items-center" whileHover={{ x: 2 }}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </motion.span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
