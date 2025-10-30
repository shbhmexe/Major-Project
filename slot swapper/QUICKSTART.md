# SlotSwapper - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install MongoDB
Make sure MongoDB is installed and running on your system.

**Windows:**
```bash
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

Server runs on: `http://localhost:5000`

### Step 3: Start Frontend App

Open a NEW terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 📱 Using the App

1. **Sign Up** - Create a new account at `/signup`
2. **Create Events** - Add slots to your calendar  
3. **Mark as Swappable** - Toggle slots you want to swap
4. **Browse & Request** - Find slots from other users
5. **Accept/Reject** - Manage incoming requests

## 🎯 Test Scenario

1. Create 2 user accounts (open 2 different browsers)
2. Each user creates and marks 1 slot as SWAPPABLE
3. User B requests to swap with User A's slot
4. User A accepts the request
5. ✅ Slots are now swapped!

## 🔧 Troubleshooting

**MongoDB not connecting?**
- Check if MongoDB service is running
- Verify connection string in `backend/.env`

**CORS errors?**
- Ensure backend is running on port 5000
- Check frontend .env has correct API URL

**Token errors?**
- Clear localStorage and login again
- Check JWT_SECRET in backend/.env

## 📚 Full Documentation

See [README.md](./README.md) for complete documentation.
