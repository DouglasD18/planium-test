const express = require('express');
const errorMidlleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

app.use(errorMidlleware);

module.exports = app;
