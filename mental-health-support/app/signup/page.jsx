'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useNextAuth } from '@/lib/nextauth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ToastProvider';

export default function SignupPage() {
  const router = useRouter();
  const { signup, loading: authLoading, error: authError } = useAuth();
  const { login: googleLogin, loading: googleLoading, error: googleError } = useNextAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const loading = authLoading || googleLoading;
  const error = authError || googleError;
  
  // Get text content from text.md
  const title = useText('authentication.signup.signup_title', 'Create Your Account');
  const subtitle = useText('authentication.signup.signup_subtitle', 'Join our community for mental health support');
  const nameLabel = useText('authentication.signup.name_label', 'Full Name');
  const emailLabel = useText('authentication.signup.email_label', 'Email Address');
  const passwordLabel = useText('authentication.signup.password_label', 'Password');
  const confirmPasswordLabel = useText('authentication.signup.confirm_password_label', 'Confirm Password');
  const signupButton = useText('authentication.signup.signup_button', 'Create Account');
  const loginPrompt = useText('authentication.signup.signup_login_prompt', 'Already have an account?');
  const loginLink = useText('authentication.signup.signup_login_link', 'Sign In');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      showToast.error('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    
    try {
      await signup(name, email, password);
      showToast.success(`🎉 Welcome ${name}! Your account has been created successfully!`, {
        autoClose: 6000,
      });
      showToast.info('📧 Check your email for a welcome message with platform features!', {
        autoClose: 8000,
        delay: 1000
      });
      
      // Delay navigation to show toasts
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error('Signup failed:', err);
      showToast.error(err.message || 'Failed to create account. Please try again.');
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      
      // Check if the result indicates success
      if (result && result.ok !== false) {
        showToast.success('🎉 Welcome! You have successfully signed up with Google!', {
          autoClose: 5000,
        });
        showToast.info('📧 Welcome email sent! Check your inbox for platform features.', {
          autoClose: 7000,
          delay: 1000
        });
        
        // Delay navigation to show toasts
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else if (result && result.error) {
        // Only show error if there's an actual error
        showToast.error('Google signup failed. Please try again.');
      }
      // If result is undefined or null, it means OAuth redirect is happening
      // Don't show any error in this case
    } catch (err) {
      // Only show error for genuine failures
      if (err.message && !err.message.includes('redirect') && !err.message.includes('popup')) {
        console.error('Google signup error:', err);
        showToast.error('Google signup failed. Please try again.');
      }
      // Ignore redirect and popup related "errors"
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <AnimatedText 
            text={title} 
            className="text-3xl font-bold text-gray-900 dark:text-white" 
          />
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={cn(
              "w-full py-2 px-4 rounded-lg font-medium border transition-colors flex items-center justify-center gap-2",
              loading
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Sign up with Google
          </button>
          
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>
          
          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {nameLabel}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {emailLabel}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {passwordLabel}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {confirmPasswordLabel}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white",
                  passwordError
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600 dark:focus:ring-blue-400"
                )}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-2 px-4 rounded-lg text-white font-medium transition-colors",
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              )}
            >
              {loading ? 'Creating account...' : signupButton}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {loginPrompt}{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              {loginLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}