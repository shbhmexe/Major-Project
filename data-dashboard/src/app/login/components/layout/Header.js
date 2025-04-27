'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/src/context/AppContext';
import { useTheme } from '@/src/context/ThemeContext';
import { Home, User, LogOut, Trash2, ChevronDown, Sun, Moon } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, logout, deleteAccount } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Dashboard App</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* User Menu (only shown when authenticated) */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                onClick={toggleDropdown}
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">{user?.name || user?.email}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                        deleteAccount();
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 