#!/usr/bin/env node

/**
 * Test email script to verify SMTP configuration
 * Usage: node scripts/test-email.js [recipient-email]
 */

const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

async function testEmailService() {
  try {
    // Import email service (using dynamic import for ES modules)
    const { sendWelcomeEmail, testEmailConnection } = await import('../lib/email.js');
    
    console.log('🧪 Testing Email Service...\n');
    
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('❌ SMTP not configured!');
      console.log('Please set the following environment variables:');
      console.log('- SMTP_HOST (default: smtp.gmail.com)');
      console.log('- SMTP_PORT (default: 587)');
      console.log('- SMTP_USER (your email address)');
      console.log('- SMTP_PASS (your app password)\n');
      console.log('For Gmail:');
      console.log('1. Enable 2-factor authentication');
      console.log('2. Generate an app password: https://support.google.com/accounts/answer/185833');
      console.log('3. Use the app password as SMTP_PASS');
      return;
    }
    
    console.log('📧 SMTP Configuration:');
    console.log(`Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
    console.log(`Port: ${process.env.SMTP_PORT || '587'}`);
    console.log(`User: ${process.env.SMTP_USER}`);
    console.log(`Pass: ${'*'.repeat(process.env.SMTP_PASS.length)}\n`);
    
    // Test SMTP connection
    console.log('🔍 Testing SMTP connection...');
    const connectionTest = await testEmailConnection();
    
    if (connectionTest.success) {
      console.log('✅ SMTP connection successful!\n');
      
      // Test sending welcome email
      const recipientEmail = process.argv[2] || process.env.SMTP_USER;
      console.log(`📤 Sending test welcome email to: ${recipientEmail}`);
      
      const emailResult = await sendWelcomeEmail('Test User', recipientEmail);
      
      if (emailResult.success) {
        console.log('✅ Welcome email sent successfully!');
        console.log(`📬 Message ID: ${emailResult.messageId}`);
      } else {
        console.log('❌ Failed to send welcome email');
        console.log(`Error: ${emailResult.message}`);
      }
    } else {
      console.log('❌ SMTP connection failed!');
      console.log(`Error: ${connectionTest.message}`);
      console.log('\nTroubleshooting tips:');
      console.log('- Check your email and app password');
      console.log('- Ensure 2-factor authentication is enabled');
      console.log('- Make sure you\'re using an app password, not your regular password');
      console.log('- Check if your email provider allows SMTP connections');
    }
  } catch (error) {
    console.error('❌ Test failed with error:');
    console.error(error.message);
  }
}

// Run the test
testEmailService();