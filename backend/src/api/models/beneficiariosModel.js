const { insert } = require('../utils/fsUtils');

const BeneficariosModel = {
  async insert(body) {
    const beneficiarios = await insert('beneficiarios', body);

    return beneficiarios;
  }
};

module.exports = BeneficariosModel;
