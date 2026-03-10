# CasaPerks Rewards Dashboard

A points-based rewards dashboard for property management residents. Residents can view their points balance, browse transaction history, and redeem points for gift cards. Built as a take-home interview project in roughly 2.5 hours.

---

## Stack & Technologies

**Frontend**
- React 18 + TypeScript
- Vite (dev server + build)
- Tailwind CSS (styling)
- react-hot-toast (notifications)

**Backend**
- Node.js + Express + TypeScript
- jsonwebtoken (mock JWT auth)
- express-rate-limit (rate limiting)
- dotenv (environment config)

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install all dependencies
npm run install:all

# Run both servers concurrently
npm run dev
```

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:3001      |

**Demo credentials**

Select either resident from the dropdown on the login screen:
- Sarah Chen (Apt 4B) — 2,450 points
- Marcus Rivera (Apt 12A) — 875 points

---

## Architecture Overview

The project is a monorepo with `/server` and `/frontend` packages. Both dev servers are started with a single `npm run dev` from the root via `concurrently`. There is no shared package between them — types are intentionally duplicated at this scope.

The Express backend follows an MVC structure: requests flow through routes → controllers → models. State is held in mutable in-memory arrays. This was a deliberate choice for portability — no database setup required, state persists within a session, and resets on server restart.

The React frontend keeps concerns cleanly separated: `App.tsx` owns auth state and the redemption modal lifecycle, the `useResident` hook owns all async data fetching via `Promise.all`, and `api/client.ts` is the single source of all `fetch` calls with automatic token attachment.

The Vite dev server proxies all `/api/*` requests to `localhost:3001`, stripping the `/api` prefix before forwarding. This means no CORS configuration is needed during development and all fetch calls use a consistent `/api` base path.

---

## Security Considerations

- **Mock JWT Authentication** — `POST /auth/login` returns a signed JWT. All protected routes verify the token via `authenticateToken` middleware. The JWT payload contains `residentId` — controllers verify the token owner matches the requested resource, preventing residents from accessing each other's data.

- **Input Validation** — The redemption endpoint validates in strict sequence before any state mutation: ownership check, resident exists, `giftCardId` present, gift card exists, in stock, sufficient points balance. All validation completes before points are deducted or transactions recorded. Appropriate HTTP status codes are used throughout (400, 401, 403, 404, 422).

- **Rate Limiting** — `express-rate-limit` is applied specifically to `POST /residents/:id/redeem` — 10 requests per minute per IP. Scoped to the mutation endpoint rather than the entire API to protect the action that modifies state.

- **Security Headers** — `helmet` is the first middleware in the stack, setting `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, and eight other headers automatically. Applied globally so every response is covered regardless of route.

---

## Assumptions & Tradeoffs

- In-memory data resets on server restart — acceptable for a demo, a production version would use a persistent database
- Types are duplicated between server and frontend rather than shared via a monorepo package — intentional tradeoff, a shared package would add build complexity not justified at this scope
- JWT secret is a hardcoded development value — production would require a secrets manager and key rotation
- Single-file token storage (module-level variable) — production would use httpOnly cookies or secure token storage
- No test suite — time was allocated to feature completeness and code clarity instead
- Logo images sourced from img.logo.dev — requires network access, brand initial shown as fallback if unavailable
