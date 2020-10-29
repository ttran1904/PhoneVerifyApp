const express  = require('express');
const cors = require('cors');

const appBackend = express();
appBackend.use(cors());

appBackend.use(express.json());
appBackend.use(express.urlencoded({ extended: true }));

//Import Route
appBackend.use('/process', require('./routes/verify'));

module.exports = appBackend;