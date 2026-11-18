# Maintenance Request Application

A full-stack maintenance request application for residents and maintenance administrators.

Residents can create and track their own maintenance requests, while administrators can view requests from all users and manage their status.

The application includes authentication, role-based access control, frontend and backend validation, a MongoDB database, and separate frontend and backend deployments.

## Live Application

**Frontend:**  
https://maintenance-request-frontend.onrender.com

The frontend is deployed as a Render Static Site and the backend as a Render Web Service.

---

## Features

### Residents

Residents can:

- Register a new account
- Log in
- Create maintenance requests
- View their own maintenance requests
- Search maintenance requests
- Filter requests by status
- Sort requests by creation date
- View request details
- Track the status of submitted requests

New users are automatically assigned the `user` role.

The current frontend does not provide controls for editing or deleting maintenance requests, although the backend API supports these operations for requests owned by the authenticated user.

### Administrators

Administrators can:

- Log in using an administrator account
- View maintenance requests from all users
- Search maintenance requests
- Filter requests by status
- Sort requests by creation date
- View request statistics by status
- View individual request details
- Change the status of maintenance requests

The admin interface does not allow administrators to edit the content of a maintenance request.

The backend explicitly prevents administrators from using the general maintenance request update endpoint. Administrators use the dedicated status endpoint for status changes.

The backend API also allows administrators to delete maintenance requests, although deletion is not currently exposed as a control in the frontend.

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
- Oxlint

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Better Auth
- Better Auth MongoDB Adapter
- Better Auth Admin Plugin
- Zod
- CORS

### Deployment

- Render Static Site – frontend
- Render Web Service – backend
- MongoDB Atlas – database

---

## Authentication and Authorization

Authentication is handled with **Better Auth** using email and password authentication.

The backend uses:

- Better Auth
- Better Auth MongoDB Adapter
- Better Auth Admin Plugin
- Session-based authentication

Two application roles are currently used:

| Role | Access |
|---|---|
| `user` | Can access their own maintenance requests |
| `admin` | Can access all maintenance requests and update their status |

New users are automatically assigned the `user` role.

The `role` field is configured with `input: false`, which prevents users from assigning themselves the `admin` role during normal registration.

Administrative privileges must therefore be assigned separately from the public registration form.

Protected maintenance request routes use authentication middleware that verifies the active Better Auth session before allowing access.

Role and ownership checks are also performed on the backend instead of relying only on the frontend.

### Authentication Cookies

The production frontend and backend are deployed on separate Render origins.

Better Auth cookies are therefore configured with:

```text
SameSite=None
Secure=true
HttpOnly=true
```

The backend also restricts trusted origins and CORS requests to the configured frontend URL.

---

## Validation

The project uses **Zod on both the frontend and backend**, but for different purposes.

### Frontend Validation

The Login and Registration forms use:

- Zod
- React Hook Form
- `zodResolver`

The Login form validates:

- Required email
- Valid email format
- Required password
- Password length between 8 and 30 characters

The Registration form validates:

- Required name
- Name length between 3 and 40 characters
- Required and valid email
- Password length between 8 and 30 characters
- Password confirmation
- Matching passwords

This allows invalid authentication form input to be detected before an authentication request is sent.

The maintenance request form currently uses standard HTML form validation such as `required`. Maintenance request data is then fully validated by the backend before being stored.

### Backend Validation

The backend uses Zod for maintenance request API validation.

Validation includes:

- Creating maintenance requests
- Updating maintenance requests
- Updating maintenance request status
- Validating maintenance request IDs
- Validating allowed maintenance categories
- Validating allowed maintenance statuses
- Rejecting unexpected fields

Current backend validation limits include:

| Field | Validation |
|---|---|
| `title` | Required, maximum 150 characters |
| `description` | Required, maximum 5000 characters |
| `buildingAddress` | Required, maximum 200 characters |
| `apartmentNumber` | Required, maximum 20 characters |
| `category` | Must be one of the supported categories |
| `status` | Must be one of the supported statuses |
| Request ID | Must be a 24-character hexadecimal MongoDB-style ID |

The update schema also requires at least one field to be provided when updating a maintenance request.

The backend does not rely on frontend validation. Incoming maintenance request data is validated again on the server before it is processed or stored in MongoDB.

Invalid input returns an HTTP error response instead of being written directly to the database.

---

## Database

The deployed application uses **MongoDB Atlas**.

Maintenance requests are stored in the `maintenance_requests` collection.

A maintenance request contains:

- User ID
- Title
- Description
- Category
- Building address
- Apartment number
- Status
- Creation timestamp
- Update timestamp

Each maintenance request is associated with the authenticated user who created it.

The backend uses Mongoose for maintenance request data.

Better Auth uses its MongoDB adapter to store authentication-related data in MongoDB.

The frontend does not connect directly to MongoDB. All application data is accessed through the backend API.

---

## API

The backend is available at:

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

Authentication requests are handled by Better Auth.

### Maintenance Requests

All maintenance request endpoints require an authenticated Better Auth session.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/maintenance` | Authenticated user | Create a maintenance request |
| `GET` | `/api/maintenance` | Authenticated user | Get accessible maintenance requests |
| `GET` | `/api/maintenance/:id` | Owner or admin | Get a single maintenance request |
| `PATCH` | `/api/maintenance/:id` | Owner | Update a maintenance request |
| `PATCH` | `/api/maintenance/:id/status` | Admin only | Update maintenance request status |
| `DELETE` | `/api/maintenance/:id` | Owner or admin | Delete a maintenance request |

### Role-Based API Behavior

For:

```text
GET /api/maintenance
```

- A regular user receives only maintenance requests associated with their user ID.
- An administrator receives all maintenance requests.

For:

```text
GET /api/maintenance/:id
```

- A regular user can only access their own request.
- An administrator can access any request.

For:

```text
PATCH /api/maintenance/:id
```

- A regular user can update their own request.
- An administrator is explicitly blocked from this endpoint.

For:

```text
PATCH /api/maintenance/:id/status
```

- Only administrators can update the request status.

For:

```text
DELETE /api/maintenance/:id
```

- A regular user can delete their own request.
- An administrator can delete any request.

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
│   ├── package-lock.json
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
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## Local Development

### Requirements

Before running the project locally, install:

- Node.js
- npm
- Access to a MongoDB database

Clone the repository:

```bash
git clone https://github.com/Laurean-parhaimmat/maintenance-request-app.git
cd maintenance-request-app
```

The frontend and backend have separate `package.json` files and dependencies.

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

The backend uses port `5000` by default:

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

Start the frontend development server:

```bash
npm run dev
```

Vite uses the following address by default:

```text
http://localhost:5173
```

---

## Testing and Code Quality

Frontend tests use **Vitest**, **jsdom**, and **Testing Library**.

Run the frontend tests:

```bash
cd frontend
npm test
```

Build the frontend:

```bash
npm run build
```

Run the frontend linter:

```bash
npm run lint
```

The current repository does not define a backend test script.

The backend TypeScript build can be checked with:

```bash
cd backend
npm run build
```

---

## Production Deployment

The project is currently deployed to Render using two separate services.

Both services deploy from the `main` branch.

### Frontend

The frontend is deployed as a Render **Static Site**.

URL:

```text
https://maintenance-request-frontend.onrender.com
```

Build command:

```bash
cd frontend && npm ci && npm run build
```

Publish directory:

```text
frontend/dist
```

The frontend uses the following production environment variable:

```env
VITE_REACT_APP_BETTER_AUTH_URL=https://maintenance-request-backend.onrender.com
```

### Backend

The backend is deployed as a Render **Web Service** in the Frankfurt region.

URL:

```text
https://maintenance-request-backend.onrender.com
```

Build command:

```bash
cd backend && npm ci && npm run build
```

Start command:

```bash
cd backend && npm start
```

The backend uses Render's Free web-service plan.

Production configuration requires environment variables for:

```text
MONGODB_URI
FRONTEND_URL
BETTER_AUTH_URL
BETTER_AUTH_SECRET
```

Render also provides the runtime `PORT` environment variable automatically.

Production secrets such as `MONGODB_URI` and `BETTER_AUTH_SECRET` must not be committed to the repository.

---

## Security

The application currently includes the following security-related measures:

- Better Auth session-based authentication
- Email and password authentication
- Role-based authorization
- Backend session verification for protected API routes
- Ownership checks for user-specific maintenance requests
- Administrator-only status updates
- Prevention of self-assigned administrator roles during registration
- Backend Zod validation
- Strict maintenance request validation schemas
- CORS restricted to the configured frontend origin
- Credentialed CORS requests
- `HttpOnly` authentication cookies
- `Secure` authentication cookies
- `SameSite=None` cookies for the separate production frontend and backend origins
- Authentication secrets stored in environment variables
- MongoDB credentials stored outside the source code

---

## Current Status

The application currently supports the basic maintenance request workflow:

```text
Registration
→ Login
→ Create Maintenance Request
→ View and Track Request
→ Administrator Updates Status
→ Resolved
```

The frontend and backend are both deployed on Render.

The frontend communicates with the backend through HTTPS API requests, and the backend is connected to MongoDB Atlas.
