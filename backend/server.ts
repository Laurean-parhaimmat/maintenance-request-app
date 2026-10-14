// This is the main server file for the backend of the application. 
// It sets up the Express server, connects to the database, and defines the routes for user and maintenance request management.

import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import maintenanceRoutes from "./routes/maintenanceRoutes";

const app = express();

app.use(cors());
app.use(express.json());

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