# SlotSwapper - Real-Time Calendar Slot Exchange Platform

A full-stack web application that allows users to manage their calendar slots and swap them with other users in real-time. Built with Node.js, Express, MongoDB, React, and Socket.io.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Design Choices](#design-choices)
- [Challenges & Solutions](#challenges--solutions)
- [Demo Credentials](#demo-credentials)

---

## 🎯 Project Overview

SlotSwapper is a collaborative scheduling platform where users can:
- Create and manage their calendar events/slots
- Mark slots as "swappable" when they want to exchange them
- Browse available slots from other users
- Send swap requests to exchange slots
- Receive real-time notifications for swap requests and responses
- Accept or reject incoming swap requests
- Automatically exchange slot ownership upon acceptance

The system ensures data consistency through MongoDB transactions and provides a seamless user experience with real-time updates via WebSockets.

---

## ✨ Features

### Authentication & Authorization
- ✅ Secure user registration and login
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes (frontend & backend)

### Slot Management
- ✅ Create events with title, start/end time, location
- ✅ View all personal slots in calendar view
- ✅ Toggle slot status between BUSY and SWAPPABLE
- ✅ Prevent modifications to slots with pending swaps

### Swap Marketplace
- ✅ Browse all available swappable slots from other users
- ✅ Filter slots by date, category, owner
- ✅ Request swaps by selecting your own slot to offer
- ✅ Server-side validation of swap eligibility

### Swap Requests & Responses
- ✅ View incoming swap requests with full details
- ✅ View outgoing swap requests with status tracking
- ✅ Accept swaps → Automatic slot ownership exchange
- ✅ Reject swaps → Restore slots to swappable status
- ✅ Atomic transactions for data consistency

### Real-Time Notifications
- ✅ Instant notifications via Socket.io
- ✅ Toast alerts for new swap requests
- ✅ Toast alerts for swap acceptance/rejection
- ✅ Automatic UI refresh on notifications
- ✅ User-specific notification rooms

### State Management
- ✅ Dynamic UI updates without page refresh
- ✅ Context API for global auth state
- ✅ Event-driven architecture for cross-component updates

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose
- **Authentication:** JWT + bcrypt
- **Real-time:** Socket.io
- **Environment:** dotenv

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS v3
- **Real-time:** Socket.io-client
- **State:** Context API

### Database Schema
- **Users:** name, email, password (hashed)
- **Events:** title, startTime, endTime, location, status, userId
- **SwapRequests:** requesterId, requesterSlotId, targetUserId, targetSlotId, status

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd slot-swapper
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and replace with your values:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key_here
NODE_ENV=development
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

**Generate JWT Secret:**
```bash
# Run in terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Seed Sample Data:**
```bash
# Populate database with test users and events
node seed.js
```

**Start Backend Server:**
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register/Login Request Body:**
```json
{
  "name": "John Doe",        // Register only
  "email": "user@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

### Events/Slots Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/events` | Get all user's events | Yes |
| POST | `/api/events` | Create new event | Yes |
| PUT | `/api/events/:id` | Update event | Yes |
| DELETE | `/api/events/:id` | Delete event | Yes |

**Create Event Request:**
```json
{
  "title": "Team Meeting",
  "startTime": "2024-10-30T10:00:00Z",
  "endTime": "2024-10-30T11:00:00Z",
  "location": "Conference Room A",
  "status": "BUSY"  // or "SWAPPABLE"
}
```

**Event Response:**
```json
{
  "_id": "event_id",
  "title": "Team Meeting",
  "startTime": "2024-10-30T10:00:00Z",
  "endTime": "2024-10-30T11:00:00Z",
  "location": "Conference Room A",
  "status": "BUSY",
  "userId": "user_id",
  "createdAt": "2024-10-30T09:00:00Z"
}
```

---

### Swap Operations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/swaps/swappable-slots` | Get all swappable slots from OTHER users | Yes |
| POST | `/api/swaps/swap-request` | Create swap request | Yes |
| POST | `/api/swaps/swap-response/:requestId` | Accept/reject swap | Yes |
| GET | `/api/swaps/requests` | Get incoming & outgoing requests | Yes |

**Get Swappable Slots Response:**
```json
[
  {
    "_id": "slot_id",
    "title": "Yoga Session",
    "startTime": "2024-10-30T10:00:00Z",
    "endTime": "2024-10-30T11:00:00Z",
    "location": "Gym",
    "status": "SWAPPABLE",
    "userId": {
      "_id": "other_user_id",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
]
```

**Create Swap Request:**
```json
{
  "mySlotId": "your_slot_id",
  "theirSlotId": "their_slot_id"
}
```

**Swap Request Response:**
```json
{
  "_id": "request_id",
  "requesterId": { "name": "John Doe", "email": "john@example.com" },
  "requesterSlotId": { "title": "Meeting", ... },
  "targetUserId": { "name": "Jane Smith", "email": "jane@example.com" },
  "targetSlotId": { "title": "Yoga Session", ... },
  "status": "PENDING"
}
```

**Accept/Reject Swap:**
```json
{
  "accept": true  // or false to reject
}
```

**Get Requests Response:**
```json
{
  "incoming": [
    {
      "_id": "request_id",
      "requesterId": { "name": "Jane Smith" },
      "requesterSlotId": { "title": "Yoga Session", ... },
      "targetSlotId": { "title": "Meeting", ... },
      "status": "PENDING"
    }
  ],
  "outgoing": [
    {
      "_id": "request_id",
      "targetUserId": { "name": "Bob Wilson" },
      "requesterSlotId": { "title": "Meeting", ... },
      "targetSlotId": { "title": "Workshop", ... },
      "status": "PENDING"
    }
  ]
}
```

---

### Authentication Header

All protected endpoints require JWT token:
```
Authorization: Bearer <your_jwt_token>
```

**Example with cURL:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/events
```

**Example with Postman:**
1. Go to Authorization tab
2. Select "Bearer Token"
3. Paste your token

---

## 🎨 Design Choices

### 1. **MongoDB Transactions**
- Used for swap operations to ensure atomicity
- Prevents partial updates if any step fails
- Maintains data consistency across collections

### 2. **Socket.io for Real-Time**
- Efficient bidirectional communication
- User-specific rooms for targeted notifications
- Automatic reconnection handling
- Low latency compared to polling

### 3. **JWT Authentication**
- Stateless authentication
- Token stored in localStorage
- Automatic inclusion in API requests via Axios interceptor
- Secure password hashing with bcrypt (10 salt rounds)

### 4. **Three-State Slot Status**
- **BUSY**: Normal event, not swappable
- **SWAPPABLE**: Available for exchange
- **SWAP_PENDING**: Locked during active swap request
  - Prevents double-booking
  - Released on accept/reject

### 5. **React Context API**
- Global auth state management
- Reduces prop drilling
- Easy access to user data across components

### 6. **Event-Driven UI Updates**
- Custom events (`swapUpdated`) trigger cross-component refresh
- No need for complex state management libraries
- Ensures UI always reflects latest data

### 7. **Tailwind CSS**
- Utility-first approach for rapid development
- Consistent design system
- Easy responsive design
- Small bundle size

### 8. **Vite Build Tool**
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Better DX than Create React App

---

## 🧩 Challenges & Solutions

### Challenge 1: Race Conditions in Swap Requests
**Problem:** Multiple users could request same slot simultaneously, causing conflicts.

**Solution:** 
- Implemented MongoDB transactions for atomic operations
- Added SWAP_PENDING status to lock slots during request
- Server-side validation checks slot availability before creating request

### Challenge 2: Real-Time State Synchronization
**Problem:** UI not updating across tabs/components when swap happens.

**Solution:**
- Integrated Socket.io for instant notifications
- Implemented custom event system for cross-component updates
- Automatic data refetch on swap-related actions

### Challenge 3: Authentication Token Management
**Problem:** Token expiry and refresh handling.

**Solution:**
- Implemented Axios interceptors for automatic token inclusion
- Added error handling for expired tokens
- Redirect to login on 401 responses

### Challenge 4: Slot Ownership Exchange
**Problem:** Swapping slot owners while maintaining data integrity.

**Solution:**
- Used MongoDB transactions to swap userId atomically
- Temporary variable swap pattern in backend
- Rollback on any error during transaction

### Challenge 5: Timezone Handling
**Problem:** Different users in different timezones.

**Solution:**
- Store all times in UTC in database
- Use JavaScript Date objects for conversion
- Browser automatically handles local timezone display

### Challenge 6: Preventing User from Swapping Own Slots
**Problem:** User could accidentally request swap with themselves.

**Solution:**
- Backend validation checks requester ≠ target
- Frontend filters out user's own slots from marketplace
- Clear error messages for validation failures

---

## 🔐 Demo Credentials

The seeded database includes the following test accounts:

### Primary Test User
- **Email:** emily@example.com
- **Password:** password123

### Additional Test Users
- david@example.com / password123
- sarah@example.com / password123
- usera@example.com / password123
- userb@example.com / password123

**Note:** All test users have sample events and swap requests pre-populated.

---

## 📂 Project Structure

```
slot-swapper/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Event.js           # Event schema
│   │   └── SwapRequest.js     # Swap request schema
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── events.js          # Event CRUD routes
│   │   └── swaps.js           # Swap logic routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Express + Socket.io server
│   ├── seed.js                # Database seed script
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── Layout.jsx     # Main layout with Socket.io
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── NotificationToast.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MySlots.jsx    # Calendar + create events
│   │   │   ├── AvailableSlots.jsx  # Marketplace
│   │   │   └── Requests.jsx   # Incoming/outgoing requests
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
├── FEATURES_COMPLETED.md
└── NOTIFICATIONS.md
```

---

## 🧪 Testing the Application

### Manual Test Flow:

1. **Registration & Login**
   - Register new user or use demo credentials
   - Verify token is stored in localStorage
   - Check redirect to dashboard

2. **Create Events**
   - Go to "My Slots" page
   - Click "+ Create Event"
   - Fill form and submit
   - Verify event appears in table

3. **Mark Slot as Swappable**
   - Check the "Swappable" checkbox on an event
   - Verify status updates immediately

4. **Browse Available Slots**
   - Go to "Available Slots" page
   - Verify only other users' swappable slots appear
   - Check date grouping (Today, Tomorrow, etc.)

5. **Request Swap**
   - Click "Request Swap" on any slot
   - Select your swappable slot from modal
   - Confirm swap request
   - Verify slot status changes to SWAP_PENDING

6. **Test Real-Time Notifications** (requires 2 browsers)
   - Browser 1: Login as user A
   - Browser 2: Login as user B
   - User A: Request swap with User B's slot
   - User B: See instant notification toast
   - User B: Accept request
   - User A: See acceptance notification
   - Both: Verify calendar auto-updates

7. **Accept/Reject Requests**
   - Go to "Requests" page
   - View incoming requests
   - Click "Accept" on a request
   - Verify slots exchange ownership
   - Verify status changes to BUSY

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/slotswapper
JWT_SECRET=your_random_secret_key_minimum_32_characters
NODE_ENV=development
```

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "socket.io": "^4.6.0"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "socket.io-client": "^4.6.0",
  "tailwindcss": "^3.4.1"
}
```

---

## 🚀 Deployment Considerations

### Backend
- Deploy on Heroku, Render, or Railway
- Set environment variables in platform dashboard
- Use MongoDB Atlas for production database
- Enable CORS for frontend domain

### Frontend
- Deploy on Vercel, Netlify, or Cloudflare Pages
- Update API base URL to production backend
- Update Socket.io connection URL
- Build: `npm run build`

---

## 📝 Assumptions Made

1. **User Trust:** Users will honor accepted swaps (no cancellation system)
2. **Timezone:** All users understand times are shown in their local timezone
3. **Event Duration:** Events are at least 15 minutes long
4. **Slot Availability:** Swappable slots remain valid until request is processed
5. **Single Device:** User is logged in on one device (no multi-device sync)
6. **Network Stability:** WebSocket connection is stable for real-time features

---

## 🎯 Future Enhancements

- [ ] Email notifications for offline users
- [ ] Recurring events support
- [ ] Calendar integrations (Google Calendar, Outlook)
- [ ] Group swaps (3+ people)
- [ ] Swap history and analytics
- [ ] Mobile responsive optimization
- [ ] PWA support for offline access

---

## 📄 License

This project is created for educational purposes.

---

## 👤 Author

**Shubham**

---

## 🙏 Acknowledgments

- MongoDB documentation for transaction examples
- Socket.io guides for real-time implementation
- React Router documentation
- Tailwind CSS for rapid UI development

---

**Made with ❤️ using Node.js, React, and MongoDB**
