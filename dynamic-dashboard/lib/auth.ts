import { jwtDecode, JwtPayload } from "jwt-decode";

// Define user interface
export interface User {
  email: string;
  name: string;
  exp: number;
  [key: string]: unknown;
}

// Define token type
interface DecodedToken extends JwtPayload {
  exp: number;
  [key: string]: unknown;
}

// Token management with localStorage
export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decodedToken.exp < currentTime) {
      removeToken();
      return false;
    }
    
    return true;
  } catch {
    removeToken();
    return false;
  }
};

export const getUserFromToken = (): User | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token) as JwtPayload;
    // For demo purposes, ensure we always have a name and email
    return {
      ...decoded,
      name: 'Demo User',
      email: 'user@example.com',
      exp: (decoded.exp || 0)
    } as User;
  } catch {
    return null;
  }
}; 