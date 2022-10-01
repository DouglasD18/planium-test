const BeneficiarioService = require('../services/beneficiariosService');

const BeneficiarioController = {
  async read(_req, res, next) {
    try {
      const beneficiarios = await BeneficiarioService.read();

      return res.status(200).json(beneficiarios);
    } catch (error) {
      next(error);
    }
  },

  async insert(req, res, next) {
    const { body } = req;

    try {
      const proposta = await BeneficiarioService.insert(body);

      return res.status(201).json(proposta);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = BeneficiarioController;
