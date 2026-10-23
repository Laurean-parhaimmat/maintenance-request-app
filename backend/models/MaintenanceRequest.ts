// Maintenance Request Model

import mongoose, { Schema } from "mongoose";

import {
  MAINTENANCE_CATEGORIES,
  MAINTENANCE_STATUSES,
  type MaintenanceCategory,
  type MaintenanceStatus,
} from "../constants/maintenance.js";

// Define the interface for a maintenance request document
export interface IMaintenanceRequest {
  userId: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  buildingAddress: string;
  apartmentNumber: string;
  status: MaintenanceStatus;
}

// Define the schema for a maintenance request document
const maintenanceRequestSchema =
  new Schema<IMaintenanceRequest>(
    {
      userId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        enum: [...MAINTENANCE_CATEGORIES],
        required: true,
      },

      buildingAddress: {
        type: String,
        required: true,
      },

      apartmentNumber: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [...MAINTENANCE_STATUSES],
        default: "new",
      },
    },
    {
      timestamps: true,
      versionKey: false,
      collection: "maintenance_requests",
    }
  );

// Create the MaintenanceRequest model using the schema
const MaintenanceRequest =
  mongoose.model<IMaintenanceRequest>(
    "MaintenanceRequest",
    maintenanceRequestSchema
  );

export default MaintenanceRequest;