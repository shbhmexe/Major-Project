const { sendWelcomeEmail, testEmailConnection } = require('../lib/email');

// Test function for welcome emails
async function testWelcomeEmails() {
  console.log('🧪 Testing Welcome Email System...\n');

  // Test 1: Check SMTP connection
  console.log('1. Testing SMTP Connection...');
  const connectionResult = await testEmailConnection();
  console.log('   Result:', connectionResult);
  
  if (!connectionResult.success) {
    console.log('❌ SMTP not configured. Please set up your .env.local file with:');
    console.log('   SMTP_HOST=smtp.gmail.com');
    console.log('   SMTP_PORT=587');
    console.log('   SMTP_USER=your-email@gmail.com');
    console.log('   SMTP_PASS=your-app-password');
    return;
  }
  
  console.log('\n2. Testing New User Welcome Email...');
  const newUserResult = await sendWelcomeEmail('Test New User', 'test@example.com', false);
  console.log('   Result:', newUserResult);
  
  console.log('\n3. Testing Returning User Welcome Email...');
  const returningUserResult = await sendWelcomeEmail('Test Returning User', 'test@example.com', true);
  console.log('   Result:', returningUserResult);
  
  console.log('\n✅ Testing completed!');
}

// Run the test
testWelcomeEmails().catch(console.error);