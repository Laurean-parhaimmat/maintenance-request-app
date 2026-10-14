// User Routes for CRUD operations

import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";

import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from "../validation/userSchemas";

const router = Router();


// CREATE User
router.post(
  "/",
  async (req: Request, res: Response) => {
    try {
      const result =
        createUserSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Virheelliset käyttäjätiedot",
          errors: result.error.flatten(),
        });
      }

      const {
        name,
        email,
        password,
      } = result.data;

      const existingUser =
        await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message:
            "Käyttäjä tällä sähköpostilla on jo olemassa",
        });
      }

      const passwordHash =
        await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        passwordHash,

        // Public registration always creates
        // a normal user.
        role: "user",
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Käyttäjän luonti epäonnistui",
        error: message,
      });
    }
  }
);


// READ ALL Users
router.get(
  "/",
  async (_req: Request, res: Response) => {
    try {
      const users = await User.find()
        .select("-passwordHash");

      return res.json(users);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Käyttäjien haku epäonnistui",
        error: message,
      });
    }
  }
);


// READ ONE User
router.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const paramsResult =
        userIdParamSchema.safeParse(req.params);

      if (!paramsResult.success) {
        return res.status(400).json({
          message: "Virheellinen käyttäjän ID",
          errors: paramsResult.error.flatten(),
        });
      }

      const { id } = paramsResult.data;

      const user = await User.findById(id)
        .select("-passwordHash");

      if (!user) {
        return res.status(404).json({
          message: "Käyttäjää ei löytynyt",
        });
      }

      return res.json(user);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Käyttäjän haku epäonnistui",
        error: message,
      });
    }
  }
);


// UPDATE User
router.patch(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const paramsResult =
        userIdParamSchema.safeParse(req.params);

      if (!paramsResult.success) {
        return res.status(400).json({
          message: "Virheellinen käyttäjän ID",
          errors: paramsResult.error.flatten(),
        });
      }

      const bodyResult =
        updateUserSchema.safeParse(req.body);

      if (!bodyResult.success) {
        return res.status(400).json({
          message: "Virheelliset päivitystiedot",
          errors: bodyResult.error.flatten(),
        });
      }

      const { id } = paramsResult.data;

      const {
        name,
        email,
        password,
      } = bodyResult.data;

      const updates: {
        name?: string;
        email?: string;
        passwordHash?: string;
      } = {};

      if (name !== undefined) {
        updates.name = name;
      }

      if (email !== undefined) {
        updates.email = email;
      }

      if (password !== undefined) {
        updates.passwordHash =
          await bcrypt.hash(password, 10);
      }

      const user =
        await User.findByIdAndUpdate(
          id,
          updates,
          {
            returnDocument: "after",
            runValidators: true,
          }
        ).select("-passwordHash");

      if (!user) {
        return res.status(404).json({
          message: "Käyttäjää ei löytynyt",
        });
      }

      return res.json(user);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Käyttäjän päivittäminen epäonnistui",
        error: message,
      });
    }
  }
);


// DELETE User
router.delete(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const paramsResult =
        userIdParamSchema.safeParse(req.params);

      if (!paramsResult.success) {
        return res.status(400).json({
          message: "Virheellinen käyttäjän ID",
          errors: paramsResult.error.flatten(),
        });
      }

      const { id } = paramsResult.data;

      const user =
        await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({
          message: "Käyttäjää ei löytynyt",
        });
      }

      return res.json({
        message: "Käyttäjä poistettu",
        id: user._id,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Käyttäjän poistaminen epäonnistui",
        error: message,
      });
    }
  }
);

export default router;