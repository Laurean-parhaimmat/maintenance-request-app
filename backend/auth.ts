import "dotenv/config";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI;

const frontendUrl =
  process.env.FRONTEND_URL || "http://localhost:5173";

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

const client = new MongoClient(mongoUri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  plugins: [admin()],

  trustedOrigins: [frontendUrl],

  // Role based authentication
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false, // Prevent users from self-assigning admin on registration
      },
    },
  },
});
