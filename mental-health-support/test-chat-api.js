// Simple test script to verify the chat API is working
const testChatAPI = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hey there! How are you?',
        responseStyle: 'supportive'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Chat API is working!');
    console.log('Response:', data.response);
    return true;
  } catch (error) {
    console.error('❌ Chat API failed:', error.message);
    return false;
  }
};

// Run the test
testChatAPI();