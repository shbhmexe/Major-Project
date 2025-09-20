import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { name, email, isReturningUser = false } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Send welcome email (works for both new and returning users)
    const emailResult = await sendWelcomeEmail(name, email, isReturningUser);
    
    if (emailResult.success) {
      console.log('🎉 Welcome email sent successfully!');
      console.log('📧 Recipient:', email);
      console.log('👤 User:', name);
      console.log('🔄 User type:', isReturningUser ? 'Returning' : 'New');
      console.log('📬 Message ID:', emailResult.messageId);
    } else {
      console.log('⚠️ Welcome email could not be sent');
      console.log('📧 Intended recipient:', email);
      console.log('❌ Reason:', emailResult.message || emailResult.error);
    }
    
    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.message,
      messageId: emailResult.messageId
    });
  } catch (error) {
    console.error('❌ Welcome email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send welcome email' 
      },
      { status: 500 }
    );
  }
}