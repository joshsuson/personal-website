# Personal Website

A modern personal website built with **Astro** (frontend) and **Strapi** (headless CMS backend).

## Project Structure

```
personal-website/
├── frontend/          # Astro frontend application
├── backend/           # Strapi CMS backend
├── package.json       # Root package.json with scripts
└── README.md         # This file
```

## Tech Stack

### Frontend (Astro)
- **Astro** v5.13.7 - Modern static site generator
- **TypeScript** - Type-safe JavaScript
- Responsive design with modern CSS
- Fast build times and optimized output

### Backend (Strapi)
- **Strapi** v5.23.4 - Headless CMS
- SQLite database (default)
- RESTful API
- Admin panel for content management

## Getting Started

### Prerequisites
- Node.js 22.x (LTS)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies for both frontend and backend:
   ```bash
   npm run install:all
   ```

### Development

#### Run both servers concurrently:
```bash
npm run dev
```

This will start:
- **Astro frontend** at http://localhost:4321
- **Strapi backend** at http://localhost:1337

#### Run servers individually:

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

## Features

### Current Features
- ✅ Modern, responsive design
- ✅ Skills showcase
- ✅ Project portfolio
- ✅ Mobile-friendly layout
- ✅ Gradient animations and hover effects

### Future Enhancements
- [ ] Connect Astro to Strapi API
- [ ] Dynamic content management
- [ ] Blog functionality
- [ ] Contact form
- [ ] SEO optimization
- [ ] Image optimization
- [ ] Dark mode toggle

## Strapi Admin

Once the backend is running, you can access the Strapi admin panel at:
http://localhost:1337/admin

Create your first admin user when prompted.

## Deployment

### Frontend (Astro)
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting provider

### Backend (Strapi)
The backend can be deployed to:
- Railway
- Heroku
- DigitalOcean
- Any Node.js hosting provider

## Development Notes

- Frontend uses Node.js 22.x (required for latest Astro features)
- Backend requires Node.js 18.x - 22.x (Strapi compatibility)
- Both projects use TypeScript for better development experience
- The frontend includes dummy data for initial demonstration

## License

MIT License