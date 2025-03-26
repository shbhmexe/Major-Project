'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/context/AppContext';
import { Save, Bell, Lock, User, Shield, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const router = useRouter();
  const { isAuthenticated, user, logout, saveCurrentPath } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('account');
  const [accountForm, setAccountForm] = useState({
    name: '',
    email: '',
    bio: '',
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newsUpdates: false,
    activitySummary: true,
    securityAlerts: true,
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Save current path
      saveCurrentPath('/settings');
      // Pre-fill account form with user data
      setAccountForm({
        name: user.name || '',
        email: user.email || '',
        bio: '',
      });
    }
  }, [isAuthenticated, router, user, saveCurrentPath]);
  
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const saveAccountSettings = (e) => {
    e.preventDefault();
    // In a real app, you would save to a database or API
    alert('Account settings saved!');
  };
  
  const saveSecuritySettings = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (securityForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // In a real app, you would verify the current password and update it
    alert('Security settings saved! You will need to log in again.');
    logout();
    router.push('/login');
  };
  
  const saveNotificationSettings = (e) => {
    e.preventDefault();
    // In a real app, you would save to a database or API
    alert('Notification preferences saved!');
  };
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your account preferences and settings.</p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'account', name: 'Account', icon: User },
            { id: 'security', name: 'Security', icon: Lock },
            { id: 'notifications', name: 'Notifications', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <tab.icon className={`mr-2 h-5 w-5 ${
                activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
              }`} />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-10">
        {activeTab === 'account' && (
          <form onSubmit={saveAccountSettings} className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 dark:bg-gray-800">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Personal Information</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your account information and profile.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={accountForm.name}
                        onChange={handleAccountChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={accountForm.email}
                        onChange={handleAccountChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div className="col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={accountForm.bio}
                          onChange={handleAccountChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Brief description for your profile."
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'security' && (
          <form onSubmit={saveSecuritySettings} className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 dark:bg-gray-800">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Password</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password to keep your account secure.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type={showPassword.current ? "text" : "password"}
                          name="currentPassword"
                          id="currentPassword"
                          value={securityForm.currentPassword}
                          onChange={handleSecurityChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => togglePasswordVisibility('current')}
                        >
                          {showPassword.current ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type={showPassword.new ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          value={securityForm.newPassword}
                          onChange={handleSecurityChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showPassword.new ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          value={securityForm.confirmPassword}
                          onChange={handleSecurityChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showPassword.confirm ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white">Password requirements:</h3>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Minimum 6 characters long</li>
                            <li>Include at least one special character</li>
                            <li>Include at least one number</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'notifications' && (
          <form onSubmit={saveNotificationSettings} className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 dark:bg-gray-800">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Notification Settings</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Decide which communications you&apos;d like to receive.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="space-y-6">
                    {[
                      {
                        id: 'emailNotifications',
                        name: 'Email Notifications',
                        description: 'Receive email notifications for important updates.',
                      },
                      {
                        id: 'newsUpdates',
                        name: 'News and Updates',
                        description: 'Get notified about new features and improvements.',
                      },
                      {
                        id: 'activitySummary',
                        name: 'Activity Summary',
                        description: 'Receive weekly summary of your dashboard activity.',
                      },
                      {
                        id: 'securityAlerts',
                        name: 'Security Alerts',
                        description: 'Get important security notifications and alerts.',
                      },
                    ].map((notification) => (
                      <div key={notification.id} className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={notification.id}
                            name={notification.id}
                            type="checkbox"
                            checked={notificationSettings[notification.id]}
                            onChange={handleNotificationChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={notification.id} className="font-medium text-gray-700 dark:text-gray-300">
                            {notification.name}
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 