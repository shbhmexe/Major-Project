import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserPreference from '@/models/UserPreference';

// GET /api/preferences - Get user preferences
export async function GET(request) {
  try {
    await dbConnect();
    
    // Get userId or guestId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const guestId = searchParams.get('guestId');
    
    // Return default preferences even if userId or guestId is not provided
    // This fixes the 400 error when the user is not authenticated yet
    
    // Build query
    const query = {};
    if (userId) query.userId = userId;
    if (guestId) query.guestId = guestId;
    
    // Find user preferences
    const preferences = await UserPreference.findOne(query);
    
    // If no preferences found, return default preferences
    if (!preferences) {
      const defaultPreferences = {
        theme: 'system',
        fontSize: 'medium',
        aiResponseStyle: 'supportive',
        language: 'en',
        notificationsEnabled: true,
        soundEnabled: true
      };
      
      return NextResponse.json({ preferences: defaultPreferences });
    }
    
    return NextResponse.json({ preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

// POST /api/preferences - Create or update user preferences
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { userId, guestId, ...preferencesData } = body;
    
    if (!userId && !guestId) {
      return NextResponse.json(
        { error: 'Either userId or guestId is required' },
        { status: 400 }
      );
    }
    
    // Build query and update data
    const query = {};
    const updateData = { ...preferencesData };
    
    if (userId) {
      query.userId = userId;
      updateData.userId = userId;
    }
    
    if (guestId) {
      query.guestId = guestId;
      updateData.guestId = guestId;
    }
    
    // Update or create preferences
    const preferences = await UserPreference.findOneAndUpdate(
      query,
      updateData,
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json({ preferences });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}