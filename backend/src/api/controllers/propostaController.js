const PropostaService = require('../services/propostaService');

const PropostaController = {
  async read(_req, res, next) {
    try {
      const propostas = await PropostaService.read();

      return res.status(200).json(propostas);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = PropostaController;
