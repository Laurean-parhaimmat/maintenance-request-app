// Api routes for maintenance requests

const express = require("express");
const MaintenanceRequest = require("../models/MaintenanceRequest");
const User = require("../models/User");

const router = express.Router();


// CREATE New Maintenance Request
router.post("/", async (req, res) => {
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
        message: "Kaikki huoltopyynnön tiedot vaaditaan",
      });
    }

    const user = await User.findById(userId);

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

    res.status(201).json(maintenanceRequest);

  } catch (error) {
    res.status(500).json({
      message: "Huoltopyynnön luonti epäonnistui",
      error: error.message,
    });
  }
});


// READ ALL Maintenance Requests
router.get("/", async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: "Huoltopyyntöjen haku epäonnistui",
      error: error.message,
    });
  }
});


// READ ONE Maintenance Request
router.get("/:id", async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(
      req.params.id
    ).populate("userId", "name email");

    if (!request) {
      return res.status(404).json({
        message: "Huoltopyyntöä ei löytynyt",
      });
    }

    res.json(request);

  } catch (error) {
    res.status(500).json({
      message: "Huoltopyynnön haku epäonnistui",
      error: error.message,
    });
  }
});


// UPDATE Maintenance Request
router.patch("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      buildingAddress,
      apartmentNumber,
    } = req.body || {};

    const updates = {};

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
      updates.buildingAddress = buildingAddress;
    }

    if (apartmentNumber !== undefined) {
      updates.apartmentNumber = apartmentNumber;
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
        message: "Huoltopyyntöä ei löytynyt",
      });
    }

    res.json(request);

  } catch (error) {
    res.status(500).json({
      message: "Huoltopyynnön päivittäminen epäonnistui",
      error: error.message,
    });
  }
});


// UPDATE  Maintenance Request Status 
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body || {};

    if (!status) {
      return res.status(400).json({
        message: "Status puuttuu pyynnöstä",
      });
    }

    const allowedStatuses = [
      "uusi",
      "käsittelyssä",
      "ratkaistu",
    ];

    if (!allowedStatuses.includes(status)) {
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
        message: "Huoltopyyntöä ei löytynyt",
      });
    }

    res.json(request);

  } catch (error) {
    res.status(500).json({
      message: "Huoltopyynnön tilan muuttaminen epäonnistui",
      error: error.message,
    });
  }
});


// DELETE Maintenance Request
router.delete("/:id", async (req, res) => {
  try {
    const request =
      await MaintenanceRequest.findByIdAndDelete(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Huoltopyyntöä ei löytynyt",
      });
    }

    res.json({
      message: "Huoltopyyntö poistettu",
      id: request._id,
    });

  } catch (error) {
    res.status(500).json({
      message: "Huoltopyynnön poistaminen epäonnistui",
      error: error.message,
    });
  }
});


module.exports = router;