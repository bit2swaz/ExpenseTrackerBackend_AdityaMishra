# Expense Tracker Backend

A robust backend API for tracking personal expenses, built with Node.js, Express, MongoDB, and Firebase Authentication.

## Features
- **User Authentication**: Secure registration and login via Firebase.
- **Expense Management**: CRUD operations for expenses.
- **Reporting**: Aggregated monthly reports and category filtering.
- **Security**: JWT verification and protected routes.
- **Validation**: Input validation using `express-validator`.

## Tech Stack
- Node.js & Express.js
- MongoDB (Mongoose)
- Firebase Admin SDK
- Postman (Testing)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bit2swaz/ExpenseTrackerBackend_AdityaMishra.git
   cd ExpenseTrackerBackend_AdityaMishra
   ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_CLIENT_EMAIL=your_client_email
    FIREBASE_PRIVATE_KEY="your_private_key"
    FIREBASE_WEB_API_KEY=your_web_api_key
    ```

4.  **Run the Server:**

    ```bash
    # Development Mode
    npm run dev

    # Production
    npm start
    ```

## API Documentation

See `postman_collection.json` for ready-to-use requests.

### Example Endpoints

  - `POST /api/register` - Create account
  - `GET /api/expenses` - Get user expenses (Auth required)
  - `GET /api/reports/monthly?month=10&year=2023` - Get October 2023 report
