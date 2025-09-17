'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Orb from '@/components/Orb';
import { Mail, Phone, User, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
  const [authType, setAuthType] = useState('email'); // 'email' or 'phone'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    isAuthenticated, 
    loading, 
    sendEmailOTP, 
    sendPhoneOTP, 
    verifyEmailOTP, 
    verifyPhoneOTP,
    updateProfile,
    setTempDisplayName,
    clearTempDisplayName
  } = useAuth();
  
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!name.trim()) {
        throw new Error('Please enter your name');
      }
      
      // Save the display name temporarily
      setTempDisplayName(name.trim());
      
      let result;
      
      if (authType === 'email') {
        if (!email || !email.includes('@')) {
          throw new Error('Please enter a valid email address');
        }
        result = await sendEmailOTP(email);
      } else {
        if (!phoneNumber || phoneNumber.length < 10) {
          throw new Error('Please enter a valid phone number');
        }
        // Format phone number to E.164 format for Firebase
        const formattedPhoneNumber = phoneNumber.startsWith('+') 
          ? phoneNumber 
          : `+91${phoneNumber}`; // Assuming India country code
        
        result = await sendPhoneOTP(formattedPhoneNumber);
      }
      
      if (result.success) {
        setOtpSent(true);
      } else {
        throw new Error(result.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }
      
      let result;
      
      if (authType === 'email') {
        result = await verifyEmailOTP(otp);
      } else {
        const formattedPhoneNumber = phoneNumber.startsWith('+') 
          ? phoneNumber 
          : `+91${phoneNumber}`;
        result = await verifyPhoneOTP(formattedPhoneNumber, otp);
      }
      
      if (result.success) {
        // Clear the temporary display name as it's now stored in user object
        clearTempDisplayName();
        // Force a complete navigation to internship list page
        window.location.href = '/internship-list';
        return;
      } else {
        throw new Error(result.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30">
          <Orb
            hue={270}
            hoverIntensity={0.4}
            rotateOnHover={true}
            forceHoverState={false}
          />
        </div>
        <div className="absolute inset-0 opacity-20 transform translate-x-1/2 -translate-y-1/4 scale-75">
          <Orb
            hue={220}
            hoverIntensity={0.3}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </div>
      </div>
      
      {/* Auth Container */}
      <div className="z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-purple-200">Sign up to discover internship opportunities</p>
          </div>
          
          {/* Auth Type Selector */}
          {!otpSent && (
            <>
              <div className="flex border-b border-white/10 mb-2">
                <button
                  className={`flex-1 py-3 text-center font-medium ${authType === 'email' ? 'text-white border-b-2 border-purple-500' : 'text-purple-300'}`}
                  onClick={() => setAuthType('email')}
                >
                  <Mail className="inline-block mr-2 h-5 w-5" />
                  Email
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium ${authType === 'phone' ? 'text-white border-b-2 border-purple-500' : 'text-purple-300'}`}
                  onClick={() => setAuthType('phone')}
                >
                  <Phone className="inline-block mr-2 h-5 w-5" />
                  Phone
                </button>
              </div>
              <div className="text-center text-purple-300 text-sm mb-4">
                <span className="bg-purple-500/20 px-3 py-1 rounded-full">Use email for sign up and login</span>
              </div>
            </>
          )}
          
          {/* Form Container */}
          <div className="px-6 pb-8">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm">
                {error}
              </div>
            )}
            
            {!otpSent ? (
              // Step 1: Enter Name and Email/Phone
              <form onSubmit={handleSendOTP}>
                <div className="mb-4">
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    <User className="inline-block mr-2 h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    {authType === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  {authType === 'email' ? (
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  ) : (
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-white/10 border border-r-0 border-white/10 rounded-l-lg text-white">
                        +91
                      </span>
                      <input
                        type="tel"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-r-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        maxLength={10}
                        required
                      />
                    </div>
                  )}
                </div>
                
                {/* Recaptcha container for Firebase Phone Auth */}
                <div id="recaptcha-container" className="mb-4 flex justify-center" style={{display: authType === 'phone' ? 'block' : 'none', visibility: 'visible', opacity: '1'}}></div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Step 2: Enter OTP
              <form onSubmit={handleVerifyOTP}>
                <div className="mb-6">
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    Enter OTP
                  </label>
                  <p className="text-purple-300 text-sm mb-4">
                    We&apos;ve sent a one-time password to your {authType === 'email' ? 'email' : 'phone'}
                  </p>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 tracking-widest text-center letter-spacing-4"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    className="text-purple-300 hover:text-white text-sm"
                    onClick={() => setOtpSent(false)}
                  >
                    Change {authType === 'email' ? 'email' : 'phone number'}
                  </button>
                </div>
              </form>
            )}
            
            <div className="mt-6 text-center text-purple-300 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-400 hover:text-white font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
