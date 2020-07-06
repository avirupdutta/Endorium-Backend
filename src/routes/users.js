const express = require("express");
const bcryptjs = require("bcryptjs");

const router = express.Router();
const User = require("../models/users");
const { json } = require("express");

//Get all
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//get one
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});

//post one
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		is_admin: req.body.is_admin,
		current_room: req.body.current_room
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
				res.status(201).json(newUser);
			} catch (err) {
				res.status(400).json({ message: err.message });
			}
		} catch (error) {
			return res.status(500).json({ error });
		}
	});
});

//update one
router.patch("/:id", getUser, async (req, res) => {
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
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: "Deleted User" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Middle for One user
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find User" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
