const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const RoomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
  },
  room_id: {
    type: String,
    default: uuidv4,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
