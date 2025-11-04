# VietAuAcademy - Overseas Education Promotion Website

VietAuAcademy is a web application designed to promote overseas study
programs for Vietnamese students. It provides detailed information about
study opportunities abroad, program highlights, and contact options for
interested students.

## Project Structure

- client: Frontend built with Next.js 15 and React 19

- server: Backend built with Express, TypeScript, MongoDB, and Redis

## Requirements

### Backend (Express)

- Node.js (version 18 or later)
- MongoDB (local or remote instance)
- Redis (for session management and caching)
- npm or yarn
- Docker and Docker Compose (optional, for containerized development)

### Frontend (Next.js)

- Node.js (version 18 or later)
- npm or yarn

## Installation Guide

### 1. Clone the project

```bash
git clone https://github.com/Hai1205/VietAuAcademy.git
cd VietAuAcademy
```

### 2. Setup and Run Backend

```bash
cd server

# Install dependencies
npm install
# or
yarn install

# Setup environment variables
cp .env.example .env
# Edit the .env file with your configuration

# Option 1: Start services with Docker
docker-compose up -d

# Option 2: Start development server
npm run dev
# or
yarn dev
```

The backend will run at http://localhost:4040

### 3. Setup and Run Frontend

```bash
cd client
npm install
# or
yarn install

# Run in development mode
npm run dev
# or
yarn dev
```

The frontend will run at http://localhost:3000

## Key Features

### 1. Program Information

- Browse available study abroad programs
- Detailed program descriptions
- Search and filter by country, field, or level of study

### 2. Student Services

- Guidance on application process
- Scholarship information
- Frequently Asked Questions (faq)

### 3. Contact & Support

- Inquiry forms
- Contact information for advisors
- Newsletter subscription

### 4. Admin Panel

- Manage study programs
- Manage inquiries and contacts
- Content management

## Technologies Used

### Backend

- Express (Node.js with TypeScript)
- MongoDB (with Mongoose ORM)
- Redis (for caching and session management)
- JWT Authentication
- Email service integration
- TypeScript
- Docker support
- Cloudinary (for image storage)
- RESTful API architecture
- Middleware-based security features

### Frontend

- Next.js 15 (with App Router)
- React 19
- TypeScript
- Tailwind CSS with shadcn/ui components
- Tanstack React Query
- Zod (validation)
- React Hook Form
- Zustand (state management)
- Framer Motion (animations)
- Next Themes (dark/light mode)
- Axios (API requests)

## Server Architecture

### Directory Structure

```
server/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose models
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   ├── utils/
│   │   ├── configs/      # Configuration files
│   │   ├── libs/         # Database connections and utilities
│   │   ├── services/     # Business logic services
│   │   └── types/        # TypeScript type definitions
│   └── index.ts          # Entry point
├── docker-compose.yml    # Docker services configuration
└── .env                  # Environment variables
```

### API Endpoints

The API follows RESTful conventions with these main endpoints:

- **Authentication**: `/api/v1/auth` - Registration, login, verification, and password management
- **Programs**: `/api/v1/programs` - Study abroad program information
- **Jobs**: `/api/v1/jobs` - Job opportunity listings
- **Blogs**: `/api/v1/blogs` - Blog articles and content
- **Contacts**: `/api/v1/contacts` - Contact form submissions and inquiries
- **FAQs**: `/api/v1/faqs` - Frequently asked questions

All endpoints are protected with security middleware including CORS protection, rate limiting, and injection guards.

## License

This project is licensed under the MIT License. See the
[LICENSE](LICENSE) file for details.

---

## Author: [Hai1205](https://github.com/hai1205)
