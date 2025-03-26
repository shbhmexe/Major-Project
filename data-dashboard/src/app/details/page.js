'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/context/AppContext';
import DataTable from '@/src/components/ui/DataTable';
import { ChevronRight } from 'lucide-react';

// Mock data for the table
const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', date: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', date: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', date: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', date: '2023-03-15' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'Active', date: '2023-04-05' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'User', status: 'Inactive', date: '2023-04-20' },
  { id: 7, name: 'Edward Ford', email: 'edward@example.com', role: 'User', status: 'Active', date: '2023-05-01' },
  { id: 8, name: 'Grace Harris', email: 'grace@example.com', role: 'Admin', status: 'Active', date: '2023-05-10' },
  { id: 9, name: 'Henry Irving', email: 'henry@example.com', role: 'User', status: 'Inactive', date: '2023-06-05' },
  { id: 10, name: 'Irene Jackson', email: 'irene@example.com', role: 'User', status: 'Active', date: '2023-06-15' },
  { id: 11, name: 'Jack Kelly', email: 'jack@example.com', role: 'Admin', status: 'Active', date: '2023-07-01' },
  { id: 12, name: 'Karen Lewis', email: 'karen@example.com', role: 'User', status: 'Active', date: '2023-07-12' },
  { id: 13, name: 'Leo Martin', email: 'leo@example.com', role: 'User', status: 'Inactive', date: '2023-08-05' },
  { id: 14, name: 'Mia Nelson', email: 'mia@example.com', role: 'User', status: 'Active', date: '2023-08-15' },
  { id: 15, name: 'Noah Owens', email: 'noah@example.com', role: 'Admin', status: 'Active', date: '2023-09-01' },
];

// Table columns configuration
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

export default function DetailsPage() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Simulate API data loading
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTableData(mockData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Details</h1>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <span>Dashboard</span>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="font-medium text-gray-900">Details</span>
          </div>
        </div>
      </div>
      
      {/* Table section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">User Data</h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all users in the system with their details.
          </p>
        </div>
        
        {isLoading ? (
          <div className="py-10 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <DataTable data={tableData} columns={columns} />
        )}
      </div>
    </div>
  );
} 