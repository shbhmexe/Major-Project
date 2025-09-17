import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User';

/**
 * Create or update a user in MongoDB
 */
export async function POST(request) {
  try {
    const { email, phoneNumber, displayName, authMethod, role, profileComplete } = await request.json();
    
    // Validate required fields
    if (!email && !phoneNumber) {
      return NextResponse.json({ 
        success: false, 
        message: 'Either email or phone number is required' 
      }, { status: 400 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Ensure indexes are created
    await User.createIndexes(db);
    
    // Check if user already exists
    let existingUser = null;
    if (email) {
      existingUser = await User.findByEmail(db, email);
    } else if (phoneNumber) {
      existingUser = await User.findByPhone(db, phoneNumber);
    }
    
    let user;
    
    if (existingUser) {
      // Update existing user
      const updateData = {};
      if (displayName) updateData.displayName = displayName;
      if (authMethod) updateData.authMethod = authMethod;
      if (role) updateData.role = role;
      if (profileComplete !== undefined) updateData.profileComplete = profileComplete;
      
      user = await User.update(db, existingUser._id, updateData);
      
      return NextResponse.json({ 
        success: true, 
        message: 'User updated successfully',
        user,
        isNewUser: false
      });
    } else {
      // Create new user
      user = await User.create(db, {
        email,
        phoneNumber,
        displayName,
        authMethod,
        role,
        profileComplete
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'User created successfully',
        user,
        isNewUser: true
      });
    }
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'An error occurred while processing your request' 
    }, { status: 500 });
  }
}

/**
 * Get user by email or phone
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phoneNumber = searchParams.get('phoneNumber');
    
    if (!email && !phoneNumber) {
      return NextResponse.json({ 
        success: false, 
        message: 'Either email or phone number is required' 
      }, { status: 400 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Find user
    let user = null;
    if (email) {
      user = await User.findByEmail(db, email);
    } else if (phoneNumber) {
      user = await User.findByPhone(db, phoneNumber);
    }
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'An error occurred while processing your request' 
    }, { status: 500 });
  }
}