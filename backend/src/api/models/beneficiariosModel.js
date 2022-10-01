const { insert, read } = require('../utils/fsUtils');

const BeneficariosModel = {
  async insert(body) {
    const beneficiarios = await insert('beneficiarios', body);

    return beneficiarios;
  }, 

  async read() {
    const beneficiarios = await read('beneficiarios');

    return beneficiarios;
  }
};

module.exports = BeneficariosModel;
