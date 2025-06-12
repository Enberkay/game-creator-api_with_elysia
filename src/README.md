# Game Creator API

A RESTful API built with Bun, ElysiaJS, and PostgreSQL using MVC architecture for managing game creators and their games.

## Features

- Complete CRUD operations for Creators and Games
- MVC architecture with proper separation of concerns
- PostgreSQL database with proper relationships
- Input validation using Elysia's built-in validation
- TypeScript support
- Automatic UUID generation
- Proper error handling

## Setup

### Method 1: Using Docker (แนะนำ)

1. สร้าง Docker Compose file:
   ```yaml
   version: '3.8'
   
   services:
     postgres:
       image: postgres:latest
       container_name: postgres
       environment:
         POSTGRES_DB: game_creator_db
         POSTGRES_USER: myuser
         POSTGRES_PASSWORD: mypassword
       volumes:
         - postgres_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"
       restart: unless-stopped
   
     pgadmin:
       image: dpage/pgadmin4:latest
       container_name: pgadmin
       environment:
         PGADMIN_DEFAULT_EMAIL: admin@admin.com
         PGADMIN_DEFAULT_PASSWORD: admin
       ports:
         - "5050:80"
       depends_on:
         - postgres
       restart: unless-stopped
   
   volumes:
     postgres_data:
   ```

2. เริ่มต้น PostgreSQL และ pgAdmin:
   ```bash
   docker-compose up -d
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # แก้ไข .env ให้ตรงกับการตั้งค่า Docker
   ```

5. Run migrations:
   ```bash
   bun run db:migrate
   ```

6. Start the development server:
   ```bash
   bun run dev
   ```

### Method 2: Local PostgreSQL

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. Create the database and run migrations:
   ```bash
   bun run db:migrate
   ```

6. Start the development server:
   ```bash
   bun run dev
   ```

### การเข้าถึง Services

- **API**: `http://localhost:3000`
- **pgAdmin**: `http://localhost:5050`
  - Email: `admin@admin.com`
  - Password: `admin`
- **PostgreSQL**: `localhost:5432`
  - Database: `game_creator_db`
  - User: `myuser`
  - Password: `mypassword`

The API will be available at `http://localhost:3000`

## API Endpoints

### Creators
- `POST /api/creators` - Create new creator
- `GET /api/creators` - Get all creators  
- `GET /api/creators/{id}` - Get creator by ID
- `PUT /api/creators/{id}` - Update creator
- `DELETE /api/creators/{id}` - Delete creator
- `GET /api/creators/{id}/games` - Get all games by creator

### Games
- `POST /api/games` - Create new game
- `GET /api/games` - Get all games
- `GET /api/games/{id}` - Get game by ID
- `PUT /api/games/{id}` - Update game
- `DELETE /api/games/{id}` - Delete game
- `GET /api/games/{id}/with-creator` - Get game with creator information

```