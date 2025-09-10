import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TextContentProvider, AnimationProvider, AuthSessionProvider } from "./providers";
import { AuthProvider } from "@/lib/auth";
import { NextAuthProvider } from "@/lib/nextauth";
import { loadTextContent } from "@/lib/textContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mindfull Care",
  description: "Mental health support and resources at your fingertips.",
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
          <TextContentProvider textContent={textContent}>
            <AnimationProvider>
              <NextAuthProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </NextAuthProvider>
            </AnimationProvider>
          </TextContentProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
