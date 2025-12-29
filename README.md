# BlogSpace – MERN Blog Platform

BlogSpace is a full-stack MERN blog application with role-based authentication, where admins manage blogs and users interact with content through likes and comments.

The project is designed with a backend-first focus, clean architecture, and real-world best practices.

## Features

### User
- Register and Login using JWT authentication
- View all blogs
- Like and unlike blogs
- Comment on blogs
- Share blog links

### Admin
- Secure Admin Login
- Create, Update, Delete blogs
- Add blogs with image, GIF, or video URL
- View all blogs in Admin Dashboard

## Tech Stack

Frontend:
- React.js
- React Router
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## Authentication and Authorization

- JWT-based authentication
- Role-based access control
- Admin for blog management
- User for likes and comments
- Protected routes using middleware
- Passwords are hashed and never returned in API responses

## Backend Structure

backend/
controllers/
authController.js
adminController.js
blogController.js

models/
User.js
Admin.js
Blog.js

routes/
authRoutes.js
blogRoutes.js

middleware/
authMiddleware.js
adminMiddleware.js

config/
db.js

server.js
.env

## Environment Variables

Create a .env file in the backend directory and add:

PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Run Locally

Backend:
npm install
npm run dev

Frontend:
npm install
npm run dev

## Design Decisions

- Separate Admin and User authentication
- Embedded comments inside Blog schema
- No auto-login on registration
- Minimal Admin UI with backend focus
- Browser autofill disabled for admin login

## Deployment

- Frontend hosted on Vercel
- Backend hosted on Vercel or Render
- MongoDB Atlas for database

## Notes

- Admin accounts are created manually in the database
- Image uploads are handled via URL input
- Focus is on backend logic and architecture

## Author

Om Italiya  
Final-year Computer Engineering student  
Aspiring MERN Stack Developer

## Final Remark

This project demonstrates clean backend architecture, role-based authentication, secure JWT handling, and practical MERN stack usage.
