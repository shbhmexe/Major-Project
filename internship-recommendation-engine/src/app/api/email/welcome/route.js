import { NextResponse } from 'next/server';
import emailService from '@/lib/emailService';

/**
 * Send welcome email to new users
 * POST /api/email/welcome
 * 
 * Body: {
 *   email: string (required),
 *   name?: string (optional, will use email prefix if not provided),
 *   skipCheck?: boolean (optional, skip duplicate check for testing)
 * }
 */
export async function POST(request) {
  try {
    const { email, name, skipCheck = false, force = false } = await request.json();
    
    // Validate email
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email is required' 
      }, { status: 400 });
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 });
    }
    
    // Rate limiting check (optional, can be bypassed for testing)
    if (!skipCheck) {
      // You can implement rate limiting here if needed
      // For now, we'll just log the attempt
      console.log(`Welcome email requested for: ${email}`);
    }
    
    // Send welcome email
    const result = await emailService.sendWelcomeEmail(email, name, { force });
    
    console.log(`Welcome email sent successfully to ${email}`);
    
    return NextResponse.json({
      success: true,
      message: result.message,
      email: email,
      messageId: result.messageId,
      skipped: result.skipped || false
    });
    
  } catch (error) {
    console.error('Error in welcome email API:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json({
      success: false,
      message: 'Failed to send welcome email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

/**
 * Test endpoint to check email service status
 * GET /api/email/welcome
 */
export async function GET(request) {
  try {
    // Verify email service is working
    const isReady = await emailService.verifyTransporter();
    
    return NextResponse.json({
      success: true,
      status: isReady ? 'ready' : 'unavailable',
      message: isReady 
        ? 'Email service is ready to send welcome emails' 
        : 'Email service is currently unavailable',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error checking email service status:', error);
    
    return NextResponse.json({
      success: false,
      status: 'error',
      message: 'Failed to check email service status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}