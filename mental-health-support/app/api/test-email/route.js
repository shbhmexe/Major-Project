import { NextResponse } from 'next/server';
import { sendWelcomeEmail, testEmailConnection } from '@/lib/email';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const action = searchParams.get('action') || 'test';
    
    if (action === 'connection') {
      // Test SMTP connection
      const result = await testEmailConnection();
      return NextResponse.json(result);
    }
    
    if (action === 'send' && email) {
      // Send test welcome email
      const result = await sendWelcomeEmail('Test User', email);
      return NextResponse.json(result);
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid parameters. Use ?action=connection or ?action=send&email=test@example.com'
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email, name, action } = await request.json();
    
    if (action === 'connection') {
      const result = await testEmailConnection();
      return NextResponse.json(result);
    }
    
    if (action === 'send' && email) {
      const userName = name || 'Test User';
      const result = await sendWelcomeEmail(userName, email);
      return NextResponse.json(result);
    }
    
    return NextResponse.json({
      success: false,
      message: 'Missing required parameters: email and action'
    }, { status: 400 });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}