'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { t } from '@/utils/translations';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Edit,
  Save,
  Briefcase,
  GraduationCap,
  MapPin,
  Award
} from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [language, setLanguage] = useState('en');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    education: '',
    skills: '',
    location: '',
    experience: ''
  });
  
  const router = useRouter();

  useEffect(() => {
    // Load language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'hi', 'gu', 'mr', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    
    // Load user data
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        education: user.education || '',
        skills: user.skills || '',
        location: user.location || '',
        experience: user.experience || ''
      });
    }
  }, [user]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would typically save the profile data to your backend
      // For now, we'll just update the local state
      setIsEditing(false);
      // You could add an API call here to update the user profile
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar language={language} setLanguage={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">{t('profileTitle', language) || 'User Profile'}</h1>
                <button 
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-5 h-5" />
                      {t('saveProfile', language) || 'Save'}
                    </>
                  ) : (
                    <>
                      <Edit className="w-5 h-5" />
                      {t('editProfile', language) || 'Edit Profile'}
                    </>
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Image Section */}
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <User className="w-20 h-20 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">{profileData.displayName}</h2>
                  <p className="text-purple-200 mb-4">{t('candidate', language) || 'Candidate'}</p>
                </div>
                
                {/* Profile Details Section */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-purple-300 mt-1" />
                        <div>
                          <p className="text-sm text-purple-300">{t('email', language) || 'Email'}</p>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleInputChange}
                              className="w-full bg-white/20 text-white border border-purple-500/30 rounded px-3 py-2 mt-1"
                            />
                          ) : (
                            <p className="text-white">{profileData.email || '-'}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-purple-300 mt-1" />
                        <div>
                          <p className="text-sm text-purple-300">{t('phoneNumber', language) || 'Phone Number'}</p>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={profileData.phoneNumber}
                              onChange={handleInputChange}
                              className="w-full bg-white/20 text-white border border-purple-500/30 rounded px-3 py-2 mt-1"
                            />
                          ) : (
                            <p className="text-white">{profileData.phoneNumber || '-'}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-300 mt-1" />
                        <div>
                          <p className="text-sm text-purple-300">{t('location', language) || 'Location'}</p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="location"
                              value={profileData.location}
                              onChange={handleInputChange}
                              className="w-full bg-white/20 text-white border border-purple-500/30 rounded px-3 py-2 mt-1"
                              placeholder="City, State"
                            />
                          ) : (
                            <p className="text-white">{profileData.location || '-'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Education and Skills */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 text-purple-300 mt-1" />
                        <div>
                          <p className="text-sm text-purple-300">{t('education', language) || 'Education'}</p>
                          {isEditing ? (
                            <textarea
                              name="education"
                              value={profileData.education}
                              onChange={handleInputChange}
                              className="w-full bg-white/20 text-white border border-purple-500/30 rounded px-3 py-2 mt-1"
                              rows="2"
                              placeholder="Degree, Institution"
                            />
                          ) : (
                            <p className="text-white">{profileData.education || '-'}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-purple-300 mt-1" />
                        <div>
                          <p className="text-sm text-purple-300">{t('skills', language) || 'Skills'}</p>
                          {isEditing ? (
                            <textarea
                              name="skills"
                              value={profileData.skills}
                              onChange={handleInputChange}
                              className="w-full bg-white/20 text-white border border-purple-500/30 rounded px-3 py-2 mt-1"
                              rows="2"
                              placeholder="Your skills (comma separated)"
                            />
                          ) : (
                            <p className="text-white">{profileData.skills || '-'}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-purple-300 mt-1" />
                        <div>
                          <p className="text-sm text-purple-300">{t('experience', language) || 'Experience'}</p>
                          {isEditing ? (
                            <textarea
                              name="experience"
                              value={profileData.experience}
                              onChange={handleInputChange}
                              className="w-full bg-white/20 text-white border border-purple-500/30 rounded px-3 py-2 mt-1"
                              rows="2"
                              placeholder="Your work experience"
                            />
                          ) : (
                            <p className="text-white">{profileData.experience || '-'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Button (Only visible in edit mode) */}
                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        {t('saveChanges', language) || 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer language={language} />
      </div>
    </ProtectedRoute>
  );
}