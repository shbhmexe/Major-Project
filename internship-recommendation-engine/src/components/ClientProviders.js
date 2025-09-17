'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import dynamic from 'next/dynamic';

// Dynamically import the Chatbot component with SSR disabled
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <Chatbot />
    </AuthProvider>
  );
}