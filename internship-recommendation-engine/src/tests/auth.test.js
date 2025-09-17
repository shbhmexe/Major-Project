// Authentication API Tests

const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

// Mock environment variables
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
process.env.EMAIL_SERVER = process.env.EMAIL_SERVER || 'smtp.gmail.com';
process.env.EMAIL_PORT = process.env.EMAIL_PORT || '587';
process.env.EMAIL_USERNAME = process.env.EMAIL_USERNAME || 'test@gmail.com';
process.env.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'test-password';
process.env.EMAIL_FROM = process.env.EMAIL_FROM || 'test@gmail.com';

// Base URL for API endpoints
const BASE_URL = 'http://localhost:3000';

// Test data
const testEmail = 'test@example.com';
const testPhone = '+919876543210';

// MongoDB connection
let client;
let db;

beforeAll(async () => {
  // Connect to MongoDB
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db();
  
  // Clear test data
  await db.collection('users').deleteMany({ 
    $or: [
      { email: testEmail },
      { phoneNumber: testPhone }
    ]
  });
});

afterAll(async () => {
  // Clean up test data
  await db.collection('users').deleteMany({ 
    $or: [
      { email: testEmail },
      { phoneNumber: testPhone }
    ]
  });
  
  // Close MongoDB connection
  await client.close();
});

describe('Email OTP API', () => {
  let otpCode;
  
  it('should send OTP to email', async () => {
    // This test will mock the email sending
    // In a real test, you would use a test email service
    
    const response = await fetch(`${BASE_URL}/api/auth/email-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('OTP sent');
    
    // Get the OTP from the database or in-memory store for testing
    // This is a mock implementation - in a real test, you would need to access the OTP
    // from wherever it's stored (database, in-memory, etc.)
    const otpRecord = await db.collection('otps').findOne({ email: testEmail });
    otpCode = otpRecord ? otpRecord.otp : '123456'; // Fallback for testing
  });
  
  it('should verify email OTP', async () => {
    // Skip if we don't have an OTP code
    if (!otpCode) {
      console.log('Skipping OTP verification test - no OTP available');
      return;
    }
    
    const response = await fetch(`${BASE_URL}/api/auth/email-otp`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: testEmail,
        otp: otpCode
      }),
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    
    // Verify user was created in MongoDB
    const user = await db.collection('users').findOne({ email: testEmail });
    expect(user).not.toBeNull();
    expect(user.email).toBe(testEmail);
  });
});

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        displayName: 'Test User',
        authMethod: 'email',
        role: 'candidate',
        profileComplete: false
      }),
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe(testEmail);
    expect(data.isNewUser).toBe(true);
  });
  
  it('should update an existing user', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        displayName: 'Updated Test User',
        profileComplete: true
      }),
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user).toBeDefined();
    expect(data.user.displayName).toBe('Updated Test User');
    expect(data.user.profileComplete).toBe(true);
    expect(data.isNewUser).toBe(false);
  });
  
  it('should get a user by email', async () => {
    const response = await fetch(`${BASE_URL}/api/auth/user?email=${testEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe(testEmail);
  });
});