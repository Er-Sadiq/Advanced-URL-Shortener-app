# Advanced URL Shortener

## Overview

An advanced URL Shortener backend built using **Node.js** and **Express.js**. This project implements robust user authentication and authorization with **JWT** and session management with **Redis**. It also supports advanced analytics and uses **MongoDB** as the database for storing URLs and user data.

---

## Features

- **User Authentication and Authorization:**
  - JWT-based authentication.
  - Redis integration for managing sessions.

- **URL Shortening:**
  - Generate unique short URLs.

- **Analytics:**
  - Track and analyze usage metrics for each shortened URL.

- **Database:**
  - MongoDB for data persistence.

---

## API Endpoints

### Authentication

#### `POST /`
**Sign-Up Endpoint**
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "userId": "uniqueUserId"
  }
  ```

#### `POST /login`
**Login Endpoint**
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwtTokenString"
  }
  ```

---

### URL Shortening

#### `POST /shorten`
**Shorten URL Endpoint**
- **Description:** Creates a shortened URL for a given long URL. Only accessible to logged-in users.
- **Middleware:** `restrictToLoggedinUserOnly`
- **Request Body:**
  ```json
  {
    "longUrl": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "URL shortened successfully",
    "shortUrl": "http://localhost:3000/shorten/abc123"
  }
  ```

#### `GET /shorten/:shortId`
**Redirect to Original URL Endpoint**
- **Description:** Redirects to the original URL for a given short ID.
- **Response:** Redirects the user to the long URL.

---

### Analytics

#### `GET /analytics/:shortId`
**Analytics Endpoint**
- **Description:** Retrieves usage analytics for a given shortened URL. Only accessible to logged-in users.
- **Middleware:** `restrictToLoggedinUserOnly`
- **Response:**
  ```json
  {
    "shortId": "abc123",
    "clickCount": 120,
    "user": "uniqueUserId",
    "createdAt": "2023-01-01T00:00:00Z",
    "lastAccessed": "2023-01-10T15:45:00Z"
  }
  ```

---

## Technology Stack

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Session Management:** Redis

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/advanced-url-shortener.git
   cd advanced-url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/urlShortener
   JWT_SECRET=your_jwt_secret
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## Usage

### Development
Start the server in development mode with hot reloading:
```bash
npm run dev
```

### Testing
Run tests to ensure functionality:
```bash
npm test
```

---

## Folder Structure
```
advanced-url-shortener/
├── controllers/
│   ├── authController.js
│   ├── urlController.js
│   └── analyticsController.js
├── middlewares/
│   ├── authMiddleware.js
├── models/
│   ├── userModel.js
│   ├── urlModel.js
├── routes/
│   ├── authRoutes.js
│   ├── urlRoutes.js
├── utils/
│   ├── jwtUtils.js
│   ├── redisUtils.js
├── .env
├── Index.js
└── package.json
```

---

## demo
![shorten](https://github.com/user-attachments/assets/239fe86c-ac41-4b34-97f3-a37af8c469fe)

![analytics](https://github.com/user-attachments/assets/a3b04163-6323-46dc-ade0-305d3aeab5ab)


## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit your changes.
4. Push to your fork.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, contact [your.email@example.com](mailto:your.email@example.com).

