# Flashcards App

A simple flashcards application to create, manage, and quiz yourself with decks of cards. Built with React frontend, NestJS backend, and Prisma ORM connected to a PostgreSQL database.

---

## Live Demo

- **Frontend:** [https://pd-flashcards-app.netlify.app/](https://pd-flashcards-app.netlify.app/)
- **Backend API:** [https://flashcards-appn.onrender.com](https://flashcards-appn.onrender.com)

---

## Features

- User authentication with JWT
- Create, update, delete decks and cards
- Spaced repetition quiz system
- Responsive UI for desktop and mobile
- Secure API protected with JWT guards

---

## Tech Stack

- **Frontend:** React, React Router, Axios, TailwindCSS, React Icons
- **Backend:** NestJS, Prisma ORM, PostgreSQL, JWT Authentication
- **Deployment:** Render (backend), Netlify (frontend)

---

## Installation

1. Clone the repo

```bash
git clone https://github.com/pratyusha-ds/flashcards-app.git
cd flashcards-app
```

2. Setup backend

```bash
cd backend
npm install
```

3. Create a .env file in backend with your environment variables

```bash
DATABASE_URL="postgresql://user:password@host:port/dbname"
JWT_SECRET="your_jwt_secret"
PORT=xxxx
```

4. Run Prisma migrations

```bash
npx prisma migrate deploy
```

5. Start backend server

```bash
npm run start:dev
```

6. Setup frontend

```bash
cd ../frontend
npm install
npm run dev
```

7. Open http://localhost:3000 (or your frontend port) in your browser
