const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiDirect() {
  try {
    console.log('Testing Gemini API directly...');
    
    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('❌ GEMINI_API_KEY not found in environment variables');
      return;
    }
    
    console.log('✓ API key found:', apiKey.substring(0, 10) + '...');
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('✓ Gemini model initialized');
    
    // Test a simple request
    const prompt = "Say hello in one sentence.";
    console.log('Sending test prompt:', prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API is working!');
    console.log('Response:', text);
    
  } catch (error) {
    console.log('❌ Gemini API failed:');
    console.log('Error:', error.message);
    
    // Check specific error types
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('💡 Solution: Check if your GEMINI_API_KEY is correct');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.log('💡 Solution: Make sure your API key has the right permissions');
    } else if (error.message.includes('MODEL_NOT_FOUND')) {
      console.log('💡 Solution: Check if the model name is correct');
    }
  }
}

testGeminiDirect();