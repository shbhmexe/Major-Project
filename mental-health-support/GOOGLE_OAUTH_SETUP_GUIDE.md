# Google OAuth Setup Guide

## Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add a name for your OAuth client

## Configure Authorized JavaScript Origins

Add the following URL to the "Authorized JavaScript origins" section:
```
http://localhost:3000
```

In production, you would add your actual domain (e.g., `https://yourdomain.com`).

## Configure Authorized Redirect URIs

Add the following URLs to the "Authorized redirect URIs" section:
```
http://localhost:3000/api/auth/callback/google
```

In production, you would add your actual domain redirect URI (e.g., `https://yourdomain.com/api/auth/callback/google`).

## Update Environment Variables

After creating your OAuth client, you'll receive a Client ID and Client Secret. Update your `.env` file with these values:

```
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

## MongoDB Setup

The application is configured to use MongoDB for storing user data. Make sure you have MongoDB installed locally or use a cloud MongoDB service like MongoDB Atlas.

Update your `.env` file with your MongoDB connection string:

```
MONGO_URI=mongodb://localhost:27017/mental-health-support
```

For MongoDB Atlas, use the connection string provided by the service.

## JWT Configuration

The application uses JWT for authentication. Update your `.env` file with a secure JWT secret:

```
JWT_SECRET=your-secure-random-string
```

You can generate a secure random string using a tool like OpenSSL:

```
openssl rand -base64 32
```

## Testing the Setup

After completing the setup:

1. Start your application with `npm run dev`
2. Navigate to the login page
3. Click on the "Sign in with Google" button
4. You should be redirected to Google's authentication page
5. After successful authentication, you'll be redirected back to your application

## Troubleshooting

### Error: "redirect_uri_mismatch"

This error occurs when the redirect URI in your application doesn't match the one configured in the Google Cloud Console. Make sure the redirect URI in your Google Cloud Console matches exactly with `http://localhost:3000/api/auth/callback/google`.

### Error: "invalid_client"

This error occurs when the Client ID or Client Secret is incorrect. Double-check your `.env` file and make sure the values match those in your Google Cloud Console.

### Error: "Access blocked: delite's request is invalid"

This error can occur if your Google Cloud Console project is not properly configured or if the OAuth consent screen is not set up correctly. Make sure you've completed the OAuth consent screen setup in the Google Cloud Console.