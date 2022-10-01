const PropostaModel = require('../models/propostaModel');
const throwError = require('../utils/errorHandler');

const PropostaService = {
  async read() {
    const propostas = await PropostaModel.read();

    if (!propostas) return throwError('notFound', 'Does not exists proposta yet');

    return propostas;
  }
};

module.exports = PropostaService;
