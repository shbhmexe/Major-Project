import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TextContentProvider, AnimationProvider, AuthSessionProvider, LanguageProvider } from "./providers";
import { AuthProvider } from "@/lib/auth";
import { NextAuthProvider } from "@/lib/nextauth";
import { loadTextContent } from "@/lib/textContent";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SukoonU - Mental Health Support",
  description: "A safe space for students to seek mental health support, learn coping strategies, and connect with others",
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-16x16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: {
      url: '/apple-touch-icon.svg',
      sizes: '180x180',
      type: 'image/svg+xml',
    },
  },
};

export default async function RootLayout({ children }) {
  // Load text content at build time
  const textContent = await loadTextContent();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <LanguageProvider>
            <TextContentProvider textContent={textContent}>
              <AnimationProvider>
                <NextAuthProvider>
                  <AuthProvider>
                    <ToastProvider>
                      {children}
                    </ToastProvider>
                  </AuthProvider>
                </NextAuthProvider>
              </AnimationProvider>
            </TextContentProvider>
          </LanguageProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
