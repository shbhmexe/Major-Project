import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Conversation from '@/models/Conversation';

// GET handler to retrieve conversations for a user
export async function GET(request) {
  try {
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const guestId = searchParams.get('guestId');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Build query based on available parameters
    const query = {};
    if (userId) query.userId = userId;
    if (guestId) query.guestId = guestId;
    
    // Fetch conversations
    const conversations = await Conversation.find(query)
      .sort({ updatedAt: -1 }) // Most recent first
      .limit(limit);
    
    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

// POST handler to create a new conversation
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { userId, guestId, messages, title } = body;
    
    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }
    
    // Either userId or guestId must be provided
    if (!userId && !guestId) {
      return NextResponse.json({ error: 'Either userId or guestId is required' }, { status: 400 });
    }
    
    // Create new conversation
    const conversation = new Conversation({
      userId,
      guestId,
      messages,
      title: title || 'New Conversation'
    });
    
    await conversation.save();
    
    return NextResponse.json({ conversation }, { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}