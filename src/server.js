require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect( process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`The Server is running on ${PORT}`));
