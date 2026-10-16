// This is the main server file for the backend of the application. 
// It sets up the Express server, connects to the database, and defines the routes for user and maintenance request management.

import "dotenv/config";

import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import { requireAuth } from "./middleware/authMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Better Auth pitää olla ennen express.json()
app.all(
  "/api/auth/*splat",
  toNodeHandler(auth)
);

app.use(express.json());

app.get(
  "/api/protected-test",
  requireAuth,
  (_req, res) => {
    return res.json({
      message: "Kirjautunut käyttäjä tunnistettu",
      user: res.locals.session.user,
    });
  }
);


// Define the routes for user and maintenance request management
app.use("/api/user", userRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.get("/", (_req, res) => {
  res.send("Huoltopyyntö API toimii");
});

const PORT = Number(process.env.PORT) || 5000;

// Start the server and connect to the database
const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();