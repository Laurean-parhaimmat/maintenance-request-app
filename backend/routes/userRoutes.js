// Api routes for user management

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// CREATE User
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nimi, sähköposti ja salasana vaaditaan",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Käyttäjä tällä sähköpostilla on jo olemassa",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({
      message: "Käyttäjän luonti epäonnistui",
      error: error.message,
    });
  }
});


// READ All - Get All
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: "Käyttäjien haku epäonnistui",
      error: error.message,
    });
  }
});


// READ One - Get One
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        message: "Käyttäjää ei löytynyt",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Käyttäjän haku epäonnistui",
      error: error.message,
    });
  }
});


// UPDATE User
router.patch("/:id", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (email) {
      updates.email = email.toLowerCase();
    }

    if (role) {
      updates.role = role;
    }

    if (password) {
      updates.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
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

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Käyttäjän päivittäminen epäonnistui",
      error: error.message,
    });
  }
});


// DELETE User
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Käyttäjää ei löytynyt",
      });
    }

    res.json({
      message: "Käyttäjä poistettu",
      id: user._id,
    });

  } catch (error) {
    res.status(500).json({
      message: "Käyttäjän poistaminen epäonnistui",
      error: error.message,
    });
  }
});


module.exports = router;