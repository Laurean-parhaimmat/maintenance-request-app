//This file is used to connect to the MongoDB database using Mongoose. 
// It exports a function that establishes the connection and handles any errors that may occur during the process.


// Import the Mongoose library
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB-connected successfully");
  } catch (error) {
    console.error("MongoDB-connection failed:", error.message);
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;