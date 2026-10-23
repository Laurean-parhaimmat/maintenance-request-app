// API routes for maintenance requests

import {
  Router,
  Request,
  Response,
} from "express";
import MaintenanceRequest from "../models/MaintenanceRequest.js";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
  updateStatusSchema,
  maintenanceIdParamSchema,
} from "../validation/maintenanceSchemas.js";

import { requireAuth } from "../middleware/authMiddleware.js";
const router = Router();


// CREATE Maintenance Request
router.post(
  "/",
  requireAuth,
  async (req: Request, res: Response) => {
    const result =
      createMaintenanceSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message:
          "Virheelliset huoltopyynnön tiedot",
        errors: result.error.flatten(),
      });
    }

    const {
      title,
      description,
      category,
      buildingAddress,
      apartmentNumber,
    } = result.data;

    const userId =
      res.locals.session.user.id;

    const maintenanceRequest =
      await MaintenanceRequest.create({
        userId,
        title,
        description,
        category,
        buildingAddress,
        apartmentNumber,
        status: "new",
      });

    return res
      .status(201)
      .json(maintenanceRequest);
  }
);

// READ ALL Maintenance Requests
router.get(
  "/",
  requireAuth,
  async (_req: Request, res: Response) => {
    const sessionUser = res.locals.session.user;

    const filter =
      sessionUser.role === "admin"
        ? {}
        : { userId: sessionUser.id };

    const requests =
      await MaintenanceRequest.find(filter)
        .sort({ createdAt: -1 });

    return res.json(requests);
  }
);


// READ ONE Maintenance Request
router.get(
  "/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const paramsResult =
      maintenanceIdParamSchema.safeParse(
        req.params
      );

    if (!paramsResult.success) {
      return res.status(400).json({
        message:
          "Virheellinen huoltopyynnön ID",
        errors:
          paramsResult.error.flatten(),
      });
    }

    const { id } = paramsResult.data;

    const sessionUser =
      res.locals.session.user;

    const filter =
      sessionUser.role === "admin"
        ? { _id: id }
        : {
            _id: id,
            userId: sessionUser.id,
          };

    const request =
      await MaintenanceRequest.findOne(filter);

    if (!request) {
      return res.status(404).json({
        message:
          "Huoltopyyntöä ei löytynyt",
      });
    }

    return res.json(request);
  }
);


// UPDATE Maintenance Request
router.patch(
  "/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const paramsResult =
      maintenanceIdParamSchema.safeParse(
        req.params
      );

    if (!paramsResult.success) {
      return res.status(400).json({
        message:
          "Virheellinen huoltopyynnön ID",
        errors:
          paramsResult.error.flatten(),
      });
    }

    const bodyResult =
      updateMaintenanceSchema.safeParse(
        req.body
      );

    if (!bodyResult.success) {
      return res.status(400).json({
        message:
          "Virheelliset päivitystiedot",
        errors:
          bodyResult.error.flatten(),
      });
    }

    const { id } = paramsResult.data;
    const updates = bodyResult.data;

    const sessionUser =
      res.locals.session.user;

    const filter =
      sessionUser.role === "admin"
        ? { _id: id }
        : {
            _id: id,
            userId: sessionUser.id,
          };

    const request =
      await MaintenanceRequest.findOneAndUpdate(
        filter,
        updates,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!request) {
      return res.status(404).json({
        message:
          "Huoltopyyntöä ei löytynyt",
      });
    }

    return res.json(request);
  }
);


// UPDATE Maintenance Request Status
router.patch(
  "/:id/status",
  requireAuth,
  async (req: Request, res: Response) => {
    const paramsResult =
      maintenanceIdParamSchema.safeParse(
        req.params
      );

    if (!paramsResult.success) {
      return res.status(400).json({
        message:
          "Virheellinen huoltopyynnön ID",
        errors:
          paramsResult.error.flatten(),
      });
    }

    const sessionUser =
      res.locals.session.user;

    if (sessionUser.role !== "admin") {
      return res.status(403).json({
        message:
          "Admin-oikeudet vaaditaan",
      });
    }

    const bodyResult =
      updateStatusSchema.safeParse(
        req.body
      );

    if (!bodyResult.success) {
      return res.status(400).json({
        message: "Virheellinen tila",
        errors:
          bodyResult.error.flatten(),
      });
    }

    const { id } = paramsResult.data;
    const { status } = bodyResult.data;

    const request =
      await MaintenanceRequest.findByIdAndUpdate(
        id,
        { status },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!request) {
      return res.status(404).json({
        message:
          "Huoltopyyntöä ei löytynyt",
      });
    }

    return res.json(request);
  }
);


// DELETE Maintenance Request
router.delete(
  "/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const paramsResult =
      maintenanceIdParamSchema.safeParse(
        req.params
      );

    if (!paramsResult.success) {
      return res.status(400).json({
        message:
          "Virheellinen huoltopyynnön ID",
        errors:
          paramsResult.error.flatten(),
      });
    }

    const { id } = paramsResult.data;

    const sessionUser =
      res.locals.session.user;

    const filter =
      sessionUser.role === "admin"
        ? { _id: id }
        : {
            _id: id,
            userId: sessionUser.id,
          };

    const request =
      await MaintenanceRequest.findOneAndDelete(
        filter
      );

    if (!request) {
      return res.status(404).json({
        message:
          "Huoltopyyntöä ei löytynyt",
      });
    }

    return res.json({
      message: "Huoltopyyntö poistettu",
      id: request._id,
    });
  }
);

export default router;