const Router = require('express');
const BeneficiarioController = require('../controllers/beneficiariosController');

const BeneficiarioRoute = Router();

BeneficiarioRoute.get('/', BeneficiarioController.read);
BeneficiarioRoute.post('/', BeneficiarioController.insert);

module.exports = BeneficiarioRoute;
