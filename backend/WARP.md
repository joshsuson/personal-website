# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Backend Architecture

This is a **Strapi v5.23.4** headless CMS backend built with **TypeScript** that serves as the content management layer for the personal website. The backend provides RESTful APIs for the Astro frontend to consume.

### Key Technologies
- **Strapi v5.23.4** - Headless CMS framework
- **TypeScript** - Type safety with CommonJS modules
- **SQLite** - Default database (configurable to MySQL/PostgreSQL)
- **better-sqlite3** - SQLite driver

### Node.js Requirements
- Node.js: `>=18.0.0 <=22.x.x`
- npm: `>=6.0.0`

## Development Commands

### Daily Development
```bash
npm run dev          # Start Strapi with auto-reload (alias for develop)
npm run develop      # Start Strapi with auto-reload enabled
npm run start        # Start Strapi without auto-reload (production mode)
```

### Building & Deployment
```bash
npm run build        # Build admin panel
npm run deploy       # Deploy using Strapi deploy command
```

### Strapi CLI Access
```bash
npm run strapi       # Access Strapi CLI directly
npm run console      # Start Strapi interactive console
```

### Upgrades
```bash
npm run upgrade:dry  # Check for available Strapi updates (dry run)
npm run upgrade      # Upgrade to latest Strapi version
```

## Project Structure

### Configuration (`/config/`)
- **`server.ts`** - Server configuration (host, port, app keys)
- **`database.ts`** - Multi-database support (SQLite/MySQL/PostgreSQL)
- **`api.ts`** - REST API configuration (pagination limits)
- **`middlewares.ts`** - Standard Strapi middleware stack
- **`plugins.ts`** - Plugin configuration (currently empty)
- **`admin.ts`** - Admin panel authentication and security settings

### Content Types (`/src/api/`)
- **`home-page/`** - Single type content with heading, aboutBlurb, and gallery fields
  - Uses TypeScript-compatible field names (camelCase)
  - API available at `/api/home-page`
  - Supports multiple media uploads in gallery field

### Application Bootstrap (`/src/`)
- **`index.ts`** - Application lifecycle hooks (register/bootstrap)
- **`admin/`** - Custom admin panel configurations (examples only)
- **`extensions/`** - Custom Strapi extensions (placeholder)

### Generated Types (`/types/generated/`)
- **`contentTypes.d.ts`** - Auto-generated TypeScript definitions for all content types
- **`components.d.ts`** - Component type definitions

### Database & Storage
- **`database/migrations/`** - Database migration files
- **`.tmp/`** - Runtime data including SQLite database file
- **`dist/`** - Compiled TypeScript output

## Environment Configuration

### Required Environment Variables (`.env`)
```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="key1,key2"              # Application encryption keys
API_TOKEN_SALT=random_string      # API token security
ADMIN_JWT_SECRET=random_string    # Admin authentication
TRANSFER_TOKEN_SALT=random_string # Data transfer security
JWT_SECRET=random_string          # General JWT security
ENCRYPTION_KEY=32_char_key        # Data encryption
```

### Database Configuration
```bash
DATABASE_CLIENT=sqlite            # sqlite/mysql/postgres
DATABASE_FILENAME=.tmp/data.db    # SQLite file path
DATABASE_URL=connection_string    # PostgreSQL connection string
DATABASE_HOST=localhost           # MySQL/PostgreSQL host
DATABASE_PORT=3306                # MySQL port (5432 for PostgreSQL)
DATABASE_NAME=strapi             # Database name
DATABASE_USERNAME=strapi         # Database user
DATABASE_PASSWORD=strapi         # Database password
```

## Content Management

### Admin Panel
- **URL**: http://localhost:1337/admin
- **First Run**: Create admin user account
- **Content Types**: Manage via Content-Type Builder
- **Content**: Edit via Content Manager

### API Endpoints
- **Base URL**: http://localhost:1337/api
- **Home Page**: GET `/api/home-page` (single type)
- **With Population**: GET `/api/home-page?populate=*` (includes gallery media)
- **Authentication**: Use API tokens for programmatic access

## Development Workflows

### Creating New Content Types
1. **Via Strapi CLI**: Use the interactive generator
   ```bash
   npm run strapi -- generate
   ```
   This launches an interactive prompt to create APIs, content types, controllers, etc.

2. **Via Admin Panel**: Use Content-Type Builder for visual creation
   - Navigate to http://localhost:1337/admin
   - Go to Content-Type Builder
   - Create new Collection Type or Single Type
   - Add fields and configure options
   - Save (auto-generates files)

3. **Restart backend** to register new content types
4. **Check `/types/generated/contentTypes.d.ts`** for auto-generated types
5. **Generate TypeScript types** with `npm run strapi -- ts:generate-types`

**Important Notes**:
- Content types are automatically generated as code files in `/src/api/[content-type]/` but should be created through CLI or admin panel, not by manually editing files
- **Field Names**: Use camelCase or underscores, avoid hyphens (e.g., `aboutBlurb` not `about-blurb`) for TypeScript compatibility
- Always regenerate types after creating or modifying content types

### Database Schema Changes
- **Development**: Changes via admin panel auto-migrate
- **Production**: Use `database/migrations/` for controlled migrations
- **Reset**: Delete `.tmp/` folder to reset SQLite database

### Testing API Endpoints
```bash
# List all content types
npm run strapi -- content-types:list

# Test home page endpoint
curl http://localhost:1337/api/home-page

# With populated gallery
curl "http://localhost:1337/api/home-page?populate=*"

# With authentication (if required)
curl -H "Authorization: Bearer YOUR_API_KEY" "http://localhost:1337/api/home-page?populate=*"
```

### Switching Database Providers
1. **Update** `DATABASE_CLIENT` in `.env`
2. **Install** appropriate driver (`mysql2`, `pg`)
3. **Configure** connection parameters in `config/database.ts`
4. **Restart** backend to apply changes

### Content Staging
- Content types with `draftAndPublish: true` support draft/published states
- Use admin panel to publish/unpublish content
- API returns only published content by default
- Add `&publicationState=preview` to include drafts

## Integration Points

### Frontend Integration
- **API Base URL**: `http://localhost:1337/api/`
- **CORS**: Configured in middlewares for cross-origin requests
- **Authentication**: Use API tokens for secure access
- **Content Fetching**: Replace frontend dummy data with Strapi API calls

### Common Content Types Needed
Based on typical personal website requirements:
- **Bio/About** (single type) - Personal information, bio text, profile image
- **Skills** (collection) - Technical skills with categories and proficiency levels
- **Projects** (collection) - Portfolio projects with descriptions, images, links
- **Experience** (collection) - Work experience with dates and descriptions
- **Blog Posts** (collection) - If blog functionality is needed

### Performance Considerations
- **Pagination**: Default 25 items, max 100 (configured in `config/api.ts`)
- **Population**: Use `populate` parameter judiciously to avoid over-fetching
- **Image Optimization**: Use Strapi's media library for responsive images
- **Caching**: Consider Redis/CDN for production deployments