const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth, getUser } = require("../middleware");
const { getFilteredItem } = require("../utils");

const router = express.Router();
const User = require("../models/users");

//Get all
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one
router.get("/:id", auth, getUser, (req, res) => {
  const item = getFilteredItem(res.user);
  res.json(item);
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "The given email is invalid" });
    } else {
      const isPasswordMatch = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(404)
          .json({ message: "The given passward is invalid" });
      } else {
        let tempUser = {
          name: user.name,
          email: user.email,
          is_admin: user.is_admin,
          current_room: user.current_room,
        };
        jwt.sign(
          { ...tempUser },
          process.env.SECRET_KEY,
          { expiresIn: "30 days" },
          (err, token) => {
            return res.status(200).json({
              token,
            });
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//post one
//Register
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exist" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin,
    current_room: req.body.current_room,
  });

  // generating the salt for hash
  bcryptjs.genSalt(10, async (error, salt) => {
    if (error) {
      return res.status(500).json({ error });
    }
    try {
      // hashing the password with the salt
      const hashedPassword = await bcryptjs.hash(user.password, salt);
      user.password = hashedPassword;

      try {
        const newUser = await user.save();
        const tempUser = {
          name: newUser.name,
          email: newUser.email,
          is_admin: newUser.is_admin,
          current_room: newUser.current_room,
        };
        jwt.sign(
          { ...tempUser },
          process.env.SECRET_KEY,
          { expiresIn: "30 days" },
          (err, token) => {
            return res.status(201).json({
              token,
            });
          }
        );
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
});

//update one
router.patch("/:id", auth, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.is_admin != null) {
    res.user.is_admin = req.body.is_admin;
  }
  if (req.body.current_room != null) {
    res.user.current_room = req.body.current_room;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete one
router.delete("/:id", auth, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
