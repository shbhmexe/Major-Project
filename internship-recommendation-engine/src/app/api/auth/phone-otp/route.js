import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
  }
}

// In-memory OTP verification tracking (in production, use a database)
const phoneOtpStore = new Map();

// Send OTP via Firebase Auth (requires client-side reCAPTCHA verification)
export async function POST(request) {
  try {
    const { phoneNumber, recaptchaToken } = await request.json();
    
    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }
    
    // Validate phone number format (basic validation)
    if (!phoneNumber.match(/^\+[1-9]\d{10,14}$/)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid phone number format. Please use international format (e.g., +1234567890)' 
      }, { status: 400 });
    }

    // For demo purposes, we'll generate a simple OTP
    // In production with Firebase Auth Phone, this would be handled by Firebase
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

    // Store OTP for verification
    phoneOtpStore.set(phoneNumber, {
      otp,
      expiresAt,
      attempts: 0,
      lastSent: Date.now()
    });

    console.log(`Generated OTP for ${phoneNumber}: ${otp} (Demo mode)`);

    return NextResponse.json({ 
      success: true, 
      message: `OTP sent to ${phoneNumber}. (Demo: OTP is ${otp})`,
      sessionInfo: 'demo_session_' + Date.now(),
      expiresIn: 300 // 5 minutes
    });

  } catch (error) {
    console.error('Error sending phone OTP:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to send OTP. Please try again later.' 
    }, { status: 500 });
  }
}

// Verify phone OTP
export async function PUT(request) {
  try {
    const { phoneNumber, otp, sessionInfo } = await request.json();
    
    // Validate inputs
    if (!phoneNumber || !otp) {
      return NextResponse.json({ success: false, message: 'Phone number and OTP are required' }, { status: 400 });
    }
    
    if (!otp.match(/^\d{6}$/)) {
      return NextResponse.json({ success: false, message: 'OTP must be a 6-digit number' }, { status: 400 });
    }
    
    // Check if OTP exists for the phone number
    if (!phoneOtpStore.has(phoneNumber)) {
      return NextResponse.json({ 
        success: false, 
        message: 'No OTP found for this phone number. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    const otpData = phoneOtpStore.get(phoneNumber);
    
    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      phoneOtpStore.delete(phoneNumber);
      return NextResponse.json({ 
        success: false, 
        message: 'OTP has expired. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    // Increment attempt counter
    otpData.attempts += 1;
    
    // Check if max attempts reached
    if (otpData.attempts > 3) {
      phoneOtpStore.delete(phoneNumber);
      return NextResponse.json({ 
        success: false, 
        message: 'Too many failed attempts. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    // Verify OTP
    if (otpData.otp !== otp) {
      phoneOtpStore.set(phoneNumber, otpData);
      return NextResponse.json({ 
        success: false, 
        message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.` 
      }, { status: 400 });
    }
    
    // OTP verified successfully
    phoneOtpStore.delete(phoneNumber);
    
    // In a real app, you would create a user session or JWT token here
    const authToken = 'demo_auth_token_' + Date.now();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Phone number verified successfully.',
      authToken: authToken,
      user: {
        phoneNumber: phoneNumber,
        verified: true
      }
    });
    
  } catch (error) {
    console.error('Error verifying phone OTP:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to verify OTP. Please try again later.' 
    }, { status: 500 });
  }
}