const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", (req, res) => {
	try {
        const token = req.body.token;
        jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(404).json({ message: "Token is Invalid" });
    }
});

module.exports = router;