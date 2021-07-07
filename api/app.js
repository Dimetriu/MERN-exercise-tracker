const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

dotenv.config();

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = app;
