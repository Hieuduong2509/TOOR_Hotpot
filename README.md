# TOOR Hotpot Restaurant Web App 🍲

Welcome to the **TOOR Hotpot** project! This is a full-stack web application designed for a hotpot restaurant, providing a modern and seamless experience for customers to browse the menu, book tables, order food, and manage their profiles.

The project is built on a clean separation of concerns between a React Frontend and a Node.js/Express Backend, using PostgreSQL as the primary database.

---

## ✨ Features

- **User Authentication:** Secure login, registration, and profile management using JWT.
- **Dynamic Menu:** Browse a diverse list of hotpot options and side dishes organized into clear categories.
- **Table Booking:** Reserve tables at various restaurant branches in advance.
- **Ordering System:** Select items, customize hotpot broths and sides, and place online orders.
- **Modern UI/UX:** Responsive, user-friendly interface inspired by Glassmorphism design principles.

---

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, React Router v6, Axios, Vanilla CSS.
- **Backend:** Node.js, Express.js, PostgreSQL (pg), JWT (JsonWebToken), Bcrypt.
- **Backend Architecture:** Feature-based / Domain-driven (Each feature is isolated in its own module for easy maintenance).
- **Infrastructure:** Docker & Docker Compose.

---

## 📂 Project Structure

The project is divided into two independent parts:

```text
📦 TOOR_Hotpot
 ┣ 📂 BE/                 # Backend Server (Node.js / Express)
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 core/           # Global configs and Middlewares (Auth, Error Handler, Database...)
 ┃ ┃ ┗ 📂 modules/        # Feature-based logic: auth, booking, menu, order, restaurant
 ┃ ┗ 📜 Dockerfile        # Docker build file for Backend
 ┃
 ┣ 📂 FE/                 # Frontend Web (React / Vite)
 ┃ ┣ 📂 public/           # Static assets (Images, favicon...)
 ┃ ┣ 📂 src/              # React source code (components, pages, hooks, services, context)
 ┃ ┗ 📜 Dockerfile        # Docker build file for Frontend
 ┃
 ┣ 📜 docker-compose.yml  # Docker Compose configuration to run the entire stack
 ┗ 📜 .gitignore          # Standard git ignore configuration
```

---

## 🚀 Running with Docker (Recommended)

The fastest way to spin up the entire system (Frontend + Backend + Database) is by using Docker.

### Prerequisites:
- **Docker** and **Docker Compose** installed on your machine.

### Steps:
1. Open a terminal at the root directory of the project (`/DA5`).
2. Start the entire stack:
   ```bash
   docker-compose up -d --build
   ```
3. Once Docker finishes building and starting the containers, the database will be automatically initialized with sample data (from `BE/src/data/init.sql`).
4. Access the application:
   - **Frontend (Web):** `http://localhost:3000`
   - **Backend (API):** `http://localhost:5001`

To stop the containers, run:
```bash
docker-compose down
```

---

## 💻 Running Manually (Without Docker)

If you prefer to run the application locally using Node.js for development purposes:

### 1. Start the Backend (BE)
- Ensure PostgreSQL is installed and running on your machine.
- Navigate to the Backend directory:
  ```bash
  cd BE
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file from `.env.example` and configure your database connection:
  ```env
  DB_USER=postgres
  DB_PASSWORD=yourpassword
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=restaurant_db
  JWT_SECRET=your_jwt_secret_key
  PORT=5000
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
*(The Backend will be running at `http://localhost:5000`)*

### 2. Start the Frontend (FE)
- Navigate to the Frontend directory:
  ```bash
  cd FE
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development environment:
  ```bash
  npm run dev
  ```
*(The Frontend will open in your default web browser)*

---

## 🌐 Main API Endpoints

The backend exposes the following RESTful APIs (prefixed with `/api`):

- **Auth (`/api/auth`)**: `/register`, `/login`, `/profile`
- **Menu (`/api/menu`)**: `/` (Get menu list)
- **Restaurant (`/api/restaurants`)**: `/` (Get branch locations)
- **Booking (`/api/bookings`)**: `/` (Create a table reservation)
- **Order (`/api/orders`)**: `/` (Place an order - Requires JWT Token)

---

Thank you for checking out TOOR Hotpot! 🍲
