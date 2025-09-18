'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { StarsBackground } from '@/components/StarsBackground';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('/default-avatar.svg');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      
      // Try to load photo from history first, then user data, then default
      const photoHistory = JSON.parse(localStorage.getItem('mh_photo_history') || '{}');
      const userKey = user.email || user.id || 'anonymous';
      const historicalPhoto = photoHistory[userKey];
      
      const photoToUse = historicalPhoto || user.profilePhoto || '/default-avatar.svg';
      setProfilePhoto(photoToUse);
      
      // Update user object with historical photo if different
      if (historicalPhoto && historicalPhoto !== user.profilePhoto) {
        const updatedUser = { ...user, profilePhoto: historicalPhoto };
        localStorage.setItem('mh_user', JSON.stringify(updatedUser));
      }
    }
  }, [user, loading, router]);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', content: t('selectImageFile') });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', content: t('imageSizeLimit') });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const response = await fetch('/api/profile/update-photo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setProfilePhoto(data.profilePhoto);
        setMessage({ type: 'success', content: t('photoUpdated') });
        
        // Update local storage user data
        const storedUser = JSON.parse(localStorage.getItem('mh_user') || '{}');
        const updatedUser = {
          ...storedUser,
          profilePhoto: data.profilePhoto
        };
        localStorage.setItem('mh_user', JSON.stringify(updatedUser));
        
        // Store photo history for this user
        const photoHistory = JSON.parse(localStorage.getItem('mh_photo_history') || '{}');
        const userKey = storedUser.email || storedUser.id || 'anonymous';
        photoHistory[userKey] = data.profilePhoto;
        localStorage.setItem('mh_photo_history', JSON.stringify(photoHistory));
      } else {
        setMessage({ type: 'error', content: data.error || t('errorSavingFile') });
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      setMessage({ type: 'error', content: t('errorSavingFile') });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', content: t('profileUpdated') });
        // Update local storage user data
        const storedUser = JSON.parse(localStorage.getItem('mh_user') || '{}');
        localStorage.setItem('mh_user', JSON.stringify({
          ...storedUser,
          name
        }));
      } else {
        setMessage({ type: 'error', content: data.error || t('errorSavingFile') });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', content: t('errorSavingFile') });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <StarsBackground />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <button 
          onClick={() => {
            try {
              if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
                router.back();
              } else {
                router.push('/');
              }
            } catch (error) {
              console.error('Navigation error:', error);
              router.push('/');
            }
          }} 
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-2 bg-gray-800/80 md:bg-transparent rounded-full md:rounded-lg backdrop-blur-sm md:backdrop-blur-none text-indigo-300 hover:text-white hover:bg-gray-700/80 md:hover:bg-transparent transition-all duration-200"
          aria-label={t('backToHome')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline ml-2">{t('backToHome')}</span>
        </button>
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-300">{t('profileTitle')}</h1>
              <LanguageSwitcher />
            </div>
            
            {message.content && (
              <div className={`mb-6 p-3 rounded ${message.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                {message.content}
              </div>
            )}
            
            <div className="flex flex-col items-center mb-8">
              <div 
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handlePhotoClick}
              >
                <Image 
                  src={profilePhoto} 
                  alt="Profile" 
                  fill
                  className="object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">{t('changePhoto')}</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="mt-2 text-sm text-gray-300">{t('clickToChangePhoto')}</p>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('name')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-gray-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-400">{t('emailCannotChange')}</p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('updateProfile')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}