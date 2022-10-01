const Joi = require('joi');
const { read } = require('../utils/fsUtils');
const throwError = require('../utils/errorHandler');
const BeneficiarioModel = require('../models/beneficiariosModel');
const PropostaModel = require('../models/propostaModel');
const PlanosModel = require('../models/planosModel');
const PrecosModel = require('../models/precosModel');

const BeneficiariosService = {
  validateBody(body) {
    const { quantidade } = body;
    const schema = Joi.object({
        quantidade: Joi.number().required(),
        idade: Joi.array().items(
          Joi.number().required(),
        ).min(quantidade).max(quantidade).required(),
        nome: Joi.array().items(
          Joi.string().required(),
        ).min(quantidade).max(quantidade).required(),
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

  calcFaixa(idade) {
    if (idade < 18) {
      return 'faixa1';
    } if (idade >= 18 && idade < 41) {
      return 'faixa2';
    } else {
      return 'faixa3';
    }
  },

  calcPreco(price, faixa) {
    const preco = price[faixa];

    return preco;
  },

  async calcPrecoPorBeneficiario(idade, quantidade, registro) {
    const planos = await PlanosModel.read();
    const precos = await PrecosModel.read();
    const faixa = this.calcFaixa(idade);
    let preco = 0;

    const plano = planos.find((plan) => plan.registro === registro);
    const { codigo } = plano;

    const prices = precos.filter((p) => p.codigo === codigo);

    if (prices.length > 1 && prices[1] <= quantidade) {
      preco = this.calcPreco(prices[1], faixa);
    }

    preco = this.calcPreco(prices[0], faixa);

    return { idade, preco };
  },

  async insertProposta(body) {
    const { quantidade, idade , registro } = body;

    const precoPorBeneficirario = await Promise.all(idade.map
      (async (age) => await this.calcPrecoPorBeneficiario(age, quantidade, registro)));
    
    const precoTotal = precoPorBeneficirario.reduce((prev, cur) => prev.preco + cur.preco);

    const proposta = { precoPorBeneficirario, precoTotal };
    await PropostaModel.insert(proposta);

    return proposta;
  },

  async read() {
    const beneficiarios = await BeneficiarioModel.read();

    if (!beneficiarios) return throwError('notFound', 'Does not exists beneficiarios yet');

    return beneficiarios;
  },

  async insert(body) {
    this.validateBody(body);
    await this.verifyRegistro(body);

    await BeneficiarioModel.insert(body);
    const proposta = this.insertProposta(body);

    return proposta;
  }
};

module.exports = BeneficiariosService;
