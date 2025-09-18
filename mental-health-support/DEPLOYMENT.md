# Deployment Guide - Mental Health Support Platform

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Environment Variables

Make sure you have all these environment variables ready:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mental-health-support?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Email (Required for welcome emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password

# AI Features (Optional)
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set environment variables in project settings
5. Deploy!

#### Option B: Via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add SMTP_USER
vercel env add SMTP_PASS
# ... add all other variables

# Redeploy with new environment variables
vercel --prod
```

### Step 3: Post-Deployment Setup

1. **Update NEXTAUTH_URL**: Set it to your actual Vercel domain
2. **Test Email**: Visit `https://your-domain.vercel.app/api/test-email?action=connection`
3. **Test Signup**: Create a test account to verify welcome emails work

## 🔧 Environment Variables Setup Guide

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create database user with read/write permissions
4. Get connection string and replace `<username>`, `<password>`, `<database>`

### Gmail SMTP Setup
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account Settings > Security > 2-Step Verification > App Passwords
3. Generate app password for "Mail"
4. Use this 16-character password as `SMTP_PASS`

### Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins

### Generate Secrets
```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

## 🧪 Testing Deployment

### Test Email Functionality
```bash
# Test SMTP connection
curl https://your-domain.vercel.app/api/test-email?action=connection

# Send test email
curl -X POST https://your-domain.vercel.app/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"action":"send","email":"test@example.com","name":"Test User"}'
```

### Test Authentication
1. Visit `/signup` and create test account
2. Check if welcome email arrives
3. Try logging in with created account
4. Test Google OAuth (if configured)

## 🔍 Troubleshooting

### Build Failures
- Check all required environment variables are set
- Ensure MongoDB connection string is correct
- Verify all dependencies are in package.json

### Email Issues
- Confirm SMTP credentials are correct
- Check if 2FA is enabled on Gmail
- Verify app password is used (not regular password)
- Test connection: `/api/test-email?action=connection`

### Database Connection Issues
- Check MongoDB Atlas network access (IP whitelist)
- Verify database user permissions
- Ensure connection string format is correct

### Authentication Problems
- Check NEXTAUTH_URL matches your deployed domain
- Verify JWT_SECRET and NEXTAUTH_SECRET are set
- For Google OAuth: confirm redirect URIs are configured

## 📊 Performance Optimization

### For Production
- Environment variables are already optimized for production
- Build process includes static optimization
- API routes are serverless functions
- Images are automatically optimized by Next.js

### Monitoring
- Check Vercel function logs for errors
- Monitor email delivery success rates
- Set up database connection monitoring

## 🔒 Security Checklist

- ✅ All passwords and secrets are environment variables
- ✅ JWT tokens have expiration times
- ✅ Passwords are hashed with bcrypt
- ✅ CORS headers are properly configured
- ✅ Database connection uses SSL
- ✅ Email passwords use app-specific passwords

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Test individual components using provided test endpoints
4. Check environment variable configuration

---

**Deployment Time:** ~5-10 minutes  
**Prerequisites:** GitHub repo, Vercel account, MongoDB Atlas account  
**Cost:** Free tier available for all services