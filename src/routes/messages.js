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
    res.json(res.message);
});

//post one
router.post('/', async (req, res) => {
    const message = new Message({
        message: req.body.message,
        created_by_user: req.body.created_by_user,
        room_no: req.body.room_no,
        upvote: req.body.upvote
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: json.message });
    }
});

//update one
router.patch('/:id', getMessages, async (req, res) => {

});

//delete one
router.delete('/:id', getMessages, async (req, res) => {

});

//Middle for One Message
async function getMessages(req, res, next) {
    let message;
    try {
        message = await Message.findById(req.params.id);
        if( message == null)
        {
            return res.status(404).json({ message: 'Cannot find User' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.message = message;
    next();
}

module.exports = router;