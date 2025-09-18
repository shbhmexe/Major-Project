import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { name, email, googleId } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await dbConnect();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: true,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
        message: 'User already exists'
      });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      googleId,
      provider: 'google',
      emailVerified: true, // Google emails are already verified
    });
    
    // Send welcome email asynchronously (don't block the response)
    sendWelcomeEmail(user.name, user.email)
      .then((result) => {
        if (result.success) {
          console.log('🎉 Welcome email sent successfully!');
          console.log('📧 Recipient:', user.email);
          console.log('📬 Message ID:', result.messageId);
          console.log('🎆 User:', user.name, 'has been welcomed to SukoonU!');
        } else {
          console.log('⚠️ Welcome email could not be sent');
          console.log('📧 Intended recipient:', user.email);
          console.log('❌ Reason:', result.message || result.error);
          console.log('📝 Note: User account created successfully despite email failure');
        }
      })
      .catch((emailError) => {
        console.error('🚨 Welcome email system error:');
        console.error('📧 Intended recipient:', user.email);
        console.error('❌ Error details:', emailError.message || emailError);
        console.log('📝 Note: User account created successfully despite email system error');
      });
    
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}