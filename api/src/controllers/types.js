const { Type } = require("../db");
const { default: axios } = require("axios");
// const { v4: uuidv4 } = require("uuid");

async function getalltypes(req, res) {
  const tipos = await axios.get(`https://pokeapi.co/api/v2/type/`);
  let tiposdata = tipos.data.results;

  if (tiposdata) {
    tiposdata.forEach(async (element) => {
      await Type.create({
        name: element.name,
      });
    });
  }
  const guardado = await Type.findAll({
    attributes:["name","id"]
  });
  await res.json(guardado);
}
module.exports = {
  getalltypes,
};
