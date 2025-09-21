"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, User, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DemoPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const createDemoUsers = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch('/api/seed/demo-users', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setSeedStatus('success');
      } else {
        setSeedStatus('error');
      }
    } catch (error) {
      setSeedStatus('error');
    } finally {
      setIsSeeding(false);
    }
  };

  const demoCredentials = [
    {
      type: "Student",
      icon: User,
      email: "student@sukoon.app",
      password: "student123",
      role: "Student Account",
      description: "Access student dashboard, resources, and mental health tools",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      type: "Admin", 
      icon: Shield,
      email: "admin@sukoon.app",
      password: "admin123",
      role: "Administrator Account",
      description: "Full admin access, user management, and analytics",
      color: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          >
            Demo Accounts
          </motion.h1>
          <p className="text-gray-400 text-lg">
            Use these demo accounts to test the platform without creating new accounts
          </p>
        </div>

        {/* Seed Demo Users Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Button
            onClick={createDemoUsers}
            disabled={isSeeding}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {isSeeding ? "Creating Demo Users..." : "🚀 Setup Demo Users"}
          </Button>
          
          {seedStatus === 'success' && (
            <div className="flex items-center justify-center mt-2 text-green-400">
              <CheckCircle className="w-4 h-4 mr-2" />
              Demo users created successfully!
            </div>
          )}
          
          {seedStatus === 'error' && (
            <div className="flex items-center justify-center mt-2 text-red-400">
              <AlertCircle className="w-4 h-4 mr-2" />
              Failed to create demo users. Check console for details.
            </div>
          )}
        </motion.div>

        {/* Demo Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {demoCredentials.map((demo, index) => {
            const IconComponent = demo.icon;
            
            return (
              <motion.div
                key={demo.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className={`bg-gradient-to-br ${demo.color} border-white/10 backdrop-blur-sm`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <IconComponent className="w-6 h-6" />
                      {demo.type} Account
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {demo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Email</label>
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                        <code className="text-white font-mono flex-1">{demo.email}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(demo.email, `${demo.type}-email`)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        {copiedField === `${demo.type}-email` && (
                          <span className="text-green-400 text-xs">Copied!</span>
                        )}
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Password</label>
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                        <code className="text-white font-mono flex-1">{demo.password}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(demo.password, `${demo.type}-password`)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        {copiedField === `${demo.type}-password` && (
                          <span className="text-green-400 text-xs">Copied!</span>
                        )}
                      </div>
                    </div>

                    {/* Login Button */}
                    <Link href="/login" className="block">
                      <Button className="w-full bg-white text-black hover:bg-gray-200">
                        Login as {demo.type}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3">How to Use</h3>
              <ol className="text-gray-300 space-y-2 text-left max-w-2xl mx-auto">
                <li>1. Click "Setup Demo Users" to create the demo accounts in production</li>
                <li>2. Copy the email and password from any demo account above</li>
                <li>3. Go to the <Link href="/login" className="text-blue-400 hover:underline">login page</Link></li>
                <li>4. Paste the credentials and login</li>
                <li>5. Experience the platform with pre-configured demo data</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}