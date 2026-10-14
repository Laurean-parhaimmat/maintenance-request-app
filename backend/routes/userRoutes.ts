// User Routes for CRUD operations

import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User, {
  IUser,
  UserRole,
} from "../models/User";

const router = Router();
// Define the request body interfaces for creating and updating users
interface CreateUserBody {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
// Define the request body interface for updating users
interface UpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
// Define a type for user updates that allows partial updates of the IUser properties
type UserUpdates =
  Partial<
    Pick<
      IUser,
      "name" | "email" | "passwordHash" | "role"
    >
  >;


// CREATE User
router.post(
  "/",
  async (
    req: Request<object, object, CreateUserBody>,
    res: Response
  ) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message:
            "Nimi, sähköposti ja salasana vaaditaan",
        });
      }

      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      });

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
        email: email.toLowerCase(),
        passwordHash,
        role: role || "user",
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
      const user = await User.findById(
        req.params.id
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
          "Käyttäjän haku epäonnistui",
        error: message,
      });
    }
  }
);


// UPDATE User
router.patch(
  "/:id",
  async (
    req: Request<
      { id: string },
      object,
      UpdateUserBody
    >,
    res: Response
  ) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      const updates: UserUpdates = {};

      if (name !== undefined) {
        updates.name = name;
      }

      if (email !== undefined) {
        updates.email = email.toLowerCase();
      }

      if (role !== undefined) {
        updates.role = role;
      }

      if (password !== undefined) {
        updates.passwordHash =
          await bcrypt.hash(password, 10);
      }

      const user =
        await User.findByIdAndUpdate(
          req.params.id,
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
      const user =
        await User.findByIdAndDelete(
          req.params.id
        );

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