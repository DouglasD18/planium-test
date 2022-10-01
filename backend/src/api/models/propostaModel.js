const { read, insert } = require('../utils/fsUtils');

const PropostaModel = {
  async read() {
    const propostas = await read('proposta');

    return propostas;
  }, 

  async insert(proposta) {
    const created = await insert('proposta', proposta);

    return created;
  }
};

module.exports = PropostaModel;
