# MongoDB Setup Guide

## MongoDB is NOT Running!

You need to install MongoDB or use MongoDB Atlas (cloud).

## Option 1: MongoDB Atlas (Recommended - FREE)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a FREE cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: ``)
6. Replace `<password>` with your database password
7. Update `backend/.env` file:
   ```
   ```

## Option 2: Install MongoDB Locally

1. Download MongoDB Community Server:
   https://www.mongodb.com/try/download/community

2. Install with default settings

3. After installation, start MongoDB service:
   ```bash
   net start MongoDB
   ```

4. Keep the current `.env` configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/slotswapper
   ```

## After Setup

1. Restart the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see: `MongoDB Connected: ...`
