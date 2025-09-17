# Environment Variables Setup Guide

## ज़रूरी Environment Variables

### 1. reCAPTCHA Keys (तुरंत setup करें):

**Steps:**
1. https://www.google.com/recaptcha/admin/ पर जाएं
2. "+" button पर click करें
3. Site details fill करें:
   - Label: "Internship App"
   - reCAPTCHA type: "reCAPTCHA v2" → "I'm not a robot" checkbox
   - Domains: "localhost" (development के लिए)
4. Submit करें
5. Site Key और Secret Key copy करें

**`.env` में add करें:**
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. Firebase Measurement ID:

**Steps:**
1. Firebase Console में जाएं
2. Project Settings → General
3. "Google Analytics" section में Measurement ID find करें
4. Format: `G-XXXXXXXXXX`

**`.env` में update करें:**
```
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Firebase Admin SDK (Optional):

**Steps:**
1. Firebase Console → Project Settings → Service Accounts
2. "Generate new private key" click करें
3. JSON file download करें
4. JSON file के contents को environment variables में convert करें

## Current Status:

✅ **Working:** Firebase, Gemini API, MongoDB, Email SMTP  
❌ **Missing:** reCAPTCHA keys, Firebase Measurement ID  
⚠️ **Optional:** Firebase Admin SDK  

## Test करने के लिए:

1. reCAPTCHA keys add करने के बाद phone OTP test करें
2. Console में कोई reCAPTCHA errors नहीं आनी चाहिए
3. OTP verification smooth होनी चाहिए