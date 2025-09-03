import crypto from 'crypto';
import { OtpRecord } from './types';

const inMemoryOtps = new Map<string, OtpRecord>();

export function generateOtp(email: string, ttlMs = 5 * 60 * 1000): string {
  const code = ('' + Math.floor(100000 + Math.random() * 900000));
  const record: OtpRecord = { email, code, expiresAt: Date.now() + ttlMs };
  inMemoryOtps.set(email, record);
  console.log(`Backend: OTP generated for ${email}: ${code} (expires in ${ttlMs/1000}s)`);
  return code;
}

export function verifyOtp(email: string, code: string): boolean {
  const record = inMemoryOtps.get(email);
  if (!record) {
    console.log(`Backend: OTP verification failed for ${email} - no OTP found`);
    return false;
  }
  const ok = record.code === code && Date.now() < record.expiresAt;
  if (ok) {
    console.log(`Backend: OTP verified successfully for ${email}: ${code}`);
    inMemoryOtps.delete(email);
  } else {
    console.log(`Backend: OTP verification failed for ${email}: ${code} - ${record.code === code ? 'expired' : 'invalid code'}`);
  }
  return ok;
}

export function clearExpiredOtps(): void {
  const now = Date.now();
  let cleared = 0;
  for (const [key, rec] of inMemoryOtps) {
    if (now >= rec.expiresAt) {
      inMemoryOtps.delete(key);
      cleared++;
    }
  }
  if (cleared > 0) {
    console.log(`Backend: Cleared ${cleared} expired OTPs`);
  }
}

