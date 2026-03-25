# Task Manager App

## Backend Setup
1. cd backend
2. npm install
3. npm start (runs on port 4000)

## Frontend Setup
1. cd frontend
2. npm install
3. npm run dev (runs on port 5173)

## API Endpoints
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

## Assumptions and Design Decisions
- Used Vite as the frontend build tool
- Separated routes and services in backend for cleaner architecture
- Used axios for HTTP requests
- Carousel activates only when tasks exceed viewport width

## Time Spent
- Backend: ~90 minutes
- Frontend Core Features: ~120 minutes
- Styling & Polish: ~40 minutes
- Testing & Debugging: ~30 minutes
