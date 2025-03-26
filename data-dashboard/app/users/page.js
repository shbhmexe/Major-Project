'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/context/AppContext';
import { Search, UserPlus, MoreHorizontal, UserCheck, UserX, Mail, Phone, Calendar } from 'lucide-react';

// Generate mock user data
const generateMockUsers = () => {
  const roles = ['Admin', 'User', 'Editor', 'Viewer'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joined: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
  }));
};

export default function Users() {
  const router = useRouter();
  const { isAuthenticated, saveCurrentPath } = useAppContext();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Save current path
      saveCurrentPath('/users');
    }
  }, [isAuthenticated, router, saveCurrentPath]);
  
  // Load mock users
  useEffect(() => {
    setUsers(generateMockUsers());
  }, []);
  
  // Filter users by search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage user accounts and permissions.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>
      
      {/* Search */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      {/* Users list */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <div 
                className="px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
              >
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-blue-600 dark:text-blue-400 truncate">{user.name}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-gray-400">
                        ({user.email})
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <p>
                          Joined on <time dateTime={user.joined}>{user.joined}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                         user.status === 'Inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : 
                         'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                        {user.status}
                      </p>
                      <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <MoreHorizontal className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              
              {/* User details panel (expanded) */}
              {selectedUser?.id === user.id && (
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:px-6 border-t border-gray-200 dark:border-gray-600">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        <Mail className="mr-1 h-4 w-4" /> Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        <Phone className="mr-1 h-4 w-4" /> Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.phone}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.role}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.status}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined Date</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.joined}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Active</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.lastActive}</dd>
                    </div>
                    <div className="sm:col-span-2 mt-2">
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        >
                          <UserCheck className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-300 dark:bg-red-900 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
                        >
                          <UserX className="h-3.5 w-3.5 mr-1" />
                          Disable
                        </button>
                      </div>
                    </div>
                  </dl>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 