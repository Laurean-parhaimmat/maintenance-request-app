//This file contains Zod schemas for validating maintenance-related data, including creating and updating maintenance requests, as well as validating maintenance ID parameters.

import { z } from "zod";

// Define Zod schemas for maintenance validation
export const maintenanceCategories = [
  "electricity",
  "water",
  "heating",
  "doors_locks",
  "other",
] as const;

// Define Zod schemas for maintenance status validation
export const maintenanceStatuses = [
  "uusi",
  "kasittelyssa",
  "ratkaistu",
] as const;

// Define Zod schema for validating ObjectId format
const objectIdSchema = z
  .string()
  .regex(
    /^[0-9a-fA-F]{24}$/,
    "Virheellinen käyttäjän ID"
  );

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

// Define Zod schema for creating maintenance request validation  
export const createMaintenanceSchema = z
  .object({
    title: titleSchema,
    description: descriptionSchema,
    category: z.enum(maintenanceCategories),
    buildingAddress: buildingAddressSchema,
    apartmentNumber: apartmentNumberSchema,
  })
  .strict();

// Define Zod schema for updating maintenance request validation  
export const updateMaintenanceSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    category: z.enum(maintenanceCategories).optional(),
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

// Define Zod schema for updating maintenance status validation  
export const updateStatusSchema = z
  .object({
    status: z.enum(maintenanceStatuses),
  })
  .strict();

// Define Zod schema for validating maintenance ID parameters  
export const maintenanceIdParamSchema = z.object({
  id: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Virheellinen huoltopyynnön ID"
    ),
});