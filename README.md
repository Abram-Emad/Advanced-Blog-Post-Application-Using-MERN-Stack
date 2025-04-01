markdown
# Advanced Blog Post Application Using MERN Stack

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.17.1-success)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-brightgreen)
![License](https://img.shields.io/badge/License-MIT-orange)

A feature-rich blog post application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to create, read, update, and delete blog posts, interact with content via comments, and manage categories. Includes robust authentication, rich text editing, search functionality, and an admin dashboard.

## Features

### User Authentication
- **JWT-Based Authentication**: Secure user registration/login with JSON Web Tokens.
- **Protected Routes**: Access control for authenticated users and admin-only routes.
- **Password Recovery**: Nodemailer integration for password reset via email.

### Blog Post Management
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Rich Text Editor**: React Quill integration for advanced content formatting.
- **Image Uploads**: Cloudinary support for uploading and storing post thumbnails.
- **Categories**: Organize posts into customizable categories (admin-only).

### User Interaction
- **Comments**: Authenticated users can comment on posts.
- **Search Functionality**: Filter posts by keywords, categories, or authors.
- **Pagination**: Efficiently browse through posts with paginated results.

### Admin Dashboard
- **User Management**: View/delete users and promote admins.
- **Content Moderation**: Manage posts, categories, and comments.

### Additional Features
- **Responsive Design**: Tailwind CSS for mobile-friendly UI.
- **State Management**: Redux Toolkit for efficient client-side state handling.
- **Error Handling**: Custom error middleware for API routes.

## Technologies

### Frontend
- **React 18**
- **Redux Toolkit**
- **React Router 6**
- **Axios**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **JSON Web Tokens** (JWT)
- **Cloudinary** (Image Storage)
- **Nodemailer** (Email Service)

## Installation

1. **Clone the Repository**
   bash
   git clone https://github.com/Abram-Emad/Advanced-Blog-Post-Application-Using-MERN-Stack.git
   cd Advanced-Blog-Post-Application-Using-MERN-Stack
   

2. **Install Dependencies**
   # Backend dependencies
   cd application-backend && npm install

   # Frontend dependencies
   cd application-frontend && npm install
   

## Configuration

1. **Environment Variables**  
   Create a `.env` file in the `server` directory:
   env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   

2. **Cloudinary Setup**  
   Sign up at [Cloudinary](https://cloudinary.com/) and add your credentials to `.env`.

3. **Email Service**  
   Use a Gmail account with [App Passwords](https://myaccount.google.com/apppasswords) for Nodemailer.

## Running the Application

1. **Start the Backend Server**
   cd application-backend
   npm run start
   
   The server will run on `http://localhost:8000`.

2. **Start the Frontend**
   cd application-frontend
   npm run start
   
   Access the app at `http://localhost:3000`.

## API Endpoints

| Endpoint                | Method | Description                     |
|-------------------------|--------|---------------------------------|
| `/api/users`            | POST   | Register user                   |
| `/api/users/login`      | POST   | Login user                      |
| `/api/users/profile`    | GET    | Get user profile                |
| `/api/posts`            | GET    | Get all posts (paginated)       |
| `/api/posts/:id`        | GET    | Get single post                 |
| `/api/posts`            | POST   | Create new post (authenticated) |
| `/api/posts/:id`        | PUT    | Update post (author/admin)      |
| `/api/posts/:id`        | DELETE | Delete post (author/admin)      |
| `/api/categories`       | GET    | Get all categories              |
| `/api/categories`       | POST   | Create category (admin-only)    |
| `/api/comments/:postId` | POST   | Add comment to post             |

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Developed by [Abram Emad](https://github.com/Abram-Emad).
- Inspired by modern blogging platforms.
- Thanks to the open-source community for libraries and tools used.
