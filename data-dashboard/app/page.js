'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/src/context/AppContext';
import { PieChart, LineChart, BarChartIcon, Table, Users } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, saveCurrentPath } = useAppContext();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Save current path
      saveCurrentPath('/');
    }
  }, [isAuthenticated, router, saveCurrentPath]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  // Dashboard cards data
  const cards = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Sessions',
      value: '567',
      change: '+8%',
      isPositive: true,
      icon: LineChart,
      color: 'bg-green-500',
    },
    {
      title: 'Bounce Rate',
      value: '23%',
      change: '-5%',
      isPositive: true,
      icon: BarChartIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Page Views',
      value: '12,345',
      change: '+25%',
      isPositive: true,
      icon: PieChart,
      color: 'bg-orange-500',
    },
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Welcome to your dashboard overview.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`rounded-full p-2.5 ${card.color}`}>
                  {card.icon && <card.icon className="h-5 w-5 text-white" />}
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</h2>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
                    <p className={`ml-2 text-sm ${card.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {card.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`h-1 ${card.color}`}></div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">User Activity {item}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{item} hour{item !== 1 ? 's' : ''} ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Link 
                href="/details" 
                className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Table className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">View Details Table</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Access the detailed data information
                    </p>
                  </div>
                </div>
              </Link>
              
              <div className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChartIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Generate Reports</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Create custom reports from your data
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Add, edit, or remove user accounts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
