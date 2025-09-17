// Chatbot API Tests

const { describe, it, expect, beforeAll } = require('@jest/globals');
const fetch = require('node-fetch');

// Mock environment variables
process.env.GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY || 'test-api-key';

// Base URL for API endpoints
const BASE_URL = 'http://localhost:3000';

describe('Chatbot API', () => {
  it('should respond to text messages', async () => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What is this platform about?'
      }),
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.content).toBeDefined();
    expect(typeof data.content).toBe('string');
    expect(data.content.length).toBeGreaterThan(0);
  });
  
  it('should handle errors gracefully', async () => {
    // Test with an empty message which should be invalid
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: ''
      }),
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });
  
  it('should only respond to questions about the platform', async () => {
    // Test with an off-topic question
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What is the capital of France?'
      }),
    });
    
    const data = await response.json();
    
    // The API should still return a successful response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    
    // But the content should indicate it can only answer questions about the platform
    expect(data.content).toBeDefined();
    expect(data.content.toLowerCase()).toMatch(/platform|internship|recommendation|cannot answer|only answer/i);
  });
  
  it('should handle image uploads', async () => {
    // This is a mock test since we can't easily upload images in a unit test
    // In a real test, you would use FormData and a real image file
    
    // Mock a base64 image (this is just a tiny 1x1 transparent pixel)
    const mockBase64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What is in this image?',
        image: mockBase64Image
      }),
    });
    
    // We're just checking if the API handles the request without crashing
    // The actual response might vary based on the image processing capabilities
    expect(response.status).toBeLessThan(500); // Not a server error
  });
});