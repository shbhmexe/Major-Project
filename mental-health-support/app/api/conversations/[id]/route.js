import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Conversation from '@/models/Conversation';

// GET handler to retrieve a specific conversation
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    const conversation = await Conversation.findById(id);
    
    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }
    
    return NextResponse.json({ conversation }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 });
  }
}

// PATCH handler to update a conversation (add messages)
export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
    const { messages, title } = body;
    
    // Find the conversation
    const conversation = await Conversation.findById(id);
    
    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }
    
    // Update fields if provided
    if (messages && Array.isArray(messages)) {
      conversation.messages.push(...messages);
    }
    
    if (title) {
      conversation.title = title;
    }
    
    // Save the updated conversation
    await conversation.save();
    
    return NextResponse.json({ conversation }, { status: 200 });
  } catch (error) {
    console.error('Error updating conversation:', error);
    return NextResponse.json({ error: 'Failed to update conversation' }, { status: 500 });
  }
}

// DELETE handler to delete a conversation
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    const result = await Conversation.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Conversation deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 });
  }
}