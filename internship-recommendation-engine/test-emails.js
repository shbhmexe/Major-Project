#!/usr/bin/env node

/**
 * Email Testing Script for InternDisha
 * 
 * This script helps you test the email functionality locally or on Vercel
 * Run with: node test-emails.js
 */

const baseUrl = process.argv[2] || 'http://localhost:3000';
const testEmail = process.argv[3] || 'test@example.com';

console.log('🧪 Testing InternDisha Email System');
console.log('📡 Base URL:', baseUrl);
console.log('📧 Test Email:', testEmail);
console.log('─'.repeat(50));

async function testEmailSystem() {
  try {
    // Test 1: Check email service status
    console.log('1️⃣ Testing email service status...');
    const statusResponse = await fetch(`${baseUrl}/api/test/email`);
    const statusData = await statusResponse.json();
    
    if (statusData.success) {
      console.log('✅ Email service status:', statusData.emailService.status);
      console.log('📋 SMTP Config:', {
        host: statusData.config.host,
        port: statusData.config.port,
        hasCredentials: statusData.config.hasCredentials
      });
    } else {
      console.log('❌ Email service check failed:', statusData.message);
      return;
    }
    
    console.log('');
    
    // Test 2: Test SMTP connection
    console.log('2️⃣ Testing SMTP connection...');
    const smtpResponse = await fetch(`${baseUrl}/api/test/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'status' })
    });
    const smtpData = await smtpResponse.json();
    
    if (smtpData.success) {
      console.log('✅ SMTP connection:', smtpData.status);
    } else {
      console.log('❌ SMTP connection failed:', smtpData.message);
    }
    
    console.log('');
    
    // Test 3: Send welcome email
    console.log('3️⃣ Testing welcome email...');
    const welcomeResponse = await fetch(`${baseUrl}/api/test/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'welcome', 
        email: testEmail, 
        name: 'Test User' 
      })
    });
    const welcomeData = await welcomeResponse.json();
    
    if (welcomeData.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('📧 Message ID:', welcomeData.details.messageId);
    } else {
      console.log('❌ Welcome email failed:', welcomeData.message);
      if (welcomeData.error) console.log('🔍 Error:', welcomeData.error);
    }
    
    console.log('');
    
    // Test 4: Test user creation with welcome email
    console.log('4️⃣ Testing user creation with automatic welcome email...');
    const userResponse = await fetch(`${baseUrl}/api/auth/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test-${Date.now()}@example.com`,
        displayName: 'Test User',
        authMethod: 'email',
        role: 'candidate'
      })
    });
    const userData = await userResponse.json();
    
    if (userData.success) {
      console.log('✅ User creation:', userData.message);
      console.log('👤 Is new user:', userData.isNewUser);
      console.log('📧 Welcome email sent:', userData.welcomeEmailSent);
    } else {
      console.log('❌ User creation failed:', userData.message);
    }
    
    console.log('');
    console.log('🎉 Email testing completed!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Check your email inbox for the welcome email');
    console.log('2. If emails are not received, check spam folder');
    console.log('3. Verify environment variables are set correctly');
    console.log('4. Check server logs for detailed error messages');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('');
    console.log('🔍 Troubleshooting tips:');
    console.log('1. Make sure the server is running');
    console.log('2. Check if the URL is correct');
    console.log('3. Verify environment variables are set');
    console.log('4. Check network connectivity');
  }
}

// Run tests
testEmailSystem();