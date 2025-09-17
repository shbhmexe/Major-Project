import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/nextauth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await request.formData();
    const file = formData.get('profilePhoto');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }
    
    // Generate unique filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = uuidv4() + path.extname(file.name);
    const relativePath = `/uploads/${filename}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure uploads directory exists
    try {
      await writeFile(path.join(uploadDir, filename), buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
    }
    
    // Update user profile in database
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    user.profilePhoto = relativePath;
    await user.save();
    
    return NextResponse.json({ success: true, profilePhoto: relativePath });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}