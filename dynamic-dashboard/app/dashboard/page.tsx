'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dataApi } from '@/lib/api-service';
import { isAuthenticated } from '@/lib/auth';
import { DashboardLayout } from '@/components/dashboard-layout';
import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Define types for API data
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  [key: string]: unknown; // Add index signature for DataItem compatibility
}

export default function DashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Fetch data
    const fetchData = async () => {
      try {
        // Fetch posts
        setIsLoadingPosts(true);
        const postsData = await dataApi.getPosts();
        setPosts(postsData.slice(0, 100)); // Limit to first 100 posts
        setIsLoadingPosts(false);

        // Fetch users
        const usersData = await dataApi.getUsers();
        setUsers(usersData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setIsLoadingPosts(false);
      }
    };

    fetchData();
  }, [router]);

  // Prepare data for charts
  const userPostCounts = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    return {
      name: user.name,
      count: userPosts.length,
    };
  });

  // Define table columns
  const postColumns = [
    { 
      key: 'id', 
      label: 'ID',
      render: (post: Post) => (
        <div className="font-medium text-center">{post.id}</div>
      )
    },
    { 
      key: 'title', 
      label: 'Title',
      render: (post: Post) => (
        <div className="font-medium">{post.title}</div>
      )
    },
    { 
      key: 'body', 
      label: 'Content', 
      render: (post: Post) => (
        <div className="break-words">{post.body.substring(0, 100) + '...'}</div>
      )
    },
    { 
      key: 'userId', 
      label: 'Author',
      render: (post: Post) => {
        const user = users.find((u) => u.id === post.userId);
        return <div className="font-medium text-center">{user ? user.name : `User ${post.userId}`}</div>;
      }
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Dashboard</h1>
        
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{posts.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                From {users.length} users
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Posts per User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {users.length ? (posts.length / users.length).toFixed(1) : '0'}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Data Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-900 dark:text-white">JSONPlaceholder API</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Mock data for demonstration
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Posts by User</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Number of posts created by each user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userPostCounts} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value} posts`, 'Count']}
                    labelFormatter={(label) => `Author: ${label}`}
                    contentStyle={{ fontSize: '14px' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <DataTable 
          data={posts}
          columns={postColumns}
          isLoading={isLoadingPosts}
          title="Recent Posts"
        />
      </div>
    </DashboardLayout>
  );
} 