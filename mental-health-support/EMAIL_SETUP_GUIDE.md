# 📧 Email Setup Guide for SukoonU

This guide will help you configure SMTP email functionality to send welcome emails to new users who sign up using Google OAuth.

## 🚀 Quick Start

1. Copy `.env.local.example` to `.env.local`
2. Configure your SMTP settings (see below)
3. Test your setup: `npm run test-email`
4. Done! Welcome emails will be sent automatically 🎉

## 📋 SMTP Configuration Options

### Option 1: Gmail (Recommended) ⭐

Gmail is the easiest to set up and most reliable option.

#### Step-by-step Setup:

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification if not already enabled

2. **Generate App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Update your `.env.local` file:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcdefghijklmnop
   ```

### Option 2: Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Option 3: Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Option 4: Custom SMTP Provider

For services like SendGrid, Mailgun, or custom SMTP servers:

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## 🧪 Testing Your Configuration

### Method 1: Command Line Test (Recommended)

```bash
# Test SMTP connection only
npm run test-email

# Send test email to specific address
npm run test-email your-email@example.com

# Or use the script directly
node scripts/test-email.js your-email@example.com
```

### Method 2: API Test

```bash
# Test connection
curl "http://localhost:3000/api/test-email?action=connection"

# Send test email
curl -X POST "http://localhost:3000/api/test-email" \
  -H "Content-Type: application/json" \
  -d '{"action":"send","email":"test@example.com","name":"Test User"}'
```

## 🔄 How It Works

### Welcome Email Flow

1. **User signs up with Google** → Google OAuth redirects to your app
2. **NextAuth processes the sign-in** → Checks if user exists in database
3. **If new user** → Calls `/api/auth/user/create` endpoint
4. **User created** → Database stores user info
5. **Welcome email sent** → SMTP service sends branded welcome email
6. **User receives email** → Professional welcome message with app features

### Email Template Features

✨ **Professional Design**: Matches SukoonU branding  
🎨 **Responsive HTML**: Works on all devices  
🌐 **Multi-language Ready**: Uses SukoonU color scheme  
📱 **Mobile Friendly**: Optimized for mobile viewing  
🔗 **Call-to-Action**: Direct link back to the app  

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### ❌ "SMTP connection failed"

**Possible causes:**
- Wrong SMTP settings
- Incorrect password
- 2FA not enabled (for Gmail)
- Firewall blocking port 587

**Solutions:**
- Double-check your SMTP settings
- For Gmail: Use app password, not regular password
- Try port 465 with `secure: true` in email.js
- Check firewall settings

#### ❌ "Authentication failed"

**For Gmail:**
- Enable 2-Factor Authentication
- Generate new App Password
- Use the 16-character app password (remove spaces)

**For other providers:**
- Check if SMTP is enabled in your email settings
- Some providers require enabling "Less secure apps"

#### ❌ "Email not received"

**Check these:**
- Spam/junk folder
- Email address spelling
- SMTP user has permission to send emails
- Rate limiting by email provider

#### ❌ "Connection timeout"

**Try these:**
- Use port 465 instead of 587
- Set `secure: true` for port 465
- Check if your hosting provider blocks SMTP ports

### Advanced Configuration

#### Using Different Ports

```javascript
// In lib/email.js - for port 465 (secure)
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

#### Custom Email Templates

The welcome email template is in `lib/email.js`. You can customize:
- Colors and styling
- Email content
- Call-to-action buttons
- Footer information

## 🔐 Security Best Practices

1. **Use App Passwords**: Never use your main email password
2. **Environment Variables**: Store credentials in `.env.local`, not in code
3. **Keep Secrets Secret**: Never commit `.env.local` to version control
4. **Regular Updates**: Rotate app passwords periodically
5. **Monitor Usage**: Check email sending logs regularly

## 📊 Monitoring & Logs

### Server Logs

Welcome email sending is logged with these emojis:
- 🎉 Successfully sent
- ⚠️ Failed to send (with reason)  
- 🚨 System error
- 👋 Returning user (no email sent)

### Example Log Output

```
🎆 New user signing up with Google!
👤 Name: John Doe  
📧 Email: john@example.com
✅ User creation API called successfully
📨 Welcome email should be sent automatically
🎉 Welcome email sent successfully!
📧 Recipient: john@example.com
📬 Message ID: <12345@gmail.com>
🎆 User: John Doe has been welcomed to SukoonU!
```

## 🤝 Need Help?

If you're still having issues:

1. Check the console logs for detailed error messages
2. Run the test script: `node scripts/test-email.js`
3. Verify your `.env.local` configuration
4. Test with a simple email provider like Gmail first
5. Check our troubleshooting section above

## 🎯 Production Recommendations

For production use, consider:

- **Professional Email Service**: SendGrid, Mailgun, or AWS SES
- **Dedicated Domain**: Use a professional sender domain
- **Email Analytics**: Track delivery rates and opens
- **Rate Limiting**: Implement sending limits
- **Backup Provider**: Configure fallback SMTP
- **Monitoring**: Set up alerts for email failures

---

**Happy emailing!** 📨✨

Your users will love the professional welcome experience when they join SukoonU! 🌟