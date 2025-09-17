// Test script for API endpoints
// Using built-in fetch API (Node.js v18+)

// Base URL - change this to match your development server
const BASE_URL = 'http://localhost:3000/api';

// Test email OTP endpoints
async function testEmailOTP() {
  console.log('\n===== Testing Email OTP API =====');
  
  // Test email for OTP
  const testEmail = 'test@example.com';
  
  // 1. Send OTP
  console.log('\n1. Sending OTP to', testEmail);
  try {
    const sendResponse = await fetch(`${BASE_URL}/auth/email-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });
    
    const sendResult = await sendResponse.json();
    console.log('Status:', sendResponse.status);
    console.log('Response:', sendResult);
    
    // If successful, proceed to verify with a fake OTP
    if (sendResult.success) {
      // 2. Verify OTP (this will fail with an invalid OTP, which is expected)
      console.log('\n2. Verifying with invalid OTP (should fail)');
      const fakeOTP = '123456';
      
      try {
        const verifyResponse = await fetch(`${BASE_URL}/auth/email-otp`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: testEmail, otp: fakeOTP }),
        });
        
        const verifyResult = await verifyResponse.json();
        console.log('Status:', verifyResponse.status);
        console.log('Response:', verifyResult);
      } catch (error) {
        console.error('Error verifying OTP:', error.message);
      }
    }
  } catch (error) {
    console.error('Error sending OTP:', error.message);
  }
}

// Test phone OTP endpoints
async function testPhoneOTP() {
  console.log('\n===== Testing Phone OTP API =====');
  
  // Test phone number for OTP
  const testPhone = '+1234567890';
  
  // 1. Send OTP
  console.log('\n1. Sending OTP to', testPhone);
  try {
    const sendResponse = await fetch(`${BASE_URL}/auth/phone-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber: testPhone }),
    });
    
    const sendResult = await sendResponse.json();
    console.log('Status:', sendResponse.status);
    console.log('Response:', sendResult);
    
    // If successful, proceed to verify with the OTP provided in demo mode
    if (sendResult.success && sendResult.message.includes('Demo: OTP is')) {
      // Extract OTP from the demo message
      const otpMatch = sendResult.message.match(/Demo: OTP is (\d{6})/);
      if (otpMatch) {
        const demoOTP = otpMatch[1];
        
        // 2. Verify OTP
        console.log('\n2. Verifying with demo OTP:', demoOTP);
        
        try {
          const verifyResponse = await fetch(`${BASE_URL}/auth/phone-otp`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              phoneNumber: testPhone, 
              otp: demoOTP,
              sessionInfo: sendResult.sessionInfo 
            }),
          });
          
          const verifyResult = await verifyResponse.json();
          console.log('Status:', verifyResponse.status);
          console.log('Response:', verifyResult);
        } catch (error) {
          console.error('Error verifying phone OTP:', error.message);
        }
      }
    }
  } catch (error) {
    console.error('Error sending phone OTP:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests...');
  
  await testEmailOTP();
  await testPhoneOTP();
  
  console.log('\nTests completed!');
  console.log('\nAPI Endpoints for Postman Testing:');
  console.log('1. Send Email OTP: POST', `${BASE_URL}/auth/email-otp`);
  console.log('   Body: { "email": "your-email@example.com" }');
  console.log('2. Verify Email OTP: PUT', `${BASE_URL}/auth/email-otp`);
  console.log('   Body: { "email": "your-email@example.com", "otp": "123456" }');
  console.log('3. Send Phone OTP: POST', `${BASE_URL}/auth/phone-otp`);
  console.log('   Body: { "phoneNumber": "+1234567890" }');
  console.log('4. Verify Phone OTP: PUT', `${BASE_URL}/auth/phone-otp`);
  console.log('   Body: { "phoneNumber": "+1234567890", "otp": "123456", "sessionInfo": "session_info" }');
}

runTests();