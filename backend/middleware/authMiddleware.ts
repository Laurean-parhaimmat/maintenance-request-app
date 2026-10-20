import {
  Request,
  Response,
  NextFunction,
} from "express";

import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../auth.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        message: "Kirjautuminen vaaditaan",
      });
    }

    // Tallennetaan session seuraavaa routea varten
    res.locals.session = session;

    return next();
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    return res.status(500).json({
      message: "Session tarkistus epäonnistui",
      error: message,
    });
  }
};