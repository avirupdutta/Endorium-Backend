const express = require("express");
const router = express.Router();
const Message = require("../models/messages");
const { json } = require("express");
const { auth, getMessages } = require('../middleware/auth');

//Get all
router.get("/", auth, async (req, res) => {
	try {
		const messages = await Message.find();
		res.json(messages);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//get one
router.get("/:id", auth, getMessages, (req, res) => {
	res.json(res.message);
});

//post one
router.post("/", auth, async (req, res) => {
	const message = new Message({
		message: req.body.message,
		created_by_user: req.body.created_by_user,
		room_no: req.body.room_no,
		upvote: req.body.upvote //? optional property
	});

	try {
		const newMessage = await message.save();
		res.status(201).json(newMessage);
	} catch (err) {
		res.status(400).json({ message: json.message });
	}
});

//update one
router.patch("/:id", auth, getMessages, async (req, res) => {
	if (req.body.message != null) {
		res.message.message = req.body.message;
	}
	if (req.body.created_by_user != null) {
		res.message.created_by_user = req.body.created_by_user;
	}
	if (req.body.room_no != null) {
		res.message.room_no = req.body.room_no;
	}
	if (req.body.upvote != null) {
		res.message.upvote = req.body.upvote;
	}

	try {
		const updatedMessage = await res.message.save();
		res.json(updatedMessage);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//delete one
router.delete("/:id", auth, getMessages, async (req, res) => {
	try {
		await res.message.remove();
		res.json({ message: "Deleted Message " });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
