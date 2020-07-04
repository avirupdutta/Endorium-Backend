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
router.post('/', (req, res) => {

});

//update one
router.patch('/:id', (req, res) => {

});

//delete one
router.delete('/:id', (req, res) => {

});

module.exports = router;