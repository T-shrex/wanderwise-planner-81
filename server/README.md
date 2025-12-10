# WanderWise Backend (Express + MongoDB)

## Quick start
1) Copy `server/example.env` to `server/.env` and set values (Mongo URI, JWT secret, client URL).
2) Install deps:
```bash
cd server
npm install
```
3) Run dev server:
```bash
npm run dev
```
API defaults to `http://localhost:5000`.

## Available endpoints
- `POST /api/auth/register` `{ email, password, name? }` → `{ token, user }`
- `POST /api/auth/login` `{ email, password }` → `{ token, user }`
- `GET /api/auth/me` (Bearer token) → `{ user }`
- `GET /api/itineraries` (Bearer) → list current user's itineraries
- `POST /api/itineraries` (Bearer) → create itinerary
- `GET /api/itineraries/:id` (Bearer) → fetch single
- `PUT /api/itineraries/:id` (Bearer) → update
- `DELETE /api/itineraries/:id` (Bearer) → delete
- `POST /api/assistant` (Bearer) `{ message }` → `{ reply }` (stub, swap with real AI)

Auth uses JWT in the `Authorization: Bearer <token>` header. Itinerary schema matches the UI (destination, dates, budget, travelStyle, travelers, notes, and per-day activities).

