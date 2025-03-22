'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  LogOut
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-60 min-h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </span>
        </div>
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 my-1 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-3 mt-auto border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/login"
            className={cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
} 