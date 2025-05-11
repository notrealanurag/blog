# Full-Stack Blog Application

A blog app for posting and reading blogs related to recycling built with TypeScript, React, NestJS, GraphQL, Redux, and Ant Design

## Features

- User authentication with JWT
- Create, read, update, and delete blog posts
- Real-time notifications using WebSocket
- Protected routes for signed in users

## Prerequisites

- Node.js
- pnpm package manager
- PostgreSQL database
- Docker

## Project Structure

```
blog-app/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── graphql/     # GraphQL operations
│   │   ├── store/       # Redux store and slices
│   │   └── lib/         # Utility functions and configurations
│   └── ...
├── backend/            # NestJS backend application
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── blog/        # Blog module
│   │   ├── entities/    # TypeORM entities
│   │   └── ...
│   └── ...
└── ...
```

## Technologies Used

- Frontend:
  - React with TypeScript
  - Apollo Client for GraphQL
  - Redux Toolkit for state management
  - Ant Design for UI components
  - React Router for routing
  - Socket.io client for real-time features

- Backend:
  - NestJS with TypeScript
  - GraphQL with Apollo Server
  - TypeORM with PostgreSQL
  - JWT authentication
  - WebSocket for real-time features

# Docker Deployment

## Quick Start with Docker Compose

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-app
```

2. Create necessary environment files:

Create `.env` file in the project root:
```env
# Database
POSTGRES_USER=bloguser
POSTGRES_PASSWORD=blogpass
POSTGRES_DB=blogdb

# Backend
NODE_ENV=production
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
SEED_DATABASE=true  # Enable database seeding

# Frontend
VITE_API_URL=http://localhost:3000/graphql
VITE_WS_URL=ws://localhost:3000
```

3. Build and start all services:
```bash
docker-compose up -d --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- GraphQL Playground: http://localhost:3000/graphql

## Database Seeding in Docker

The application supports automatic database seeding in Docker:

1. **First-time Setup**:
   - Set `SEED_DATABASE=true` in your environment
   - The backend container will automatically seed the database on first startup

## Development Setup

1. Clone the repository

2. Install dependencies:
```bash
pnpm install
cd frontend && pnpm install
cd ../backend && pnpm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db
JWT_SECRET=your-secret-key
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:3000/graphql
VITE_WS_URL=ws://localhost:3000
```

4. Start the development servers:
```bash
# From the root directory
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- GraphQL Playground: http://localhost:3000/graphql