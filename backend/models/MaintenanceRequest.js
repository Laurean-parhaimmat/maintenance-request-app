// MaintenanceRequest model

const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  buildingAddress: {
    type: String,
    required: true
  },

  apartmentNumber: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["uusi", "kasittelyssa", "ratkaistu"],
    default: "uusi"
  }
}, {
  timestamps: true,
    versionKey: false,
  collection: "maintenance_requests"
});

module.exports = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);