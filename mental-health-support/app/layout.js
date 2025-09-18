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
  icons: {
    icon: '/favicon.svg',
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
