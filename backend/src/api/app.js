const express = require('express');
const errorMidlleware = require('./middlewares/errorMiddleware');
const BeneficiarioRoute = require('./router/beneficiariosRouter');

const app = express();
app.use(express.json());

app.use('/beneficiarios', BeneficiarioRoute);

app.use(errorMidlleware);

module.exports = app;
