// Maintenance Request Model 

import mongoose, { Schema, Types } from "mongoose";

// Define the possible statuses for a maintenance request
export type MaintenanceStatus =
  | "uusi"
  | "kasittelyssa"
  | "ratkaistu";

// Define the interface for a maintenance request document  
export interface IMaintenanceRequest {
  userId: string;
  title: string;
  description: string;
  category: string;
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
        enum: ["uusi", "kasittelyssa", "ratkaistu"],
        default: "uusi",
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