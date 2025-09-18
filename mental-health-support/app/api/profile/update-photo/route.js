import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { uploadImage } from '../../../../lib/cloudinary';

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
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }
    
    // Convert file to base64 for Cloudinary upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResult = await uploadImage(base64, 'mental-health-support/profile-photos');
    
    if (!uploadResult.success) {
      return NextResponse.json({ 
        error: 'Failed to upload image: ' + uploadResult.error 
      }, { status: 500 });
    }
    
    // Update user profile in database
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Store the old photo to potentially delete it later
    const oldProfilePhoto = user.profilePhoto;
    
    // Update user with new photo URL
    user.profilePhoto = uploadResult.url;
    user.profilePhotoPublicId = uploadResult.publicId;
    await user.save();
    
    // Optional: Delete old photo from Cloudinary if it exists
    // (You can uncomment this if you want to clean up old photos)
    // if (oldProfilePhoto && user.profilePhotoPublicId) {
    //   await deleteImage(user.profilePhotoPublicId);
    // }
    
    return NextResponse.json({ 
      success: true, 
      profilePhoto: uploadResult.url,
      message: 'Profile photo updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}