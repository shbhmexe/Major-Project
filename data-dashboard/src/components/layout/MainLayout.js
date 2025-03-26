'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAppContext } from '@/src/context/AppContext';
import { Menu } from 'lucide-react';

export default function MainLayout({ children }) {
  const { isAuthenticated } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      
      <div className="flex relative">
        {isAuthenticated && (
          <>
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden fixed z-40 bottom-4 right-4 rounded-full bg-blue-600 dark:bg-blue-700 p-3 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Overlay for mobile */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-70 z-20 md:hidden"
                onClick={closeSidebar}
              />
            )}
            
            {/* Sidebar - hidden on mobile until toggled */}
            <div className={`
              fixed md:static inset-y-0 left-0 transform z-30
              md:translate-x-0 transition duration-200 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              w-64 max-w-[80%] md:max-w-none
            `}>
              <Sidebar closeSidebar={closeSidebar} />
            </div>
          </>
        )}
        
        <main className={`flex-1 pt-16 min-h-screen w-full transition-all duration-200 bg-gray-50 dark:bg-gray-950 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 