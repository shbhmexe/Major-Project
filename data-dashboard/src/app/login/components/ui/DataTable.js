'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ data, columns }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter and sort data
  const sortedData = useMemo(() => {
    let filteredData = [...data];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filteredData = filteredData.filter(item => {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(lowercasedTerm)
        );
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [data, sortConfig, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Pagination controls
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-300" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedData.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex items-center">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing rows per page
              }}
              className="border border-gray-300 rounded-md py-1 px-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} per page
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700 ml-4">
              Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * rowsPerPage, sortedData.length)}
              </span>{' '}
              of <span className="font-medium">{sortedData.length}</span> results
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className={`p-1 rounded ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronsLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1 rounded ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700 mx-2">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1 rounded ${
                currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-1 rounded ${
                currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronsRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 