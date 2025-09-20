require('dotenv').config();
const { sendWelcomeEmail, testEmailConnection } = require('./lib/email');

async function quickEmailTest() {
  console.log('🧪 Quick Email Test\n');
  
  console.log('📋 Environment Variables:');
  console.log('EMAIL_SERVER:', process.env.EMAIL_SERVER);
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('EMAIL_USERNAME:', process.env.EMAIL_USERNAME ? '✓ Set' : '❌ Not set');
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set' : '❌ Not set');
  
  console.log('\n1️⃣ Testing SMTP Connection...');
  try {
    const connectionResult = await testEmailConnection();
    console.log('Result:', connectionResult);
    
    if (connectionResult.success) {
      console.log('\n2️⃣ Testing Welcome Email (New User)...');
      const newUserResult = await sendWelcomeEmail('Test User', 'shubhushukla586@gmail.com', false);
      console.log('Result:', newUserResult);
      
      console.log('\n3️⃣ Testing Welcome Email (Returning User)...');
      const returningUserResult = await sendWelcomeEmail('Test Returning User', 'shubhushukla586@gmail.com', true);
      console.log('Result:', returningUserResult);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

quickEmailTest();