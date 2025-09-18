# Mental Health Support Platform

A comprehensive mental health support platform built with Next.js, featuring AI-powered insights, user authentication, and automated email notifications.

## 🌟 Features

- 🧠 **AI-Powered Support**: Personalized mental health insights using Gemini AI
- 🔐 **Secure Authentication**: Email/password and Google OAuth authentication
- 📧 **Welcome Emails**: Automated welcome emails with platform features overview
- 🌙 **Dark Mode**: Built-in dark/light mode toggle
- 📱 **Responsive Design**: Mobile-first responsive design
- 🛡️ **Data Security**: Encrypted passwords and secure JWT tokens
- 🚀 **Production Ready**: Optimized for Vercel deployment

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd mental-health-support
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your configuration:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here

# SMTP Email Configuration (for welcome emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Gemini AI (optional)
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Email Setup (Gmail)

To enable welcome emails:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google App Passwords](https://support.google.com/accounts/answer/185833)
   - Select "Mail" as the app
   - Copy the generated 16-character password
   - Use this as `SMTP_PASS` in your environment variables

### 4. Database Setup

Set up a MongoDB database:

1. **MongoDB Atlas** (Recommended):
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get connection string
   - Replace `<password>` and `<dbname>` in the connection string

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Email Testing

Test your email configuration:

```bash
# Test with default email (SMTP_USER)
npm run test-email

# Test with specific email
npm run test-email recipient@example.com
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint
- `npm run test-email` - Test email configuration
- `npm run clean` - Clean build files

## 🚀 Deployment to Vercel

### Automatic Deployment

1. **Connect to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set Environment Variables** in Vercel dashboard:
   - Go to your project settings
   - Add all environment variables from `.env.local`
   - Update `NEXTAUTH_URL` to your production domain

## 🔧 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------||
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT tokens | Random string |
| `NEXTAUTH_SECRET` | NextAuth secret | Random string |
| `NEXTAUTH_URL` | Application URL | `https://yourapp.vercel.app` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------||
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | Email address | Required for emails |
| `SMTP_PASS` | Email password | Required for emails |
| `GOOGLE_CLIENT_ID` | Google OAuth ID | Required for Google auth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Required for Google auth |
| `GEMINI_API_KEY` | Gemini AI API key | Required for AI features |

## 🛠️ Troubleshooting

### Email Issues

1. **SMTP Authentication Failed**:
   - Ensure 2FA is enabled on Gmail
   - Use app password, not regular password
   - Check SMTP_USER and SMTP_PASS values

2. **Emails Not Sending**:
   - Run `npm run test-email` to debug
   - Check console logs for error messages
   - Verify SMTP settings

### Database Issues

1. **Connection Failed**:
   - Check MONGO_URI format
   - Ensure database user has correct permissions
   - Verify network access (IP whitelist for Atlas)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - managed MongoDB service
- [Vercel Platform](https://vercel.com/) - deployment platform
- [Gemini AI](https://ai.google.dev/) - Google's AI platform
