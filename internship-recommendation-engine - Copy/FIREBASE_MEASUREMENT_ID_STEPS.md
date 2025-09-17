# Firebase Measurement ID Setup Steps

## Step-by-Step Guide:

### 1. Firebase Console में Login करें:
```
https://console.firebase.google.com/
```

### 2. आपका Project Select करें:
- "pm-internship-180c4" project पर click करें

### 3. Project Settings में जाएं:
- Left sidebar में ⚙️ (Settings) icon पर click करें
- "Project settings" select करें

### 4. General Tab में:
- "Your apps" section scroll करें
- Web app की details में जाएं

### 5. Google Analytics Section:
- Page को नीचे scroll करें
- "Google Analytics" section find करें
- यहां Measurement ID दिखेगी: `G-XXXXXXXXXX` format में

### Alternative Method:

अगर Measurement ID नहीं मिल रही:

1. **Google Analytics Enable करें:**
   - Firebase Console → Analytics → Dashboard
   - अगर Analytics setup नहीं है तो "Enable Google Analytics" पर click करें

2. **Analytics Account Link करें:**
   - Google Analytics account select करें या नया बनाएं
   - Setup complete करें

3. **Measurement ID मिल जाएगी:**
   - Format: `G-MEASUREMENT_ID`
   - Example: `G-ABC123DEF4`

## Quick Commands to Check Current Config:

```bash
# Check current Firebase config
cat .env | grep FIREBASE

# Check if measurement ID is placeholder
cat .env | grep MEASUREMENT_ID
```

## एक बार Measurement ID मिलने के बाद:

`.env` file में update करें:
```
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YOUR_ACTUAL_ID
```

## Troubleshooting:

- अगर Analytics section नहीं दिख रहा → Analytics को manually enable करें
- अगर Measurement ID `G-MEASUREMENT_ID` format में नहीं → Analytics setup incomplete है
- अगर कोई error आ रही → Console logs check करें