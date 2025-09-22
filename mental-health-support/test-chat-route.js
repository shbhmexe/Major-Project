// Test the chat API route specifically
const http = require('http');

function testChatRoute() {
  console.log('Testing Chat API Route...');
  
  const data = JSON.stringify({
    message: "Hello, I'm feeling stressed about exams",
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
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(body);
        if (res.statusCode === 200 && response.response) {
          console.log('✅ Chat API is working!');
          console.log('AI Response:', response.response);
        } else {
          console.log('❌ Chat API failed');
          console.log('Response body:', body);
        }
      } catch (error) {
        console.log('❌ Failed to parse response');
        console.log('Raw response:', body);
      }
    });
  });

  req.on('error', (e) => {
    console.log('❌ Request failed:', e.message);
    console.log('Make sure the server is running on localhost:3000');
  });

  req.write(data);
  req.end();
}

// Test the route
testChatRoute();