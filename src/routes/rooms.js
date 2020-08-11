const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");
const { json } = require("express");
const { auth, getRoom } = require("../middleware");

//Get all
router.get("/", auth, async (req, res) => {
  try {
    const room = await Room.find();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one
router.get("/:id", auth, getRoom, (req, res) => {
  res.json(res.room);
});

//post one
router.post("/", auth, async (req, res) => {
  const room = new Room({
    room_name: req.body.room_name,
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: json.message });
  }
});

//delete one
router.delete("/:id", auth, getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Deleted Room " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
