# Multi-User Blog REST API

A RESTful API built with Node.js, Express.js, and MongoDB that allows users to register, authenticate, create and manage blog posts, upload images, search posts, and filter posts by category.

The API also includes role-based access control with an administrator role for user management and post moderation.

## Features

### Authentication & User Management
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Secure HTTP-only authentication cookie
- View, update, and delete user profiles

### Blog Post Management
- Create, read, update, and delete blog posts
- Associate posts with their authors
- Upload images using Multer
- Search posts by title or content
- Filter posts by category
- Automatic creation and update timestamps
- Authorization to ensure users can modify only their own posts

### Admin Features
- Role-based access control
- Retrieve all registered users
- Delete any blog post as an administrator

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer
- Cookie-parser
- dotenv
- Postman

## Project Structure

```text
MultiUserBlogRestApi/
├── src/
│   ├── controllers/
│   │   ├── usercontroller.js
│   │   └── postcontroller.js
│   ├── models/
│   │   ├── usermodel.js
│   │   └── postmodel.js
│   ├── routers/
│   │   ├── userRouter.js
│   │   └── postRouter.js
│   └── middlewares/
│       ├── authmiddleware.js
│       ├── adminmiddleware.js
│       └── uploadmiddleware.js
├── uploads/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/AbuRumaysoh/Multi-User-Blog-REST-API.git
```

### 2. Navigate to the project directory

```bash
cd MultiUserBlogRestApi
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and provide the following:

```env
databaseURL=YOUR_MONGODB_CONNECTION_STRING
JWT_secret=YOUR_JWT_SECRET
```

Replace the placeholder values with your own credentials.

**Do not commit your `.env` file or expose your database credentials.**

### 5. Run the application

```bash
npm run dev
```

The API will run locally on port `4040`, unless configured otherwise.

## API Endpoints

Base URL:

```text
http://localhost:4040/api/v1
```

### Authentication & User Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login a user | Public |
| GET | `/profile` | Retrieve user profile | Authenticated |
| PATCH | `/profile` | Update user profile | Authenticated |
| DELETE | `/profile` | Delete user account | Authenticated |

### Blog Post Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/posts` | Retrieve all posts | Public |
| GET | `/posts/:id` | Retrieve a single post | Public |
| POST | `/posts` | Create a blog post | Authenticated |
| PATCH | `/posts/:id` | Update a blog post | Author |
| DELETE | `/posts/:id` | Delete a blog post | Author |

### Search & Filtering

The API supports searching posts and filtering by category using query parameters.

Example:

```text
GET /api/v1/posts?search=technology
GET /api/v1/posts?category=Technology
GET /api/v1/posts?search=technology&category=Technology
```

### Admin Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/users` | Retrieve all registered users | Admin |
| DELETE | `/admin/posts/:id` | Delete any blog post | Admin |

## Image Uploads

Blog post images are uploaded using Multer.

- Supported uploads are image files.
- Maximum file size: 5 MB.
- Uploaded images are stored in the `uploads/` directory.
- Images can be accessed through the `/uploads/` route.

## Authentication & Authorization

The API uses JWT for authentication and role-based access control.

User roles:
- `user` — can create and manage their own blog posts.
- `admin` — can retrieve registered users and delete any blog post.

Passwords are hashed before being stored in the database. Authentication tokens are stored in HTTP-only cookies.

## Testing

The API was tested using Postman.

Testing includes:
- User registration and login
- Authentication and protected routes
- Profile management
- Blog post CRUD operations
- Search and category filtering
- Image uploads and invalid file rejection
- Author ownership restrictions
- Admin-only access and post moderation

## Author

**AbdulRahman Yusuf**

## Project

Backend Development Capstone Project — Multi-User Blog REST API
