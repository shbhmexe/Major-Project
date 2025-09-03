import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string | undefined);

export async function verifyGoogleIdToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID as unknown as string | string[],
  } as any);
  const payload = ticket.getPayload();
  if (!payload || !payload.email) throw new Error('Google token invalid');
  return {
    email: payload.email,
    name: payload.name || '',
    picture: payload.picture || '',
  };
}

