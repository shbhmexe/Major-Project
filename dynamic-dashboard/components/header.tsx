'use client';

import { getUserFromToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useTheme } from '@/lib/theme-provider';
import { Moon, Sun, User } from 'lucide-react';
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const user = getUserFromToken();
  const { theme, toggleTheme } = useTheme();
  
  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="text-xl font-semibold text-gray-900 dark:text-white md:hidden">
          Dashboard
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 overflow-hidden border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1">
              {user ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => router.push('/login')}>
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 