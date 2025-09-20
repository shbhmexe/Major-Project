import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User';
import emailService from '@/lib/emailService';

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
    
    let welcomeEmailSent = false;
    
    if (existingUser) {
      // Update existing user
      const updateData = {};
      if (displayName) updateData.displayName = displayName;
      if (authMethod) updateData.authMethod = authMethod;
      if (role) updateData.role = role;
      if (profileComplete !== undefined) updateData.profileComplete = profileComplete;
      
      user = await User.update(db, existingUser._id, updateData);
      
      // Send welcome email to existing users too (on every login/signup)
      if (email) {
        try {
          await emailService.sendWelcomeEmail(email, displayName || existingUser.displayName);
          welcomeEmailSent = true;
          console.log(`Welcome email sent to existing user: ${email}`);
        } catch (emailError) {
          console.error(`Failed to send welcome email to ${email}:`, emailError.message);
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'User updated successfully',
        user,
        isNewUser: false,
        welcomeEmailSent
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
      
      // Send welcome email for new users (only if email is provided)
      if (email) {
        try {
          await emailService.sendWelcomeEmail(email, displayName);
          welcomeEmailSent = true;
          console.log(`Welcome email sent to new user: ${email}`);
        } catch (emailError) {
          // Log the error but don't fail user creation
          console.error(`Failed to send welcome email to ${email}:`, emailError.message);
          // We don't return error here because user creation should succeed even if email fails
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'User created successfully',
        user,
        isNewUser: true,
        welcomeEmailSent
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