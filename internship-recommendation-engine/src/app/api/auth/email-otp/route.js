import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory OTP storage (in production, use a database or Redis)
const otpStore = new Map();

// OTP expiration time in milliseconds (5 minutes)
const OTP_EXPIRY = 5 * 60 * 1000;

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
  tls: {
    // Do not fail on invalid certificates for testing
    rejectUnauthorized: false
  }
});

// Verify transporter connection
const verifyTransporter = async () => {
  return new Promise((resolve) => {
    transporter.verify((error) => {
      if (error) {
        console.error('SMTP connection error:', error);
        resolve(false);
      } else {
        console.log('SMTP server is ready to send emails');
        resolve(true);
      }
    });
  });
};

// Send OTP via email
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP for Internship Recommendation Engine',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #6d28d9;">Internship Recommendation Engine</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for authentication is:</p>
        <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <p>Thank you,<br>Internship Recommendation Engine Team</p>
      </div>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info);
      }
    });
  });
}

// Generate and send OTP
export async function POST(request) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
    }
    
    // Check if SMTP server is ready
    const isTransporterReady = await verifyTransporter();
    if (!isTransporterReady) {
      return NextResponse.json({ success: false, message: 'Email service is currently unavailable. Please try again later.' }, { status: 503 });
    }
    
    // Check if OTP was recently sent (rate limiting)
    const existingOTP = otpStore.get(email);
    if (existingOTP && (Date.now() - (existingOTP.lastSent || 0) < 60000)) { // 1 minute cooldown
      return NextResponse.json({ 
        success: false, 
        message: 'Please wait before requesting another OTP', 
        retryAfter: 60 - Math.floor((Date.now() - existingOTP.lastSent) / 1000)
      }, { status: 429 });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiry time
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY,
      attempts: 0,
      lastSent: Date.now()
    });
    
    // Send OTP via email
    await sendOTPEmail(email, otp);
    
    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully to ' + email,
      expiresIn: Math.floor(OTP_EXPIRY / 1000) // seconds
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to send OTP. Please try again later.' 
    }, { status: 500 });
  }
}

// Verify OTP
export async function PUT(request) {
  try {
    const { email, otp } = await request.json();
    console.log('Verifying OTP for email:', email, 'OTP:', otp);
    
    // Validate inputs
    if (!email || !otp) {
      console.log('Missing email or OTP');
      return NextResponse.json({ success: false, message: 'Email and OTP are required' }, { status: 400 });
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.log('Invalid email format');
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
    }
    
    if (!otp.match(/^\d{6}$/)) {
      console.log('Invalid OTP format');
      return NextResponse.json({ success: false, message: 'OTP must be a 6-digit number' }, { status: 400 });
    }
    
    // Check if OTP exists for the email
    if (!otpStore.has(email)) {
      console.log('No OTP found for email:', email);
      return NextResponse.json({ 
        success: false, 
        message: 'No OTP found for this email. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    const otpData = otpStore.get(email);
    console.log('Stored OTP data:', otpData);
    
    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      console.log('OTP expired');
      otpStore.delete(email);
      return NextResponse.json({ 
        success: false, 
        message: 'OTP has expired. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    // Increment attempt counter
    otpData.attempts += 1;
    console.log('Attempt count:', otpData.attempts);
    
    // Check if max attempts reached (3 attempts)
    if (otpData.attempts > 3) {
      console.log('Too many failed attempts');
      otpStore.delete(email);
      return NextResponse.json({ 
        success: false, 
        message: 'Too many failed attempts. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    // Verify OTP
    if (otpData.otp !== otp) {
      console.log('Invalid OTP provided');
      // Update the store with the new attempt count
      otpStore.set(email, otpData);
      
      return NextResponse.json({ 
        success: false, 
        message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.` 
      }, { status: 400 });
    }
    
    // OTP verified successfully, remove from store
    otpStore.delete(email);
    console.log('OTP verified successfully');
    
    return NextResponse.json({ 
        success: true, 
        message: 'OTP verified successfully. You are now logged in.' 
      });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to verify OTP. Please try again later.' 
    }, { status: 500 });
  }
}
