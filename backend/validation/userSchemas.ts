//This file contains Zod schemas for validating user-related data, including creating and updating users, as well as validating user ID parameters.

import { z } from "zod";

// Define Zod schemas for user validation
const nameSchema = z
  .string()
  .trim()
  .min(2, "Nimen tulee olla vähintään 2 merkkiä")
  .max(100, "Nimi on liian pitkä");

  // Define Zod schema for email validation
const emailSchema = z
  .string()
  .trim()
  .email("Virheellinen sähköpostiosoite")
  .transform((email) => email.toLowerCase());

// Define Zod schema for password validation
const passwordSchema = z
  .string()
  .min(8, "Salasanan tulee olla vähintään 8 merkkiä")
  .max(72, "Salasana on liian pitkä");

// Define Zod schema for user role validation
export const createUserSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

  // Define Zod schema for updating user validation
export const updateUserSchema = z
  .object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Vähintään yksi päivitettävä kenttä vaaditaan",
    }
  );

// Define Zod schema for validating user ID parameters
export const userIdParamSchema = z.object({
  id: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Virheellinen käyttäjän ID"
    ),
});