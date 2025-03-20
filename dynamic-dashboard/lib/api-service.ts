import axios from 'axios';
import { getToken, removeToken } from './auth';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Using JsonPlaceholder as a mock API
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      // Redirect to login page if in browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    // In a real app, this would call your actual login API
    // For demo purposes, we'll simulate a successful login with a mock JWT
    if (email && password) {
      // Simulate an API response with a token
      // In a real app, the server would generate this token
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.drt_nxm8H6QmEUcPxF8hDbNEp2h8_kGRIXbk7fpLwj0';
      return { token: mockToken };
    }
    throw new Error('Invalid credentials');
  },
};

// Data API - example functions for different endpoints
export const dataApi = {
  getPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getPostById: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  
  getUserById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  createPost: async (data: { title: string; body: string; userId: number }) => {
    const response = await api.post('/posts', data);
    return response.data;
  },
  
  updatePost: async (id: number, data: { title?: string; body?: string }) => {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
  },
  
  deletePost: async (id: number) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
}; 