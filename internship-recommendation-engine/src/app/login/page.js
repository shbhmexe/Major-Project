'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Orb from '@/components/Orb';
import { Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [authType, setAuthType] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    isAuthenticated, 
    loading, 
    sendEmailOTP, 
    sendPhoneOTP, 
    verifyEmailOTP, 
    verifyPhoneOTP 
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
    setSuccess('');
    setIsLoading(true);
    
    try {
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
        setSuccess(result.message || `OTP sent successfully to your ${authType === 'email' ? 'email' : 'phone'}`);
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
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate OTP
      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }
      
      // Call the appropriate verification method based on auth type
      let result;
      try {
        if (authType === 'email') {
          result = await verifyEmailOTP(otp);
        } else {
          const formattedPhoneNumber = phoneNumber.startsWith('+') 
            ? phoneNumber 
            : `+91${phoneNumber}`;
          result = await verifyPhoneOTP(formattedPhoneNumber, otp);
        }
      } catch (verificationError) {
        console.error('OTP verification error:', verificationError);
        // If verification fails, try sending a new OTP
        throw new Error(`Invalid OTP. ${verificationError.message}`);
      }
      
      if (result && result.success) {
        setSuccess(result.message || 'OTP verified successfully! Redirecting to internship page...');
        // Add a small delay before redirecting to ensure user sees success message
        setTimeout(() => {
          window.location.href = '/internship-list';
        }, 1000);
      } else {
        throw new Error(result?.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message);
      // Reset OTP field on error
      setOtp('');
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
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-purple-200">Sign in to access your internship recommendations</p>
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
            
            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-white text-sm">
                {success}
              </div>
            )}
            
            {!otpSent ? (
              // Step 1: Enter Email/Phone
              <form onSubmit={handleSendOTP}>
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
                
                {/* Recaptcha container for phone authentication */}
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
                      Verify OTP
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
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-purple-400 hover:text-white font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
