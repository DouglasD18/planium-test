const Router = require('express');
const PropostaController = require('../controllers/propostaController');

const PropostaRoute = Router();

PropostaRoute.get('/', PropostaController.read);

module.exports = PropostaRoute;
