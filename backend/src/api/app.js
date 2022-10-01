const express = require('express');
const cors = require('cors');
const errorMidlleware = require('./middlewares/errorMiddleware');
const BeneficiarioRoute = require('./router/beneficiariosRouter');
const PropostaRoute = require('./router/propostaRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/beneficiarios', BeneficiarioRoute);
app.use('/propostas', PropostaRoute);

app.use(errorMidlleware);

module.exports = app;
