const express  = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Route
app.use('/process', require('./routes/verify'));

module.exports = app;