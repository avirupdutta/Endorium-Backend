const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
