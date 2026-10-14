// User Model

import mongoose, { Schema } from "mongoose";

export type UserRole = "user" | "admin";
// Define the interface for a user document
export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
// Define the schema for a user document
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;