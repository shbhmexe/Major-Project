'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, MapPin, Briefcase, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Leanne Graham');
  const [email, setEmail] = useState('leanne@graham.com');
  const [location, setLocation] = useState('New York, USA');
  const [bio, setBio] = useState('Full-stack developer with a passion for creating user-friendly applications.');
  const [company, setCompany] = useState('Tech Solutions Inc.');
  const [joinDate] = useState('January 2022');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile here
    alert('Profile saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{email}</p>
                  
                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{company}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Joined {joinDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Edit Profile</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-700 dark:text-gray-300">Company</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 