GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000  # Change in production
NEXTAUTH_SECRET=your_nextauth_secret_here# Google OAuth Setup Guide

## Getting Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Select "Web application" as the application type
6. Add a name for your OAuth client
7. Add authorized JavaScript origins:
   - For development: `http://localhost:3000` and `http://localhost:3001`
   - For production: Your production domain (e.g., `https://your-app-domain.com`)
8. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google` and `http://localhost:3001/api/auth/callback/google`
   - For production: `https://your-app-domain.com/api/auth/callback/google`
9. Click "Create"
10. You will receive a **Client ID** and **Client Secret**

## Setting Up Environment Variables

1. Create a `.env.local` file in the root of your project (copy from `.env.local.example`)
2. Add your Google OAuth credentials:

```
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000  # Change to your production URL in production
NEXTAUTH_SECRET=your_nextauth_secret_here  # Generate with: openssl rand -base64 32
```

3. Make sure `.env.local` is in your `.gitignore` file to avoid exposing your secrets

## Generating a NextAuth Secret

For the `NEXTAUTH_SECRET` environment variable, you need a secure random string. You can generate one using:

```bash
openssl rand -base64 32
```

Or use a secure online generator if you don't have access to openssl.

## Deployment Considerations

When deploying to production:

1. Update the `NEXTAUTH_URL` to your production URL
2. Add your production domain to the authorized origins and redirect URIs in the Google Cloud Console
3. Set the environment variables in your hosting platform (Vercel, Netlify, etc.)

## Troubleshooting

If you encounter issues:

1. Verify that your redirect URIs exactly match what's configured in Google Cloud Console
2. Check that all environment variables are correctly set
3. Ensure your application is using HTTPS in production
4. Check the server logs for any authentication errors