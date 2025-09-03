export interface JwtUserPayload {
  userId: string;
  email: string;
  provider: 'email' | 'google';
}

export interface OtpRecord {
  code: string;
  email: string;
  expiresAt: number;
}

