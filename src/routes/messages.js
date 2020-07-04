const express = require('express');
const router = express.Router();
const User = require('../models/messages');
const { json } = require('express');

//Get all
router.get('/', async (req, res) => {

});

//get one
router.get('/:id', getMessages, (req, res) => {

});

//post one
router.post('/', async (req, res) => {

});

//update one
router.patch('/:id', getUser, async (req, res) => {

});

//delete one
router.delete('/:id', getUser, async (req, res) => {

});

//Middle for One Message
async function getMessages(req, res, next) {
    next();
}

module.exports = router;