# 2026/07/07 Update
Adding a standard, secure starter design you can add to your existing soccer-formations-react app.

This design uses:
- React + React Router on the frontend
- Node.js/Express on the backend
- JWT access + refresh tokens
- HttpOnly cookies for token storage
- Protected routes
-Email verification flow
- Password validation + strength meter

JWTs are signed tokens used to carry claims and help the server verify the authenticity/integrity of those claims.  HttpOnly cookies are not accessible to JavaScript, and Secure/SameSite cookie flags help control cookie transmission and cross-site behavior.  Express cookie-parser parses the request Cookie header and makes cookies available on req.cookies.

## Recommended FrontEnd Structure

```text
src/
├─ App.jsx
├─ main.jsx
├─ auth/
│  ├─ AuthContext.jsx
│  ├─ PrivateRoute.jsx
│  └─ authApi.js
├─ pages/
│  ├─ LoginPage.jsx
│  ├─ SignupPage.jsx
│  ├─ VerifyEmailPage.jsx
│  └─ LegacyAppPage.jsx
└─ styles/
   ├─ app.css
   └─ auth.css
```
## Backend - Express API

Create a new backend folder outside the React app

```text
occer-formations-api/
├─ server.js
├─ package.json
└─ .env
```
## Flow Summary

### Sign up

User enters:
- Email
- Password
- Confirm Password

Frontend posts to: /api/auth/signup

Backend:
- Validates password.
- Hashes password.
- Creates the user.
- Sends email verification link.
- Returns success message.

### Email verification

Users clicks: /verify-email?token=...
Frontend calls: /api/auth/verify-email
The backend marks the user as verified.

### Login
User clicks on: /login
Frontend posts to:/api/auth/login
Backend:
- Validates credentials.
- Checks email verification.
- Sets access token cookie.
- Sets refresh token cookie.
- Returns user object.

### Protected dashboard
User clicks on: /app
PrivateRoute checks: /api/auth/me
If the access token has expired, the frontend calls /api/auth/refresh and then retries loading the user.

### Logout

Frontend calls: /api/auth/logout
Backend:
- Invalidates refresh token by incrementing tokenVersion.
- Clears cookies.
- Frontend redirects to login.

### Important Production Notes
For production, replace the in-memory user store with a database table on PostgreSQL (GitHub login) :

```text
sers
├─ id
├─ email
├─ password_hash
├─ email_verified
├─ token_version
├─ created_at
└─ updated_at
```
Also use: 
NODE_ENV=production
CLIENT_ORIGIN=https://soccer-formations-react.vercel.app

Express APU Node backend: Railway (GitHub login).
Email provider: Resend (GitHub login).

The frontend cannot store or read HttpOnly cookies directly; the backend must set them through Set-Cookie, and the browser sends them automatically when credentials: 'include' is used.

# Soccer Formations React

This Vite + React JavaScript project was generated from the original `index.html` single-page app.

## What is preserved

- The original Formation View, Player View, and Coach View markup.
- The original CSS styling.
- The original JavaScript formation data, session plans, triggers, buildout patterns, defensive blocks, and SVG buildout visuals.
- The original interaction model, including formation-format buttons, view switching, player-position selection, coach tabs, and accordions.

## Project structure

```text
soccer-formations-react/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
│  ├─ legacy-app.js
│  └─ original-index-reconstructed.html
└─ src/
   ├─ App.jsx
   ├─ main.jsx
   ├─ components/
   │  └─ LegacySoccerApp.jsx
   └─ styles/
      └─ app.css
```

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

## Build for deployment

```bash
npm run build
```

The production build will be created in `dist/`.

## Notes

This is a compatibility-first React conversion. It wraps the original working app inside React while preserving the original UI, UX, and data. A later refactor can progressively convert the legacy rendering functions into fully idiomatic React components.

Deploy trigger
