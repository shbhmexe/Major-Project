import { NextResponse } from 'next/server';
import emailService from '@/lib/emailService';

/**
 * Test email functionality
 * POST /api/test/email
 * 
 * This endpoint is for testing email functionality during development.
 * It should be disabled or removed in production for security.
 * 
 * Body: {
 *   type: 'welcome' | 'otp' | 'status',
 *   email?: string (required for welcome/otp tests),
 *   name?: string (optional, for welcome emails),
 *   otp?: string (required for OTP tests)
 * }
 */
export async function POST(request) {
  // Only allow in development/testing environment
  if (process.env.NODE_ENV === 'production' && !process.env.ENABLE_EMAIL_TESTING) {
    return NextResponse.json({
      success: false,
      message: 'Email testing is disabled in production'
    }, { status: 403 });
  }

  try {
    const { type, email, name, otp } = await request.json();
    
    if (!type) {
      return NextResponse.json({
        success: false,
        message: 'Test type is required (welcome, otp, or status)'
      }, { status: 400 });
    }

    let result;
    
    switch (type) {
      case 'status':
        // Test SMTP connection
        const isReady = await emailService.verifyTransporter();
        result = {
          success: true,
          status: isReady ? 'ready' : 'unavailable',
          message: isReady 
            ? 'Email service is ready' 
            : 'Email service is unavailable',
          config: {
            host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 587,
            from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
            hasAuth: !!(process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD)
          }
        };
        break;
        
      case 'welcome':
        if (!email) {
          return NextResponse.json({
            success: false,
            message: 'Email is required for welcome email test'
          }, { status: 400 });
        }
        
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return NextResponse.json({
            success: false,
            message: 'Invalid email format'
          }, { status: 400 });
        }
        
        const welcomeResult = await emailService.sendWelcomeEmail(email, name);
        result = {
          success: true,
          message: `Welcome email test sent to ${email}`,
          details: welcomeResult,
          timestamp: new Date().toISOString()
        };
        break;
        
      case 'otp':
        if (!email || !otp) {
          return NextResponse.json({
            success: false,
            message: 'Email and OTP are required for OTP email test'
          }, { status: 400 });
        }
        
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return NextResponse.json({
            success: false,
            message: 'Invalid email format'
          }, { status: 400 });
        }
        
        const otpResult = await emailService.sendOTPEmail(email, otp);
        result = {
          success: true,
          message: `OTP email test sent to ${email}`,
          details: otpResult,
          timestamp: new Date().toISOString()
        };
        break;
        
      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid test type. Use: welcome, otp, or status'
        }, { status: 400 });
    }
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error in email test API:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Email test failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * Get email test status and configuration
 * GET /api/test/email
 */
export async function GET(request) {
  // Only allow in development/testing environment
  if (process.env.NODE_ENV === 'production' && !process.env.ENABLE_EMAIL_TESTING) {
    return NextResponse.json({
      success: false,
      message: 'Email testing is disabled in production'
    }, { status: 403 });
  }

  try {
    const isReady = await emailService.verifyTransporter();
    
    return NextResponse.json({
      success: true,
      emailService: {
        status: isReady ? 'ready' : 'unavailable',
        timestamp: new Date().toISOString()
      },
      config: {
        host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME || 'not-configured',
        hasCredentials: !!(process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD),
        environment: process.env.NODE_ENV
      },
      availableTests: [
        {
          type: 'status',
          description: 'Check SMTP connection status',
          method: 'POST',
          body: { type: 'status' }
        },
        {
          type: 'welcome',
          description: 'Send test welcome email',
          method: 'POST',
          body: { type: 'welcome', email: 'test@example.com', name: 'Test User' }
        },
        {
          type: 'otp',
          description: 'Send test OTP email',
          method: 'POST',
          body: { type: 'otp', email: 'test@example.com', otp: '123456' }
        }
      ]
    });
    
  } catch (error) {
    console.error('Error getting email test status:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to get email test status',
      error: error.message
    }, { status: 500 });
  }
}