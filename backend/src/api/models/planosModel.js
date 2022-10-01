const { read } = require('../utils/fsUtils');

const PlanosModel = {
  async read() {
    const planos = await read('plans');

    return planos;
  }
};

module.exports = PlanosModel;
