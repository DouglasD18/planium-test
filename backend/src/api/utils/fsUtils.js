const fs = require('fs').promises;
const path = require('path');

const pathRoute = '../../../../';

async function read(name) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, `${pathRoute}${name}.json`));

    const infos = JSON.parse(data);
    return infos;
  } catch (error) {
    console.error(`Erro na leitura: ${error}`);
  }
}

async function create(name, infos) {
  try {
    const formated = JSON.stringify([infos]);
    const createdInfos = await fs.writeFile(path.resolve(__dirname, `${pathRoute}${name}.json`), formated);

    return createdInfos;
  } catch (error) {
    console.error(`Erro na criação: ${error}`);
  }
}

async function insert(name, newInfo) {
  try {
    const data = await read(name); 
    
    if (!data) {
      const created = await create(name, newInfo);

      return created;
    }

    const newData = JSON.stringify([...data, newInfo]);
    const newInfos = await fs.writeFile(path.resolve(__dirname, `${pathRoute}${name}.json`), newData);

    return newInfos;
  } catch (error) {
    console.error(`Erro na inserção: ${error}`);
  }
}

module.exports = {
  read,
  create,
  insert
};
