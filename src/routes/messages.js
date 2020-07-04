const express = require('express');
const router = express.Router();
const Message = require('../models/messages');
const { json } = require('express');

//Get all
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get one
router.get('/:id', getMessages, (req, res) => {

});

//post one
router.post('/', async (req, res) => {

});

//update one
router.patch('/:id', getMessages, async (req, res) => {

});

//delete one
router.delete('/:id', getMessages, async (req, res) => {

});

//Middle for One Message
async function getMessages(req, res, next) {
    next();
}

module.exports = router;