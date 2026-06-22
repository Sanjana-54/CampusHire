# 🚀 CampusHire Backend — Smart Placement Tracker

This is the backend service for **CampusHire**, a smart placement tracking application. It is built on the Node.js runtime using Express.js and MongoDB (via Mongoose) to manage students, placement drives, applications, and real-time status notifications.

---

## 🛠️ Tech Stack & Key Libraries
*   **Runtime:** Node.js (ES Modules format)
*   **Framework:** Express.js (v5.2.1)
*   **Database:** MongoDB via Mongoose (v9.6.2)
*   **Authentication:** JSON Web Tokens (JWT) with HTTP-only cookie storage
*   **Security:** Password hashing via Bcryptjs
*   **Utilities:** CORS, Cookie Parser, Dotenv, Nodemailer

---

## 🔄 Overall Backend Flow & Functionality
The backend exposes RESTful APIs consumed by the frontend, structured cleanly into controllers, schemas, and middleware.

*   **Role-Based Security:** Supports two roles: `student` and `admin`. Admin registration is locked behind a secure secret passkey.
*   **Authentication Flow:** Registers users with hashed passwords, verifies credentials, generates JWTs, and sends them via secure `httpOnly` cookies to prevent XSS attacks.
*   **Eligibility Engine:** Automatically filters and shows companies to students based on matching CGPA thresholds and allowed engineering branches.
*   **State Machine for Applications:** Tracks the lifecycle of student job applications through recruitment rounds (e.g., Round 1, Round 2) and states (`Applied`, `Shortlisted`, `Selected`, `Rejected`).
*   **Notification Dispatcher:** Automatically pushes in-app notifications to students whenever an admin updates their placement status or shortlist status.

---

## 🛡️ Middleware Architecture
Middlewares act as handlers in the request-response pipeline. The backend utilizes both built-in, third-party, and custom-written middlewares:

### 1. Global & Third-Party Middlewares
*   `cors()`: Configured with credentials enabled to securely accept cross-origin requests from local React applications (`http://localhost:5173`) and production URLs.
*   `cookieParser()`: Parses incoming cookies to extract the authorization JWT.
*   `express.json()`: Parses incoming JSON payloads in request bodies.

### 2. Custom Middlewares
*   **`verifyToken(...allowedRoles)`**:
    *   Extracts the token from `req.cookies.token`.
    *   Verifies the token signature using the server's `SECRET_KEY`.
    *   Checks if the user's role is authorized to access the specific route.
    *   Attaches the decoded user metadata (`req.user`) to the request object.
*   **Invalid Path Handler (404)**: Catches undefined route endpoints and returns a clean invalid path response.
*   **Global Error Handler**: Centralized handler that intercepts thrown errors:
    *   Formatting validation errors (`ValidationError`) and parsing errors (`CastError`).
    *   Detecting MongoDB duplicate key errors (code `11000`) to send user-friendly "already exists" conflicts.
    *   Catching uncaught exceptions and returning a `500 Server Side Error`.

---

## 💾 Database Schemas (Models)
The system stores data in four interconnected collections:

| Model | Purpose | Key Fields |
| :--- | :--- | :--- |
| **`Student`** | Users in the system | Name, Email, Password, Branch, CGPA, Phone, Resume Link, Role |
| **`Company`** | Recruitment drives | Company Name, Role, Package, Drive Date, Last Date, Min CGPA, Allowed Branches |
| **`Application`** | Placement submissions | Student ID (Ref), Company ID (Ref), Round, Status (`Applied`, `Shortlisted`, etc.) |
| **`Notification`** | Alerts for status updates | Student ID (Ref), Company Name, Update Type, Message, Read/Unread Flag |

---

## 🔌 API Route Summary

### Student API (`/students`)
*   `POST /register` | Registers a student or admin (checks admin key)
*   `POST /login` | Authenticates user and issues HTTP-Only Cookie
*   `POST /apply` | Submits application for a company (Auth Required)
*   `GET /eligible-companies/:id` | Lists companies matching student's branch/CGPA
*   `GET /dashboard-stats/:id` | Returns counts of eligible, applied, and selected drives
*   `GET /application-progress/:id` | Returns breakdown of application states
*   `GET /notifications/:id` | Fetches student-specific alerts sorted by date
*   `PUT /update-profile/:id` | Updates profile fields (CGPA, Branch, Resume, etc.)

### Admin API (`/admin`)
*   `POST /add-company` | Creates a new placement drive (Admin Auth Required)
*   `GET /students` | Lists all registered students
*   `GET /companies` | Lists all registered companies
*   `GET /eligible-students/:companyId` | Fetches students meeting minimum criteria for a drive
*   `PATCH /update-status/:id` | Updates application status & fires a notification alert
*   `PUT /application-round/:id` | Transitions student to a new round
*   `GET /dashboard-stats` | Aggregates global system counts (Students, Drives, Selections)
*   `GET /analytics` | Calculates overall placement percentage across the campus

---

## 🚀 Setup & Launch

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment variables (`.env`):**
   ```env
   PORT=4000
   DB_URL=<your-mongodb-uri>
   SECRET_KEY=<jwt-secret-key>
   ```
3. **Start the server:**
   *   **Development Mode:** `npm run dev` (Runs Nodemon)
   *   **Production Mode:** `npm start` (Runs standard Node)
