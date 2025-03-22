'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-provider';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile here
    alert('Profile saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white dark:bg-gray-800 shadow">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Appearance</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Customize how the dashboard looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={toggleTheme} 
                    aria-label="Toggle dark mode"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Notifications</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications in the app
                    </p>
                  </div>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications} 
                    aria-label="Toggle push notifications"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch 
                    checked={emailUpdates} 
                    onCheckedChange={setEmailUpdates} 
                    aria-label="Toggle email updates"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Profile Information</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Update your profile details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 