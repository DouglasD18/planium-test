const { read } = require('../utils/fsUtils');

const PrecosModel = {
  async read() {
    const precos = await read('prices');

    return precos;
  }
};

module.exports = PrecosModel;
