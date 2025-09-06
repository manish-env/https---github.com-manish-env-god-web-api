# Genre of Design - Public API

This is the public API server for the Genre of Design client landing page. It provides read-only access to projects, jobs, and handles form submissions for contact messages and vendor registrations.

## Purpose

This API is designed to serve the client-facing website with:
- **Read-only data**: Projects, job postings, and other public content
- **Form submissions**: Contact messages and vendor registrations
- **No admin operations**: All CRUD operations are handled by a separate admin API

## Project Structure

```
web-api/                    # Public API (Node.js + Express)
├── config/                 # Database configuration
├── controllers/            # Public API Controllers (read-only + form submissions)
├── middleware/             # Validation middleware only
├── models/                 # Sequelize ORM models
├── routes/                 # Public API routes only
├── uploads/                # File uploads directory
├── server.js              # Main server file
└── package.json           # Dependencies
```

## Features

### Public API (Node.js + Express)
- **Read-only Operations**: Fetch projects, jobs, and other public data
- **Form Submissions**: Handle contact messages and vendor registrations
- **File Upload**: Support for vendor registration file uploads
- **Validation**: Input validation for form submissions
- **Security**: Helmet, CORS, rate limiting
- **No Authentication**: Public API with no admin access

## API Endpoints

### Projects (Read-only)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/types` - Get project types for filtering

### Jobs (Read-only + Applications)
- `GET /api/jobs` - Get all job postings
- `GET /api/jobs/:id` - Get single job posting
- `POST /api/jobs/apply` - Apply for job

### Contact
- `POST /api/contact/send` - Send contact message

### Vendors
- `POST /api/vendor/register` - Register vendor

## Installation & Setup

1. Navigate to the API directory:
```bash
cd god-mvc/web-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgres://username:password@localhost:5432/genre_of_design
SMTP_HOST=your-smtp-host
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
ADMIN_EMAIL=admin@genreofdesign.com
```

5. Start the server:
```bash
npm run dev
```

## Database Schema

The API uses the following entities for read-only access:

- **Projects**: Design portfolio items (read-only)
- **Job Postings**: Career opportunities (read-only)
- **Applicants**: Job application data (create only)
- **Contact Messages**: Customer inquiries (create only)
- **Vendor Registrations**: Business partnerships (create only)

## Key Features

### Public Data Access
- Project portfolio with filtering
- Job postings and applications
- No authentication required
- Optimized for client landing page

### Form Submissions
- Contact message handling with email notifications
- Vendor registration with file upload support
- Input validation and error handling
- Database storage for admin review

### Security
- Rate limiting for API protection
- CORS configuration for public access
- Input validation and sanitization
- File upload security

## Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Sequelize ORM**: Database operations
- **PostgreSQL**: Database
- **Express Validator**: Input validation
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Express File Upload**: File handling
- **Nodemailer**: Email notifications

## Development

### Running in Development Mode

```bash
cd god-mvc/web-api
npm run dev
```

The server will start on `http://localhost:3001`

### API Health Check

Visit `http://localhost:3001` to see the API status and available endpoints.

## Deployment

### Production Deployment
- Deploy to platforms like Heroku, DigitalOcean, AWS, etc.
- Set up PostgreSQL database
- Configure environment variables
- Set up file upload directory
- Configure CORS for your frontend domain

### Environment Variables
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_*`: Email configuration for notifications
- `ADMIN_EMAIL`: Admin email for notifications

## Architecture Separation

This public API is designed to work alongside a separate admin API that handles:
- User authentication and management
- CRUD operations for all entities
- Admin dashboard functionality
- Content management

The separation ensures:
- **Security**: Public API has no admin access
- **Performance**: Optimized for public consumption
- **Maintainability**: Clear separation of concerns
- **Scalability**: Independent scaling of public and admin services