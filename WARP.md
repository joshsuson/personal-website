# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Architecture Overview

This is a personal website project built with a **monorepo structure** containing:

- **Frontend**: Astro v5.13.7 static site generator with TypeScript
- **Backend**: Strapi v5.23.4 headless CMS with SQLite database
- **Current State**: Frontend uses dummy data, Strapi integration pending

The project follows a decoupled architecture where Strapi serves as a headless CMS providing RESTful APIs for the Astro frontend to consume.

## Development Commands

### Setup (First Time)
```bash
npm run setup              # Install all dependencies and rebuild native modules
```

### Daily Development
```bash
npm run dev                # Start both frontend (localhost:4321) and backend (localhost:1337) 
npm run dev:frontend       # Start only Astro dev server
npm run dev:backend        # Start only Strapi with auto-reload
```

### Building
```bash
npm run build              # Build frontend for production
cd backend && npm run build  # Build Strapi admin panel
```

### Backend-Specific Commands
```bash
cd backend && npm run develop    # Strapi dev mode with auto-reload
cd backend && npm run start      # Production mode without auto-reload
cd backend && npm run console    # Strapi interactive console
cd backend && npm run strapi     # Access Strapi CLI directly
```

### Database & Content Management
- **Strapi Admin**: http://localhost:1337/admin (create admin user on first visit)
- **Database**: SQLite (`.tmp/data.db`) - can be configured for MySQL/PostgreSQL in `backend/config/database.ts`
- **API Endpoints**: http://localhost:1337/api/ (once content types are created)

## Project Structure & Key Files

### Frontend (`/frontend/`)
- **Pages**: `src/pages/` - File-based routing, currently only `index.astro`
- **Config**: `astro.config.mjs` - Minimal Astro configuration
- **Current Data**: Hardcoded in `src/pages/index.astro` as `dummyData`

### Backend (`/backend/`)
- **Config**: `/config/` - Database, server, plugins, and middleware configurations
- **Content Types**: `/src/api/` - Currently empty, ready for content type definitions
- **Database**: Uses SQLite by default, configurable via environment variables

### Integration Points
The main architectural goal is connecting the Astro frontend to consume Strapi's RESTful API instead of using hardcoded dummy data.

## Key Technical Details

- **Node.js Requirements**: Frontend requires 22.x, Backend supports 18.x-22.x
- **TypeScript**: Both projects use TypeScript for type safety
- **Database Default**: SQLite (file-based), production-ready for PostgreSQL/MySQL
- **Content Types**: None defined yet - needs content types for skills, projects, bio, etc.
- **API Integration**: Frontend not yet consuming Strapi APIs

## Common Development Tasks

### Adding New Content Types in Strapi
1. Use Strapi admin panel or create in `/backend/src/api/[content-type]/`
2. Define schema in `content-types/[name]/schema.json`
3. Restart backend to register new content types

### Connecting Astro to Strapi
1. Add fetch calls in Astro pages/components
2. Replace `dummyData` with API calls to `http://localhost:1337/api/`
3. Handle loading states and error cases
4. Consider environment variables for API base URL

### Database Configuration
Environment variables in `/backend/.env`:
- `DATABASE_CLIENT` - sqlite/mysql/postgres
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME` - for MySQL/PostgreSQL
- `DATABASE_URL` - connection string for PostgreSQL

### Testing Individual Components
- **Frontend**: Navigate to http://localhost:4321 after `npm run dev:frontend`
- **Backend API**: Test endpoints with curl or Postman at http://localhost:1337/api/
- **Strapi Admin**: Access content management at http://localhost:1337/admin