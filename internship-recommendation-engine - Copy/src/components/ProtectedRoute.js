'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, redirectTo = '/register', requiredAuth = true }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requiredAuth && !isAuthenticated) {
        // User is not authenticated, redirect to register/login
        router.push(redirectTo);
      } else if (!requiredAuth && isAuthenticated) {
        // User is already authenticated but trying to access auth pages
        router.push('/dashboard');
      }
    }
  }, [user, loading, isAuthenticated, router, redirectTo, requiredAuth]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" />
          <p className="text-purple-200">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is required to be authenticated but isn't, show nothing (redirect is happening)
  if (requiredAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" />
          <p className="text-purple-200">Redirecting to authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not required to be authenticated but is (auth pages), show nothing (redirect is happening)
  if (!requiredAuth && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" />
          <p className="text-purple-200">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Authentication check passed, render children
  return children;
}