const { Type } = require("../db");
// const { default: axios } = require("axios");
// const { API_TYPES } = require("../routes/constantes");
function getalltypes(req, res, next) {
  //   const insert = axios
  //     .get(`${API_TYPES}`)
  //     .then((response) => response.data.results)
  //     .then((typeNames) =>
  //       typeNames.filter(
  //         (type) => type.name !== "unknown" && type.name !== "shadow"
  //       )
  //     )
  //     .then((typeMapped) => {
  //       for (let obj of typeMapped) {
  //         Type.create({ name: obj.name });
  //       }
  //       return true;
  //     })
  //     .catch((err) => console.error(err));
  //   Promise.all([insert]).then(() => console.log("Types loaded."));

  Type.findAll()
    .then((response) => res.json(response))
    .catch((err) => next(err));
}

module.exports = {
  getalltypes,
};
