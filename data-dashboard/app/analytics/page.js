'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/context/AppContext';
import { BarChart3, LineChart, PieChart, TrendingUp, TrendingDown } from 'lucide-react';

// Add a simple chart component
const SimpleChart = () => {
  return (
    <div className="relative h-80 w-full">
      <svg className="h-full w-full" viewBox="0 0 800 300">
        {/* Chart grid */}
        <g className="text-gray-400 dark:text-gray-600">
          {[0, 1, 2, 3, 4].map((i) => (
            <line 
              key={`grid-h-${i}`} 
              x1="0" 
              y1={i * 60} 
              x2="800" 
              y2={i * 60} 
              stroke="currentColor" 
              strokeDasharray="5,5" 
              strokeWidth="1" 
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line 
              key={`grid-v-${i}`} 
              x1={i * 100} 
              y1="0" 
              x2={i * 100} 
              y2="240" 
              stroke="currentColor" 
              strokeDasharray="5,5" 
              strokeWidth="1" 
            />
          ))}
        </g>

        {/* X-axis labels */}
        <g className="text-xs text-gray-600 dark:text-gray-400">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month, i) => (
            <text key={month} x={i * 100 + 50} y="265" textAnchor="middle">{month}</text>
          ))}
        </g>

        {/* Y-axis labels */}
        <g className="text-xs text-gray-600 dark:text-gray-400">
          {['0', '25%', '50%', '75%', '100%'].map((label, i) => (
            <text key={label} x="30" y={240 - i * 60 + 5} textAnchor="end">{label}</text>
          ))}
        </g>

        {/* Line chart data */}
        <path 
          d="M50,180 L150,140 L250,160 L350,90 L450,120 L550,80 L650,100 L750,60" 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />

        {/* Data points */}
        {[
          {x: 50, y: 180},
          {x: 150, y: 140},
          {x: 250, y: 160},
          {x: 350, y: 90},
          {x: 450, y: 120},
          {x: 550, y: 80},
          {x: 650, y: 100},
          {x: 750, y: 60}
        ].map((point, i) => (
          <circle 
            key={i} 
            cx={point.x} 
            cy={point.y} 
            r="6" 
            fill="#3b82f6" 
            stroke="white" 
            strokeWidth="2" 
          />
        ))}

        {/* Area under the line chart */}
        <path 
          d="M50,180 L150,140 L250,160 L350,90 L450,120 L550,80 L650,100 L750,60 L750,240 L50,240 Z" 
          fill="url(#blueGradient)" 
          opacity="0.2" 
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function Analytics() {
  const router = useRouter();
  const { isAuthenticated, saveCurrentPath } = useAppContext();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Save current path
      saveCurrentPath('/analytics');
    }
  }, [isAuthenticated, router, saveCurrentPath]);

  // Mock stats data
  const stats = [
    { name: 'Total Visits', value: '53,248', change: '+12.5%', isPositive: true },
    { name: 'Conversion Rate', value: '24.3%', change: '+3.2%', isPositive: true },
    { name: 'Bounce Rate', value: '42.8%', change: '+5.1%', isPositive: true },
    { name: 'Avg. Session', value: '4m 12s', change: '-0.5%', isPositive: false },
  ];

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">View your performance metrics and trends.</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-blue-100 dark:bg-blue-900 p-3">
                  {index === 0 ? (
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : index === 1 ? (
                    <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : index === 2 ? (
                    <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.isPositive ? (
                        <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500 dark:text-red-400" />
                      )}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Performance Overview
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Data from the last 30 days
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <SimpleChart />
        </div>
      </div>

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Traffic Sources
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Visitors
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Conversion
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { source: 'Google', visitors: '23,145', conversion: '5.2%' },
                    { source: 'Direct', visitors: '12,538', conversion: '4.3%' },
                    { source: 'Social Media', visitors: '8,946', conversion: '3.7%' },
                    { source: 'Referrals', visitors: '6,218', conversion: '6.1%' },
                    { source: 'Email', visitors: '2,401', conversion: '8.3%' },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.visitors}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Top Pages
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Page
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Avg. Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { page: '/dashboard', views: '8,426', time: '2m 43s' },
                    { page: '/details', views: '6,382', time: '3m 12s' },
                    { page: '/analytics', views: '5,728', time: '4m 07s' },
                    { page: '/settings', views: '3,129', time: '1m 56s' },
                    { page: '/users', views: '2,875', time: '2m 38s' },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.page}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 