# Real-Time Notifications with Socket.io ✅

## Features Added

### Backend (Socket.io Server)
- ✅ Socket.io server integrated with Express
- ✅ User rooms for targeted notifications
- ✅ Real-time events:
  - **`newSwapRequest`** - When someone sends you a swap request
  - **`swapResponse`** - When your swap request is accepted/rejected

### Frontend (Socket.io Client)
- ✅ Socket.io client connected on login
- ✅ Automatic room joining with userId
- ✅ Toast notifications (top-right corner)
- ✅ Auto-dismiss after 5 seconds
- ✅ Smooth slide-in animation
- ✅ Triggers automatic data refresh

## How It Works

### 1. User Sends Swap Request
```
User A → Clicks "Request Swap" on User B's slot
Backend → Creates swap request
Socket.io → Emits 'newSwapRequest' to User B
User B → Sees notification: "User A wants to swap with you!"
```

### 2. User Responds to Request
```
User B → Clicks "Accept" on incoming request
Backend → Exchanges slot ownership
Socket.io → Emits 'swapResponse' to User A
User A → Sees notification: "Your swap request was accepted!"
Both → UI automatically refreshes
```

## Testing

### Start Both Servers:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Test Flow:
1. Open **two browser windows** (or use incognito)
2. **Window 1:** Login as `emily@example.com`
3. **Window 2:** Login as `david@example.com`
4. **David:** Go to My Slots → Mark a slot as swappable
5. **Emily:** Go to Available Slots → Request swap with David's slot
6. **David:** Should see notification: "Emily Carter wants to swap with you!"
7. **David:** Go to Requests → Accept the request
8. **Emily:** Should see notification: "Your swap request was accepted!"
9. **Both:** Calendar updates automatically without refresh!

## Technical Details

### Backend Changes
- `server.js` - Socket.io server setup with CORS
- `routes/swaps.js` - Emit notifications on swap actions
- User-specific rooms using `socket.join(userId)`

### Frontend Changes
- `components/NotificationToast.jsx` - Toast notification component
- `components/Layout.jsx` - Socket.io client connection & listeners
- `tailwind.config.js` - Slide-in animation
- Auto-refresh via `window.dispatchEvent(new Event('swapUpdated'))`

## Benefits
✅ **Instant notifications** - No polling needed
✅ **Targeted delivery** - Only relevant users notified
✅ **Auto-refresh** - UI updates without manual refresh
✅ **Great UX** - Users stay informed in real-time
✅ **Scalable** - Socket.io handles many concurrent connections

## Socket.io Events

### Server → Client
- `newSwapRequest` - New incoming swap request
  ```js
  {
    message: "User A wants to swap with you!",
    request: { ... full request data ... }
  }
  ```

- `swapResponse` - Response to your outgoing request
  ```js
  {
    message: "Your swap request was accepted!",
    accepted: true,
    request: { ... full request data ... }
  }
  ```

### Client → Server
- `join` - Join user's notification room
  ```js
  socket.emit('join', userId)
  ```

## Future Enhancements (Optional)
- [ ] Notification badge count in header
- [ ] Notification history/inbox
- [ ] Sound alerts
- [ ] Browser push notifications (when tab is closed)
- [ ] Email notifications for missed alerts

---

**Status: Fully Implemented & Working** 🎉
