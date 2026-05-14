# Hotpot Restaurant Web App

This repository contains a React frontend and a Node.js backend for a restaurant booking app.

## Structure

- `FE/` - React + Vite frontend
- `BE/` - Express backend with PostgreSQL database
- `docker-compose.yml` - local development stack with Postgres, API, and frontend

## Run locally

1. Start containers:
   ```bash
   docker compose up --build
   ```

2. Visit:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:5000`

## Database

The PostgreSQL database is initialized with sample restaurants and menu items from `BE/src/data/init.sql`.

## Notes

- Frontend pages: Trang chủ, Thực đơn, Đặt bàn, Liên hệ
- Backend API endpoints:
  - `GET /api/menu`
  - `GET /api/restaurants`
  - `POST /api/bookings`
