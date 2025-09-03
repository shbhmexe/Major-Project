# Delite Notes App

## Tech
- Frontend: React + Vite + Tailwind
- Backend: Express + TypeScript + MongoDB (Atlas)

## Setup
1) Backend
```
cd backend
npm install
# create .env (already created if you followed setup)
# edit values as needed
npm run dev
```
API base: `http://localhost:4000/api`

2) Frontend
```
cd frontend
npm install
npm run dev
```

## Auth Flows
- Email + OTP signup/login
- Email + password login (signup collects password)
- Google Sign-In (OAuth, send ID token to backend)

## Notes
- GET /api/notes (JWT)
- POST /api/notes { content } (JWT)
- DELETE /api/notes/:id (JWT)
