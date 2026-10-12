//This is the main server file for the backend of the application. 
// It sets up the Express server, connects to the MongoDB database, and defines the routes for handling user and maintenance request operations.


require("dotenv").config();

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Define routes for user and maintenance request operations
app.use("/api/user", userRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.get("/", (req, res) => {
  res.send("Huoltopyyntö API toimii");
});

const PORT = process.env.PORT || 5000;

// Function to start the server and connect to the MongoDB database
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connection successful", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();