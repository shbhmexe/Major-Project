import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { NoteModel, UserModel } from './db';
import { authenticateJwt, signJwt } from './auth';
import { generateOtp, verifyOtp } from './otp';
import { verifyGoogleIdToken } from './google';

const router = Router();

router.post('/auth/request-otp', async (req, res) => {
  try {
    console.log('\n🔐 OTP REQUEST RECEIVED');
    console.log('📧 Email:', req.body.email);
    console.log('⏰ Time:', new Date().toLocaleString());
    console.log('----------------------------------------');
    
    const schema = z.object({ email: z.string().email('Please provide a valid email address') });
    const { email } = schema.parse(req.body);
    
    const code = generateOtp(email);
    
    console.log('✅ OTP GENERATED SUCCESSFULLY');
    console.log('🔢 OTP Code:', code);
    console.log('📱 Send this OTP to user');
    console.log('----------------------------------------\n');
    
    // In production, send via email provider. Here we return for testing.
    return res.json({ message: 'OTP sent', otp: code });
  } catch (error) {
    console.error('❌ OTP REQUEST FAILED');
    console.error('Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors,
        receivedBody: req.body 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/auth/signup-email', async (req, res) => {
  try {
    const schema = z.object({ 
      email: z.string().email('Please provide a valid email address'), 
      password: z.string().min(6, 'Password must be at least 6 characters'), 
      otp: z.string().length(6, 'OTP must be exactly 6 characters') 
    });
    const { email, password, otp } = schema.parse(req.body);
    if (!verifyOtp(email, otp)) return res.status(400).json({ error: 'Invalid OTP' });
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, passwordHash, provider: 'email' });
    const token = signJwt({ userId: String(user._id), email: user.email, provider: 'email' });
    return res.json({ token, user: { email: user.email, name: user.name || '' } });
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors,
        receivedBody: req.body 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/auth/login-email', async (req, res) => {
  try {
    const schema = z.object({ 
      email: z.string().email('Please provide a valid email address'), 
      password: z.string().min(6, 'Password must be at least 6 characters') 
    });
    const { email, password } = schema.parse(req.body);
    const user = await UserModel.findOne({ email, provider: 'email' });
    if (!user || !user.passwordHash) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = signJwt({ userId: String(user._id), email: user.email, provider: 'email' });
    return res.json({ token, user: { email: user.email, name: user.name || '' } });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors,
        receivedBody: req.body 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/auth/login-otp', async (req, res) => {
  try {
    const schema = z.object({ 
      email: z.string().email('Please provide a valid email address'), 
      otp: z.string().length(6, 'OTP must be exactly 6 characters') 
    });
    const { email, otp } = schema.parse(req.body);
    if (!verifyOtp(email, otp)) return res.status(400).json({ error: 'Invalid OTP' });
    let user = await UserModel.findOne({ email });
    if (!user) user = await UserModel.create({ email, provider: 'email' });
    const token = signJwt({ userId: String(user._id), email: user.email, provider: 'email' });
    return res.json({ token, user: { email: user.email, name: user.name || '' } });
  } catch (error) {
    console.error('OTP login error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors,
        receivedBody: req.body 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/auth/google', async (req, res) => {
  try {
    const schema = z.object({ idToken: z.string() });
    const { idToken } = schema.parse(req.body);
    const profile = await verifyGoogleIdToken(idToken);
    let user = await UserModel.findOne({ email: profile.email });
    if (!user) {
      user = await UserModel.create({ email: profile.email, name: profile.name, provider: 'google', avatarUrl: profile.picture });
    }
    if (user.provider !== 'google') return res.status(400).json({ error: 'Use email login for this account' });
    const token = signJwt({ userId: String(user._id), email: user.email, provider: 'google' });
    return res.json({ token, user: { email: user.email, name: user.name || '' } });
  } catch (error) {
    console.error('Google auth error:', error);
    return res.status(500).json({ error: 'Google authentication failed' });
  }
});

router.get('/notes', authenticateJwt, async (req, res) => {
  try {
    const userId = (req as any).user.userId as string;
    const notes = await NoteModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.post('/notes', authenticateJwt, async (req, res) => {
  try {
    const schema = z.object({ content: z.string().min(1, 'Note content cannot be empty') });
    const { content } = schema.parse(req.body);
    const userId = (req as any).user.userId as string;
    const note = await NoteModel.create({ userId, content });
    res.status(201).json({ note });
  } catch (error) {
    console.error('Create note error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.delete('/notes/:id', authenticateJwt, async (req, res) => {
  try {
    const userId = (req as any).user.userId as string;
    const id = req.params.id;
    await NoteModel.deleteOne({ _id: id, userId });
    res.json({ success: true });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;

