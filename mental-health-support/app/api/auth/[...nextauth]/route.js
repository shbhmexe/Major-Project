import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login', // Error code passed in query string as ?error=
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account?.provider === 'google') {
          // Always allow Google sign in
          return true;
        }
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return true; // Still allow sign in even if callback fails
      }
    },
    async jwt({ token, account, profile, user }) {
      try {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.access_token;
          token.id = profile?.sub || profile?.id || user?.id;
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token; // Return token even if there's an error
      }
    },
    async session({ session, token }) {
      try {
        // Send properties to the client, like an access_token and user id from a provider.
        if (token) {
          session.accessToken = token.accessToken;
          session.user.id = token.id;
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session; // Return session even if there's an error
      }
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      // This runs after successful sign in but doesn't block it
      if (account?.provider === 'google') {
        try {
          // Save user to database asynchronously
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user/check`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });
          
          if (response.ok) {
            const data = await response.json();
            
            // If user doesn't exist, create them
            if (!data.exists) {
              await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user/create`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: user.name,
                  email: user.email,
                  googleId: profile.sub || profile.id,
                }),
              });
            }
          }
        } catch (error) {
          // Log error but don't fail the sign in
          console.error('Error saving user after Google sign in:', error);
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
