# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Architecture Overview

This is a personal website project built with a **monorepo structure** containing:

- **Frontend**: Astro v5.13.7 static site generator with TypeScript and Layout components
- **Backend**: Strapi v5.23.4 headless CMS with SQLite database
- **Current State**: Fully integrated - frontend consumes Strapi API for home page content

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
- **Pages**: `src/pages/` - File-based routing with `index.astro` home page
- **Layouts**: `src/layouts/Layout.astro` - Reusable layout component with shared HTML/CSS
- **API Utils**: `src/lib/strapi.js` - Centralized Strapi API calls
- **Config**: `astro.config.mjs` - Minimal Astro configuration
- **Environment**: `.env` - Contains STRAPI_URL and STRAPI_API_KEY

### Backend (`/backend/`)
- **Config**: `/config/` - Database, server, plugins, and middleware configurations
- **Content Types**: `/src/api/home-page/` - Home page single type with heading, aboutBlurb, and gallery fields
- **Database**: Uses SQLite (`.tmp/data.db`) by default, configurable via environment variables
- **Generated Types**: `/types/generated/contentTypes.d.ts` - Auto-generated TypeScript definitions

### Integration Points
The Astro frontend now successfully consumes Strapi's RESTful API for dynamic content:
- **Home page** fetches data from `/api/home-page` endpoint
- **API authentication** using Bearer tokens (STRAPI_API_KEY)
- **Error handling** for API failures with fallback content

## Key Technical Details

- **Node.js Requirements**: Frontend requires 22.x, Backend supports 18.x-22.x
- **TypeScript**: Both projects use TypeScript for type safety
- **Database Default**: SQLite (file-based), production-ready for PostgreSQL/MySQL
- **Content Types**: Home page single type implemented with heading, aboutBlurb, and gallery fields
- **API Integration**: Frontend successfully consumes Strapi APIs with authentication

## Common Development Tasks

### Adding New Content Types in Strapi
1. Use Strapi admin panel or create in `/backend/src/api/[content-type]/`
2. Define schema in `content-types/[name]/schema.json`
3. Restart backend to register new content types

### Frontend Architecture Patterns
1. **Layout Component**: `src/layouts/Layout.astro` provides reusable HTML structure and global CSS
2. **API Utilities**: `src/lib/strapi.js` centralizes API calls with authentication
3. **Environment Variables**: `.env` file for STRAPI_URL and STRAPI_API_KEY configuration
4. **Error Handling**: Graceful fallback for API failures in page components

### Environment Setup
Both frontend and backend require environment configuration:

**Frontend** (`.env`):
```bash
STRAPI_URL=http://localhost:1337
STRAPI_API_KEY=your_api_key_here
```

**Backend** (`.env`):
```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="key1,key2"
API_TOKEN_SALT=random_string
ADMIN_JWT_SECRET=random_string
TRANSFER_TOKEN_SALT=random_string
JWT_SECRET=random_string
ENCRYPTION_KEY=32_char_key
```

### Database Configuration
Environment variables in `/backend/.env`:
- `DATABASE_CLIENT` - sqlite/mysql/postgres
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME` - for MySQL/PostgreSQL
- `DATABASE_URL` - connection string for PostgreSQL

### Testing Individual Components
- **Frontend**: Navigate to http://localhost:4321 after `npm run dev:frontend`
- **Backend API**: Test endpoints with curl or Postman at http://localhost:1337/api/
- **Strapi Admin**: Access content management at http://localhost:1337/admin

### Testing the Integrated System
1. **Start both servers**: `npm run dev` (runs both frontend and backend)
2. **Add content**: Go to http://localhost:1337/admin and populate the Home Page content
3. **View result**: Navigate to http://localhost:4321 to see dynamic content
4. **Test API directly**: `curl "http://localhost:1337/api/home-page?populate=*"`
