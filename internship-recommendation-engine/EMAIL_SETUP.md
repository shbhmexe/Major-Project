# Email Setup & Configuration Guide

This guide explains how to set up and configure the email system for InternDisha, including welcome emails and OTP functionality.

## Overview

The email system supports:
- ✅ **Welcome emails** - Automatically sent when new users register
- ✅ **OTP emails** - For authentication (existing functionality preserved)
- ✅ **Reliable delivery** - With retry logic and error handling
- ✅ **Vercel deployment** - Optimized for serverless environments

## Environment Variables

### Required Variables

Add these environment variables to your Vercel project or `.env.local` file:

```env
# SMTP Configuration (Required)
EMAIL_SERVER=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Optional: App URL for email links
NEXT_PUBLIC_APP_URL=https://interndisha.vercel.app

# Optional: Enable email testing in production
ENABLE_EMAIL_TESTING=false
```

### Setting up Gmail SMTP (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Use this password for `EMAIL_PASSWORD`

3. **Alternative SMTP Providers**:
   - **SendGrid**: `smtp.sendgrid.net` (port 587)
   - **Mailgun**: `smtp.mailgun.org` (port 587)
   - **AWS SES**: Your SES SMTP endpoint

### Vercel Deployment

#### Method 1: Vercel Dashboard
1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add each variable:
   - `EMAIL_SERVER`: `smtp.gmail.com`
   - `EMAIL_PORT`: `587`
   - `EMAIL_USERNAME`: `your-email@gmail.com`
   - `EMAIL_PASSWORD`: `your-app-password`
   - `EMAIL_FROM`: `your-email@gmail.com`

#### Method 2: Vercel CLI
```bash
vercel env add EMAIL_SERVER
vercel env add EMAIL_PORT
vercel env add EMAIL_USERNAME
vercel env add EMAIL_PASSWORD
vercel env add EMAIL_FROM
```

## Testing Email Functionality

### Before Deployment

Test locally with your environment variables:

```bash
# Start development server
npm run dev

# Test email service status
curl http://localhost:3000/api/test/email

# Test welcome email (replace with your email)
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "email": "your-test-email@example.com",
    "name": "Test User"
  }'
```

### After Deployment

Test on Vercel (only in development or with `ENABLE_EMAIL_TESTING=true`):

```bash
# Test email service status
curl https://your-app.vercel.app/api/test/email

# Test welcome email
curl -X POST https://your-app.vercel.app/api/test/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "email": "your-test-email@example.com",
    "name": "Test User"
  }'

# Use the automated test script
node test-emails.js https://your-app.vercel.app your-test-email@example.com
```

## API Endpoints

### Welcome Email API
- **Endpoint**: `POST /api/email/welcome`
- **Purpose**: Send welcome emails manually
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "User Name" // optional
  }
  ```

### User Creation (Automatic Welcome)
- **Endpoint**: `POST /api/auth/user`
- **Behavior**: Automatically sends welcome email to ALL users (new and existing)
- **Rate Limiting**: Only sends once per 24 hours per email address
- **Response includes**: `welcomeEmailSent: boolean`
- **Error Handling**: User creation succeeds even if email fails

### Testing API (Development Only)
- **Endpoint**: `GET/POST /api/test/email`
- **Purpose**: Test email functionality
- **Available tests**: status, welcome, otp

## Features

### Welcome Email Features
- 🎨 **Responsive HTML template** with brand colors
- 👤 **Personalized greetings** using user's name
- 🔗 **Dashboard link** to get users started
- 📱 **Mobile-friendly** design
- 🚫 **No interference** with existing OTP system

### Reliability Features
- ⚡ **Retry logic** (3 attempts with exponential backoff)
- 🔄 **Connection verification** before sending
- 📝 **Comprehensive logging** for debugging
- 🛡️ **Graceful error handling** (user creation succeeds even if email fails)

## Security Considerations

1. **Environment Variables**: Never commit email credentials to git
2. **Production Testing**: Disable testing API in production
3. **Rate Limiting**: Consider implementing for welcome emails if needed
4. **SMTP Security**: Use app passwords, not regular passwords

## Troubleshooting

### Common Issues

1. **"SMTP connection error"**
   - Check `EMAIL_SERVER` and `EMAIL_PORT`
   - Verify internet connectivity from Vercel
   - Try different SMTP provider

2. **"Authentication failed"**
   - Use app password, not regular password
   - Check `EMAIL_USERNAME` and `EMAIL_PASSWORD`
   - Enable "Less secure app access" (not recommended)

3. **"Email service unavailable"**
   - Check environment variables are set in Vercel
   - Test with `/api/test/email` endpoint
   - Check Vercel function logs

4. **Emails not received**
   - Check spam folder
   - Verify `EMAIL_FROM` address
   - Test with different email providers

### Debugging Steps

1. **Check environment variables**:
   ```bash
   # In Vercel dashboard or locally
   echo $EMAIL_USERNAME
   ```

2. **Test SMTP connection**:
   ```bash
   curl https://your-app.vercel.app/api/test/email
   ```

3. **Check Vercel function logs**:
   - Go to Vercel Dashboard → Functions
   - Check logs for email-related errors

## Performance Optimization

- ✅ **Singleton email service** - Reuses SMTP connections
- ✅ **Non-blocking** - Email failures don't block user creation
- ✅ **Efficient templates** - Pre-compiled HTML templates
- ✅ **Serverless optimized** - Works well with Vercel functions

## Migration from Existing OTP System

The new email system is **fully backward compatible**:

1. ✅ Existing OTP functionality unchanged
2. ✅ Same SMTP configuration reused
3. ✅ No breaking changes to existing APIs
4. ✅ Welcome emails are additive feature

## Recent Fixes

### v2.0 Updates:
- ✅ **Fixed MongoDB index conflict** - Prevents "IndexKeySpecsConflict" error
- ✅ **Welcome emails for ALL users** - Sends to both new and existing users
- ✅ **Smart rate limiting** - Only sends once per 24 hours per email
- ✅ **Improved error handling** - User creation succeeds even if email fails
- ✅ **Testing script included** - `test-emails.js` for easy testing

## Quick Testing

Run the automated test script:

```bash
# Test locally
node test-emails.js

# Test on Vercel
node test-emails.js https://your-app.vercel.app your-email@example.com
```

## Support

If you encounter issues:

1. Run the test script: `node test-emails.js`
2. Check this documentation
3. Test with the `/api/test/email` endpoint
4. Verify environment variables in Vercel dashboard
5. Check Vercel function logs for specific error messages

---

**Happy emailing! 📧✨**
