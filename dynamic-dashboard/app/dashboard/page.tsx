'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dataApi } from '@/lib/api-service';
import { isAuthenticated } from '@/lib/auth';
import { DashboardLayout } from '@/components/dashboard-layout';
import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// Define types for API data
interface User {
  id: number;
  name: string;
  email: string;
  // Add other fields as needed
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
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
        setIsLoadingUsers(true);
        const usersData = await dataApi.getUsers();
        setUsers(usersData);
        setIsLoadingUsers(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setIsLoadingPosts(false);
        setIsLoadingUsers(false);
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
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'body', label: 'Content', render: (post: Post) => post.body.substring(0, 100) + '...' },
    { 
      key: 'userId', 
      label: 'Author',
      render: (post: Post) => {
        const user = users.find((u) => u.id === post.userId);
        return user ? user.name : `User ${post.userId}`;
      }
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        {error && (
          <div className="p-4 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From {users.length} users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Posts per User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.length ? (posts.length / users.length).toFixed(1) : '0'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Data Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">JSONPlaceholder API</div>
              <p className="text-xs text-muted-foreground mt-1">
                Mock data for demonstration
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Posts by User</CardTitle>
            <CardDescription>
              Number of posts created by each user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userPostCounts}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
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