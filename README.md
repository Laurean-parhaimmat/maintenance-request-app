# Maintenance Request Application

A full-stack maintenance request application for residents and maintenance administrators.

Residents can create and track their own maintenance requests, while administrators can view all requests and update their status.

The application includes authentication, role-based access control, validation, a MongoDB database, and separate frontend and backend deployments.

## Live Application

**Frontend:**  
https://maintenance-request-frontend.onrender.com


> The services are hosted on Render's free tier, so the backend may take a short moment to start after a period of inactivity.

---

## Features

### Residents

Residents can:

- Register a new account
- Log in securely
- Create maintenance requests
- View their own maintenance requests
- View request details
- Filter requests by status
- Track the status of submitted requests

New users are automatically assigned the `user` role.

### Administrators

Administrators can:

- Log in using an administrator account
- View maintenance requests from all users
- Filter and sort maintenance requests
- View individual request details
- Change the status of maintenance requests

Administrators cannot edit the content of a maintenance request. They can only manage its status.

---

## Maintenance Request Statuses

The application uses the following statuses:

| Status | Description |
|---|---|
| `new` | A newly submitted maintenance request |
| `in progress` | The request is currently being handled |
| `resolved` | The maintenance issue has been resolved |

The normal request lifecycle is:

`new` → `in progress` → `resolved`

---

## Maintenance Categories

Maintenance requests can use the following categories:

| Value | Category |
|---|---|
| `electricity` | Electricity |
| `water` | Water |
| `heating` | Heating |
| `doors_locks` | Doors and locks |
| `other` | Other |

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Better Auth client
- Lucide React
- Vitest
- Testing Library

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Better Auth
- Better Auth MongoDB Adapter
- Zod
- CORS

### Deployment

- Render Static Site – frontend
- Render Web Service – backend
- MongoDB Atlas – database

---

## Authentication and Authorization

Authentication is handled with **Better Auth**.

The backend uses the Better Auth MongoDB adapter and the Better Auth admin plugin.

Two application roles are currently used:

| Role | Access |
|---|---|
| `user` | Can manage their own maintenance requests |
| `admin` | Can view all maintenance requests and change their status |

New users are assigned the `user` role automatically.

Users cannot assign themselves the `admin` role during registration.

Protected backend routes verify the active Better Auth session before allowing access.

The production frontend and backend are deployed as separate Render services. Authentication cookies are configured with secure cross-site cookie settings for the production environment.

---

Validation

The application uses Zod on both the frontend and backend.

Frontend Validation

The frontend uses Zod together with React Hook Form and zodResolver.

Zod schemas are used for client-side validation on authentication forms such as:

Login

Registration

Email format

Password requirements

Required form fields

This allows invalid input to be detected before a request is sent to the backend and provides immediate validation feedback to the user.

Backend Validation

The backend uses Zod to validate incoming maintenance request API data.

Backend validation is used for:

Creating maintenance requests

Updating maintenance requests

Updating maintenance request status

Validating maintenance request IDs

Validating allowed maintenance categories

Validating allowed maintenance statuses

The backend does not rely only on frontend validation. Incoming API data is validated again on the server before it is processed or stored in MongoDB.

Invalid requests return an appropriate HTTP error response instead of being written directly to the database.

---

## Database

The application uses **MongoDB Atlas**.

Maintenance requests contain data such as:

- User ID
- Title
- Description
- Category
- Building address
- Apartment number
- Status
- Creation date
- Update date

Each maintenance request is associated with the authenticated user who created it.

Better Auth also stores authentication-related data in MongoDB.

---

## API

The backend is available under:

```text
https://maintenance-request-backend.onrender.com
```

### Authentication

Better Auth endpoints are mounted under:

```text
/api/auth/*
```

Examples include:

```text
POST /api/auth/sign-up/email
POST /api/auth/sign-in/email
GET  /api/auth/get-session
```

### Maintenance Requests

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/maintenance` | Create a maintenance request |
| `GET` | `/api/maintenance` | Get maintenance requests |
| `GET` | `/api/maintenance/:id` | Get a single maintenance request |
| `PATCH` | `/api/maintenance/:id` | Update a user's maintenance request |
| `PATCH` | `/api/maintenance/:id/status` | Update request status as admin |
| `DELETE` | `/api/maintenance/:id` | Delete a maintenance request |

All maintenance request routes require authentication.

For `GET /api/maintenance`:

- A regular user receives only their own requests.
- An administrator receives all requests.

For `PATCH /api/maintenance/:id/status`:

- Only administrators are allowed to update the status.

---

## Project Structure

```text
maintenance-request-app/
│
├── backend/
│   ├── config/
│   ├── constants/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validation/
│   ├── auth.ts
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── tests/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## Local Development

### Requirements

Before running the application locally, install:

- Node.js
- npm
- MongoDB Atlas database or another compatible MongoDB instance

Clone the repository:

```bash
git clone https://github.com/Laurean-parhaimmat/maintenance-request-app.git
cd maintenance-request-app
```

---

## Backend Setup

Move to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_key
PORT=5000
```

Do not commit `.env` files or secret values to GitHub.

Start the backend development server:

```bash
npm run dev
```

The backend runs by default at:

```text
http://localhost:5000
```

Build the backend:

```bash
npm run build
```

Start the compiled backend:

```bash
npm start
```

---

## Frontend Setup

Open another terminal and move to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_REACT_APP_BETTER_AUTH_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend runs by default at:

```text
http://localhost:5173
```

---

## Testing

Frontend tests use **Vitest** and **Testing Library**.

Run the tests from the frontend directory:

```bash
npm test
```

Build the frontend with:

```bash
npm run build
```

Run the frontend linter with:

```bash
npm run lint
```

---

## Production Deployment

The project is deployed to Render using two separate services.

### Frontend

The frontend is deployed as a Render **Static Site**.

Build command:

```bash
cd frontend && npm ci && npm run build
```

Publish directory:

```text
frontend/dist
```

Production environment variable:

```env
VITE_REACT_APP_BETTER_AUTH_URL=https://maintenance-request-backend.onrender.com
```

### Backend

The backend is deployed as a Render **Web Service**.

Build command:

```bash
cd backend && npm ci && npm run build
```

Start command:

```bash
cd backend && npm start
```

The backend requires production environment variables for MongoDB, Better Auth and the frontend URL.

Production secrets such as `MONGODB_URI` and `BETTER_AUTH_SECRET` must only be stored in Render's environment variable configuration and must never be committed to the repository.

---

## Security

The application currently includes several security measures:

- Better Auth session-based authentication
- Role-based authorization
- Protected maintenance request API routes
- Server-side Zod validation
- Users can only access their own maintenance requests
- Administrator-only status updates
- Secure HTTP-only authentication cookies
- CORS restricted to the configured frontend origin
- Authentication secrets stored in environment variables
- MongoDB credentials stored outside the source code

---

## Current Status

The application currently supports the complete basic maintenance request workflow:

`Registration → Login → Create Request → Track Request → Admin Processing → Resolved`

Both the frontend and backend are deployed and connected to MongoDB Atlas.
