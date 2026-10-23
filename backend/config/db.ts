//This file is used to connect to the MongoDB database using Mongoose.
// It exports a function that establishes the connection and handles any errors that may occur during the process.

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing from environment variables");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully:", mongoose.connection.name);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.error("MongoDB connection failed:", message);

    process.exit(1);
  }
};

export default connectDB;
