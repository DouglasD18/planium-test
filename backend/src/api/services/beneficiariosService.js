const Joi = require('joi');
const { read } = require('../utils/fsUtils');
const throwError = require('../utils/errorHandler');
const BeneficiarioModel = require('../models/beneficiariosModel');

const BeneficiariosService = {
  validateBody(body) {
    const schema = Joi.object({
        quantidade: Joi.number().required(),
        idade: Joi.array().items(
          Joi.number().required(),
        ),
        nome: Joi.array().items(
          Joi.string().required(),
        ),
        registro: Joi.string().required(),
      });

    const { error } = schema.validate(body);

    if (error) return throwError('notAcceptable', 'All fields must be filled correctly');
  },

  async verifyRegistro({ registro }) {
    const planos = await read('plans');

    const exists = planos.find((plano) => plano.registro === registro);

    if (!exists) return throwError('conflict', 'Plan not exists!');
  },

  async insert(body) {
    this.validateBody(body);
    await this.verifyRegistro(body);

    const inserted = await BeneficiarioModel.insert(body);
    return inserted;
  }
};

module.exports = BeneficiariosService;
