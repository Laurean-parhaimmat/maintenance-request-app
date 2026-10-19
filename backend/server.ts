// Main server file for the backend.
// Sets up Express, Better Auth, database connection and maintenance routes.

import "dotenv/config";

import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

import connectDB from "./config/db.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Better Auth must be registered before express.json()
app.all(
  "/api/auth/*splat",
  toNodeHandler(auth)
);

app.use(express.json());

// Maintenance routes
app.use("/api/maintenance", maintenanceRoutes);

app.get("/", (_req, res) => {
  res.send("Huoltopyyntö API toimii");
});

// Centralized error handler must be after all routes
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

// Start the server and connect to MongoDB
const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();