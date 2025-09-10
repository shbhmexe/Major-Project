'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useText } from '@/app/providers';
import { AnimatedText } from '@/components/AnimatedText';
import { cn } from '@/lib/utils';

// Mock analytics data
const MOCK_ANALYTICS = {
  users: {
    total: 1245,
    active: 876,
    new: 124,
    anonymous: 342,
    growth: 18.5
  },
  interactions: {
    chatbot: 3567,
    bookings: 289,
    resourceViews: 1876,
    forumPosts: 432,
    forumComments: 1245
  },
  mentalHealth: {
    anxietyMentions: 432,
    stressMentions: 567,
    depressionMentions: 234,
    sleepIssuesMentions: 189,
    academicStressMentions: 378
  },
  resourceUsage: [
    { name: 'Videos', value: 45 },
    { name: 'Audio Guides', value: 30 },
    { name: 'Written Guides', value: 25 }
  ],
  userActivity: [
    { day: 'Mon', users: 120 },
    { day: 'Tue', users: 145 },
    { day: 'Wed', users: 132 },
    { day: 'Thu', users: 167 },
    { day: 'Fri', users: 178 },
    { day: 'Sat', users: 94 },
    { day: 'Sun', users: 86 }
  ],
  topConcerns: [
    { concern: 'Exam Anxiety', count: 245 },
    { concern: 'Sleep Problems', count: 187 },
    { concern: 'Social Anxiety', count: 156 },
    { concern: 'Future Career', count: 134 },
    { concern: 'Relationship Issues', count: 98 }
  ],
  counselorBookings: [
    { name: 'Dr. Sarah Johnson', bookings: 78 },
    { name: 'Dr. Rajesh Patel', bookings: 65 },
    { name: 'Dr. Priya Sharma', bookings: 82 },
    { name: 'Dr. Michael Chen', bookings: 64 }
  ],
  languagePreferences: [
    { language: 'English', users: 65 },
    { language: 'Hindi', users: 20 },
    { language: 'Tamil', users: 5 },
    { language: 'Bengali', users: 4 },
    { language: 'Other', users: 6 }
  ]
};

// Mock user data for admin table
const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.edu',
    joinDate: '2023-10-15',
    lastActive: '2023-11-28',
    interactions: 34,
    bookings: 2,
    status: 'active'
  },
  {
    id: 'u2',
    name: 'Priya Patel',
    email: 'priya.p@example.edu',
    joinDate: '2023-09-22',
    lastActive: '2023-11-27',
    interactions: 56,
    bookings: 3,
    status: 'active'
  },
  {
    id: 'u3',
    name: 'Amit Kumar',
    email: 'amit.k@example.edu',
    joinDate: '2023-11-05',
    lastActive: '2023-11-25',
    interactions: 12,
    bookings: 1,
    status: 'active'
  },
  {
    id: 'u4',
    name: 'Sneha Gupta',
    email: 'sneha.g@example.edu',
    joinDate: '2023-08-30',
    lastActive: '2023-11-28',
    interactions: 78,
    bookings: 4,
    status: 'active'
  },
  {
    id: 'u5',
    name: 'Vikram Singh',
    email: 'vikram.s@example.edu',
    joinDate: '2023-10-10',
    lastActive: '2023-11-20',
    interactions: 23,
    bookings: 0,
    status: 'inactive'
  },
  {
    id: 'u6',
    name: 'Neha Reddy',
    email: 'neha.r@example.edu',
    joinDate: '2023-11-12',
    lastActive: '2023-11-28',
    interactions: 8,
    bookings: 1,
    status: 'active'
  },
  {
    id: 'u7',
    name: 'Anonymous User',
    email: 'anonymous',
    joinDate: '2023-11-15',
    lastActive: '2023-11-28',
    interactions: 15,
    bookings: 1,
    status: 'anonymous'
  }
];

// Mock reports data
const MOCK_REPORTS = [
  {
    id: 'r1',
    title: 'Monthly User Engagement Report',
    date: '2023-11-01',
    type: 'engagement',
    status: 'generated'
  },
  {
    id: 'r2',
    title: 'Mental Health Trends Analysis',
    date: '2023-11-15',
    type: 'trends',
    status: 'generated'
  },
  {
    id: 'r3',
    title: 'Resource Utilization Report',
    date: '2023-11-22',
    type: 'resources',
    status: 'generated'
  },
  {
    id: 'r4',
    title: 'Counselor Performance Metrics',
    date: '2023-11-28',
    type: 'counselors',
    status: 'pending'
  }
];

// Simple bar chart component
function BarChart({ data, xKey, yKey, color = 'blue' }) {
  const maxValue = Math.max(...data.map(item => item[yKey]));
  
  return (
    <div className="h-64 flex items-end space-x-2">
      {data.map((item, index) => {
        const height = (item[yKey] / maxValue) * 100;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className={`w-full bg-${color}-500 dark:bg-${color}-600 rounded-t`} 
              style={{ height: `${height}%` }}
            ></div>
            <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">{item[xKey]}</div>
          </div>
        );
      })}
    </div>
  );
}

// Simple pie chart component
function PieChart({ data, nameKey, valueKey }) {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);
  let startAngle = 0;
  
  return (
    <div className="relative h-64 w-64 mx-auto">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {data.map((item, index) => {
          const percentage = (item[valueKey] / total) * 100;
          const angle = (percentage / 100) * 360;
          const endAngle = startAngle + angle;
          
          // Convert angles to radians and calculate path
          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (endAngle - 90) * (Math.PI / 180);
          
          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');
          
          const colors = ['blue-500', 'purple-500', 'green-500', 'yellow-500', 'red-500', 'indigo-500'];
          const color = colors[index % colors.length];
          
          startAngle = endAngle;
          
          return (
            <path 
              key={index} 
              d={pathData} 
              className={`fill-${color} stroke-white dark:stroke-gray-800`} 
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-full h-16 w-16"></div>
      </div>
    </div>
  );
}

// Dashboard card component
function DashboardCard({ title, children, className }) {
  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden", className)}>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Stat card component
function StatCard({ title, value, change, icon, color = 'blue' }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            {change && (
              <p className={cn(
                "text-sm mt-1",
                change >= 0 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {change >= 0 ? '+' : ''}{change}%
              </p>
            )}
          </div>
          <div className={`bg-${color}-100 dark:bg-${color}-900/30 p-3 rounded-full`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('week');
  
  // Get text content from text.md
  const adminTitle = useText('admin_dashboard.title', 'Admin Dashboard');
  const adminSubtitle = useText('admin_dashboard.subtitle', 'Monitor platform usage and mental health trends');
  const dashboardTabText = useText('admin_dashboard.tabs.dashboard', 'Dashboard');
  const usersTabText = useText('admin_dashboard.tabs.users', 'Users');
  const reportsTabText = useText('admin_dashboard.tabs.reports', 'Reports');
  const settingsTabText = useText('admin_dashboard.tabs.settings', 'Settings');
  const totalUsersText = useText('admin_dashboard.stats.total_users', 'Total Users');
  const activeUsersText = useText('admin_dashboard.stats.active_users', 'Active Users');
  const newUsersText = useText('admin_dashboard.stats.new_users', 'New Users');
  const anonymousUsersText = useText('admin_dashboard.stats.anonymous_users', 'Anonymous Users');
  const userActivityText = useText('admin_dashboard.charts.user_activity', 'User Activity');
  const resourceUsageText = useText('admin_dashboard.charts.resource_usage', 'Resource Usage');
  const topConcernsText = useText('admin_dashboard.charts.top_concerns', 'Top Mental Health Concerns');
  const counselorBookingsText = useText('admin_dashboard.charts.counselor_bookings', 'Counselor Bookings');
  const languagePreferencesText = useText('admin_dashboard.charts.language_preferences', 'Language Preferences');
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, router]);
  
  // If not authenticated or not admin, show nothing while redirecting
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              >
                MindfulCampus
              </button>
              <span className="ml-4 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-900 dark:text-blue-200">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">
                {user?.name || 'Admin User'}
              </span>
              <button 
                onClick={() => router.push('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Admin Dashboard Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <AnimatedText 
            text={adminTitle} 
            className="text-3xl font-bold text-gray-900 dark:text-white" 
            duration={0.5}
          />
          <AnimatedText 
            text={adminSubtitle} 
            className="mt-2 text-xl text-gray-600 dark:text-gray-300" 
            duration={0.5}
            delay={0.1}
          />
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "py-4 px-6 text-sm font-medium",
              activeTab === 'dashboard'
                ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {dashboardTabText}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              "py-4 px-6 text-sm font-medium",
              activeTab === 'users'
                ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {usersTabText}
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={cn(
              "py-4 px-6 text-sm font-medium",
              activeTab === 'reports'
                ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {reportsTabText}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "py-4 px-6 text-sm font-medium",
              activeTab === 'settings'
                ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            {settingsTabText}
          </button>
        </div>
        
        {/* Date Range Filter */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setDateRange('week')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-l-md",
                dateRange === 'week'
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              )}
            >
              Week
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={cn(
                "px-4 py-2 text-sm font-medium",
                dateRange === 'month'
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              )}
            >
              Month
            </button>
            <button
              onClick={() => setDateRange('year')}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-r-md",
                dateRange === 'year'
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              )}
            >
              Year
            </button>
          </div>
        </div>
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title={totalUsersText} 
                value={MOCK_ANALYTICS.users.total} 
                change={MOCK_ANALYTICS.users.growth} 
                icon={
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                } 
                color="blue"
              />
              <StatCard 
                title={activeUsersText} 
                value={MOCK_ANALYTICS.users.active} 
                icon={
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                } 
                color="green"
              />
              <StatCard 
                title={newUsersText} 
                value={MOCK_ANALYTICS.users.new} 
                icon={
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                } 
                color="purple"
              />
              <StatCard 
                title={anonymousUsersText} 
                value={MOCK_ANALYTICS.users.anonymous} 
                icon={
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                } 
                color="yellow"
              />
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title={userActivityText}>
                <BarChart 
                  data={MOCK_ANALYTICS.userActivity} 
                  xKey="day" 
                  yKey="users" 
                  color="blue"
                />
              </DashboardCard>
              
              <DashboardCard title={resourceUsageText}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2">
                    <PieChart 
                      data={MOCK_ANALYTICS.resourceUsage} 
                      nameKey="name" 
                      valueKey="value" 
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="space-y-4">
                      {MOCK_ANALYTICS.resourceUsage.map((item, index) => {
                        const colors = ['blue-500', 'purple-500', 'green-500'];
                        const color = colors[index % colors.length];
                        
                        return (
                          <div key={index} className="flex items-center">
                            <div className={`w-4 h-4 rounded-full bg-${color} mr-2`}></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}: {item.value}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title={topConcernsText}>
                <div className="space-y-4">
                  {MOCK_ANALYTICS.topConcerns.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-4 rounded-full" 
                          style={{ width: `${(item.count / MOCK_ANALYTICS.topConcerns[0].count) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm text-gray-700 dark:text-gray-300 min-w-[100px]">
                        {item.concern} ({item.count})
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>
              
              <DashboardCard title={counselorBookingsText}>
                <div className="space-y-4">
                  {MOCK_ANALYTICS.counselorBookings.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div 
                          className="bg-purple-600 dark:bg-purple-500 h-4 rounded-full" 
                          style={{ width: `${(item.bookings / MOCK_ANALYTICS.counselorBookings[0].bookings) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm text-gray-700 dark:text-gray-300 min-w-[150px]">
                        {item.name} ({item.bookings})
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
            
            <DashboardCard title={languagePreferencesText}>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2">
                  <PieChart 
                    data={MOCK_ANALYTICS.languagePreferences} 
                    nameKey="language" 
                    valueKey="users" 
                  />
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                  <div className="space-y-4">
                    {MOCK_ANALYTICS.languagePreferences.map((item, index) => {
                      const colors = ['blue-500', 'purple-500', 'green-500', 'yellow-500', 'red-500'];
                      const color = colors[index % colors.length];
                      
                      return (
                        <div key={index} className="flex items-center">
                          <div className={`w-4 h-4 rounded-full bg-${color} mr-2`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item.language}: {item.users}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        )}
        
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                    Export Data
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Interactions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.joinDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.interactions}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            user.status === 'active' 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                              : user.status === 'anonymous'
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          )}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4">View</button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Disable</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">42</span> users
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reports</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                  Generate New Report
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_REPORTS.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{report.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{report.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{report.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            report.status === 'generated' 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          )}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {report.status === 'generated' ? (
                            <>
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4">View</button>
                              <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300">Download</button>
                            </>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">Processing...</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Platform Settings</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform Name</label>
                      <input
                        type="text"
                        value="MindfulCampus"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value="admin@mindfulcampus.edu"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="maintenance"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable Maintenance Mode
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Allow Anonymous Access
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="data-collection"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="data-collection" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Collect Usage Analytics
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data Retention Period (days)</label>
                      <input
                        type="number"
                        value="90"
                        className="w-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Feature Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="chatbot"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="chatbot" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable AI Chatbot
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="booking"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="booking" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable Counselor Booking
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="forum"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="forum" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable Peer Support Forum
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="resources"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="resources" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable Resource Hub
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}