// Api routes for maintenance requests

import {
  Router,
  Request,
  Response,
} from "express";

import MaintenanceRequest, {
  IMaintenanceRequest,
  MaintenanceStatus,
} from "../models/MaintenanceRequest";

import User from "../models/User";

const router = Router();

// Define the request body interfaces for creating and updating maintenance requests
interface CreateMaintenanceBody {
  userId: string;
  title: string;
  description: string;
  category: string;
  buildingAddress: string;
  apartmentNumber: string;
}
// Define the request body interface for updating maintenance requests
interface UpdateMaintenanceBody {
  title?: string;
  description?: string;
  category?: string;
  buildingAddress?: string;
  apartmentNumber?: string;
}
// Define the request body interface for updating maintenance request status
interface UpdateStatusBody {
  status: MaintenanceStatus;
}
// Define a type for maintenance request updates that allows partial updates of the IMaintenanceRequest properties
type MaintenanceUpdates =
  Partial<
    Pick<
      IMaintenanceRequest,
      | "title"
      | "description"
      | "category"
      | "buildingAddress"
      | "apartmentNumber"
    >
  >;


// CREATE Maintenance Request
router.post(
  "/",
  async (
    req: Request<
      object,
      object,
      CreateMaintenanceBody
    >,
    res: Response
  ) => {
    try {
      const {
        userId,
        title,
        description,
        category,
        buildingAddress,
        apartmentNumber,
      } = req.body;

      if (
        !userId ||
        !title ||
        !description ||
        !category ||
        !buildingAddress ||
        !apartmentNumber
      ) {
        return res.status(400).json({
          message:
            "Kaikki huoltopyynnön tiedot vaaditaan",
        });
      }

      const user =
        await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "Käyttäjää ei löytynyt",
        });
      }

      const maintenanceRequest =
        await MaintenanceRequest.create({
          userId,
          title,
          description,
          category,
          buildingAddress,
          apartmentNumber,
          status: "uusi",
        });

      return res
        .status(201)
        .json(maintenanceRequest);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Huoltopyynnön luonti epäonnistui",
        error: message,
      });
    }
  }
);


// READ ALL Maintenance Requests
router.get(
  "/",
  async (_req: Request, res: Response) => {
    try {
      const requests =
        await MaintenanceRequest.find()
          .populate(
            "userId",
            "name email"
          )
          .sort({ createdAt: -1 });

      return res.json(requests);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Huoltopyyntöjen haku epäonnistui",
        error: message,
      });
    }
  }
);


// READ ONE Maintenance Request
router.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const request =
        await MaintenanceRequest.findById(
          req.params.id
        ).populate(
          "userId",
          "name email"
        );

      if (!request) {
        return res.status(404).json({
          message:
            "Huoltopyyntöä ei löytynyt",
        });
      }

      return res.json(request);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Huoltopyynnön haku epäonnistui",
        error: message,
      });
    }
  }
);


// UPDATE Maintenance Request
router.patch(
  "/:id",
  async (
    req: Request<
      { id: string },
      object,
      UpdateMaintenanceBody
    >,
    res: Response
  ) => {
    try {
      const {
        title,
        description,
        category,
        buildingAddress,
        apartmentNumber,
      } = req.body;

      const updates:
        MaintenanceUpdates = {};

      if (title !== undefined) {
        updates.title = title;
      }

      if (description !== undefined) {
        updates.description = description;
      }

      if (category !== undefined) {
        updates.category = category;
      }

      if (buildingAddress !== undefined) {
        updates.buildingAddress =
          buildingAddress;
      }

      if (apartmentNumber !== undefined) {
        updates.apartmentNumber =
          apartmentNumber;
      }

      const request =
        await MaintenanceRequest.findByIdAndUpdate(
          req.params.id,
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
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Huoltopyynnön päivittäminen epäonnistui",
        error: message,
      });
    }
  }
);


// UPDATE Maintenance Request Status
router.patch(
  "/:id/status",
  async (
    req: Request<
      { id: string },
      object,
      UpdateStatusBody
    >,
    res: Response
  ) => {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          message:
            "Status puuttuu pyynnöstä",
        });
      }

      const allowedStatuses:
        MaintenanceStatus[] = [
          "uusi",
          "kasittelyssa",
          "ratkaistu",
        ];

      if (
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          message: "Virheellinen tila",
        });
      }

      const request =
        await MaintenanceRequest.findByIdAndUpdate(
          req.params.id,
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
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Huoltopyynnön tilan muuttaminen epäonnistui",
        error: message,
      });
    }
  }
);


// DELETE Maintenance Request
router.delete(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const request =
        await MaintenanceRequest.findByIdAndDelete(
          req.params.id
        );

      if (!request) {
        return res.status(404).json({
          message:
            "Huoltopyyntöä ei löytynyt",
        });
      }

      return res.json({
        message:
          "Huoltopyyntö poistettu",
        id: request._id,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";

      return res.status(500).json({
        message:
          "Huoltopyynnön poistaminen epäonnistui",
        error: message,
      });
    }
  }
);

export default router;