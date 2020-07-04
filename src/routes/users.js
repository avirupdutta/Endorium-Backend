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
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
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
router.patch('/:id', getUser, (req, res) => {

});

//delete one
router.delete('/:id', getUser, (req, res) => {

});

//Middle for One user
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if( user == null)
        {
            return res.status(404).json({ message: 'Cannot find User' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user;
    next();
}

module.exports = router;