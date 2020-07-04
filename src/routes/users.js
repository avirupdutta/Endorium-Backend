const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { json } = require('express');

//Get all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get one
router.get('/:id', (req, res) => {

});

//post one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        is_admin: req.body.is_admin,
        current_room: req.body.current_room
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: json.message });
    }
});

//update one
router.patch('/:id', (req, res) => {

});

//delete one
router.delete('/:id', (req, res) => {

});

module.exports = router;