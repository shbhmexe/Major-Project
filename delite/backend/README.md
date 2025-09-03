Backend (Express + TypeScript)

Env variables required:
- `PORT`
- `CORS_ORIGIN`
- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`

Scripts:
- `npm run dev` – start in watch mode
- `npm run build` – compile to `dist/`
- `npm start` – run compiled server

Endpoints (prefix `/api`):
- `POST /auth/request-otp` { email }
- `POST /auth/signup-email` { email, password, otp }
- `POST /auth/login-email` { email, password }
- `POST /auth/login-otp` { email, otp }
- `POST /auth/google` { idToken }
- `GET /notes` bearer JWT
- `POST /notes` { content } bearer JWT
- `DELETE /notes/:id` bearer JWT

