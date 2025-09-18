import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await dbConnect();
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    
    return NextResponse.json({
      exists: !!existingUser,
      user: existingUser ? {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      } : null
    });
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}