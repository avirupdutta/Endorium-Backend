require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`The Server is running on ${PORT}`));
