const BeneficiarioService = require('../services/beneficiariosService');

const BeneficiarioController = {
  async insert(req, res, next) {
    const { body } = req;

    try {
      const beneficiario = await BeneficiarioService.insert(body);

      return res.status(201).json(beneficiario);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = BeneficiarioController;
