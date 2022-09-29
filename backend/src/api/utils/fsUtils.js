const fs = require('fs').promises;
const path = require('path').join;

const pathRoute = '../../../../';

const UtilsFs = {
  async read(name) {
    try {
      const data = await fs.readFile(path.resolve(__dirname, `${pathRoute}${name}.json`));

      const infos = JSON.parse(data);
      return infos;
    } catch (error) {
      console.error(`Erro na leitura: ${error}`);
    }
  },

  async insert(name, newInfo) {
    try {
      const data = await this.read(name);
      const newData = JSON.stringify([...data, ...newInfo]);

      const newInfos = await fs.writeFile(path.resolve(__dirname, `${pathRoute}${name}.json`), newData);

      return newInfos;
    } catch (error) {
      console.error(`Erro na inserção: ${error}`);
    }
  },

  async create(name, infos) {
    try {
      const createdInfos = await fs.writeFile(path.resolve(__dirname, `${pathRoute}${name}.json`), infos);

      return createdInfos;
    } catch (error) {
      console.error(`Erro na criação: ${error}`);
    }
  }
};

module.exports = UtilsFs;
