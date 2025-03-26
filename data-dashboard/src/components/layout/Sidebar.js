'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Table, Settings, Users } from 'lucide-react';

export default function Sidebar({ closeSidebar }) {
  const pathname = usePathname();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/',
    },
    {
      title: 'Details',
      icon: Table,
      href: '/details',
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
    },
    {
      title: 'Users',
      icon: Users,
      href: '/users',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  // Function to handle link clicks
  const handleLinkClick = () => {
    // Only close sidebar on small screens
    if (window.innerWidth < 768 && closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-20 overflow-y-auto dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                onClick={handleLinkClick}
              >
                {item.icon && (
                  <item.icon
                    className={`h-5 w-5 mr-3 ${
                      isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                )}
                {item.title}
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
} 