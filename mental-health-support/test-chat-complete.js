const http = require('http');

// Simulate a complete chat conversation test
async function testChatComplete() {
  console.log('🧪 Starting complete chat functionality test...\n');

  // Test 1: Direct Gemini API
  console.log('1. Testing Gemini API directly...');
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  require('dotenv').config();
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say hello briefly');
    console.log('   ✅ Gemini direct: WORKING');
    console.log('   Response:', result.response.text());
  } catch (error) {
    console.log('   ❌ Gemini direct: FAILED');
    console.log('   Error:', error.message);
  }

  // Test 2: Chat API endpoint
  console.log('\n2. Testing Chat API endpoint...');
  
  return new Promise((resolve) => {
    const data = JSON.stringify({
      message: "I'm feeling stressed about my studies. Can you help?",
      responseStyle: "supportive"
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const response = JSON.parse(body);
            if (response.response) {
              console.log('   ✅ Chat API: WORKING');
              console.log('   AI Response:', response.response.substring(0, 100) + '...');
            } else {
              console.log('   ❌ Chat API: No response in body');
            }
          } else {
            console.log('   ❌ Chat API: HTTP', res.statusCode);
            console.log('   Response:', body);
          }
        } catch (error) {
          console.log('   ❌ Chat API: Parse error');
          console.log('   Raw response:', body);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log('   ❌ Chat API: Connection failed');
      console.log('   Error:', e.message);
      resolve();
    });

    req.write(data);
    req.end();
  });
}

// Run the complete test
testChatComplete().then(() => {
  console.log('\n🎯 Test completed!');
  console.log('\nIf Chat API is working, then:');
  console.log('✓ Your Gemini integration is correct');
  console.log('✓ Your API route is properly configured'); 
  console.log('✓ The AI chat feature should work in your application');
  console.log('\nTo test in browser:');
  console.log('1. Go to http://localhost:3000/chat');
  console.log('2. Login with Google');
  console.log('3. Type a message and send');
});