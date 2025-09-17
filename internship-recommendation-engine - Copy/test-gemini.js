// Test script for Google Gemini API
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Access your API key directly for testing
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// For text-only input
async function runTextOnly() {
  console.log('Testing text-only generation...');
  try {
    // For text-only input, use the gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Write a short poem about internships');
    const response = result.response;
    const text = response.text();
    
    console.log('Text generation result:', text);
    return text;
  } catch (error) {
    console.error('Error in text generation:', error);
    throw error;
  }
}

// Run the test
runTextOnly().then(() => {
  console.log('Test completed');
}).catch(err => {
  console.error('Test failed:', err);
});