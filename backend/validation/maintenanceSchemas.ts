// This file contains Zod schemas for validating maintenance-related data,
// including creating and updating maintenance requests,
// as well as validating maintenance ID parameters.

import { z } from "zod";

import {
  MAINTENANCE_CATEGORIES,
  MAINTENANCE_STATUSES,
} from "../constants/maintenance.js";

// Define Zod schema for title validation
const titleSchema = z
  .string()
  .trim()
  .min(1, "Otsikko vaaditaan")
  .max(150, "Otsikko on liian pitkä");

// Define Zod schema for description validation
const descriptionSchema = z
  .string()
  .trim()
  .min(1, "Kuvaus vaaditaan")
  .max(5000, "Kuvaus on liian pitkä");

// Define Zod schema for building address validation
const buildingAddressSchema = z
  .string()
  .trim()
  .min(1, "Osoite vaaditaan")
  .max(200, "Osoite on liian pitkä");

// Define Zod schema for apartment number validation
const apartmentNumberSchema = z
  .string()
  .trim()
  .min(1, "Asunnon numero vaaditaan")
  .max(20, "Asunnon numero on liian pitkä");

// Create maintenance request
export const createMaintenanceSchema = z
  .object({
    title: titleSchema,
    description: descriptionSchema,
    category: z.enum(MAINTENANCE_CATEGORIES),
    buildingAddress: buildingAddressSchema,
    apartmentNumber: apartmentNumberSchema,
  })
  .strict();

// Update maintenance request
export const updateMaintenanceSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    category: z.enum(MAINTENANCE_CATEGORIES).optional(),
    buildingAddress: buildingAddressSchema.optional(),
    apartmentNumber: apartmentNumberSchema.optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Vähintään yksi päivitettävä kenttä vaaditaan",
    }
  );

// Update maintenance status
export const updateStatusSchema = z
  .object({
    status: z.enum(MAINTENANCE_STATUSES),
  })
  .strict();

// Validate maintenance request ID
export const maintenanceIdParamSchema = z.object({
  id: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Virheellinen huoltopyynnön ID"
    ),
});