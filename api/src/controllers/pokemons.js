const { Pokemon, Type } = require("../db.js");
const { default: axios } = require("axios");

const { API_HOME } = require("../routes/constantes");
const { nameExists, promisifiedGetApi } = require("./promises");

function getallpokemons(req, res, next) {
  const { name, limit = 12, filter = null } = req.query;
  const pokeApiProps = promisifiedGetApi();
  const pokeMine = Pokemon.findAll({ include: Type });
  Promise.all([pokeApiProps, pokeMine])
    .then((response) => {
      let [pokeApiRes, pokeMineRes] = response;
      console.log("apifirst", pokeApiRes.concat(pokeMineRes));
      return pokeApiRes.concat(pokeMineRes);
    })
    .then((pokeList) => {
      if (name) {
        const hasPokemon = pokeList.find(
          (pokemon) => pokemon.name === name.toLowerCase()
        );
        console.log("hasPokemon", hasPokemon);

        return hasPokemon
          ? res.json(hasPokemon)
          : next({
              status: 404,
              message: "That pokemon does not exists.",
            });
      }

      const limitedList = pokeList.slice(0, limit);
      return res.json(limitedList);
    })
    .catch((err) => console.log(err));
}

function getID(req, res, next) {
  const id = req.params.id;
  const isNumber = /^[0-9]+$/.test(id);
  const isUUID =
    /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(
      id
    );
  if (isNumber) {
    return axios
      .get(`${API_HOME}/${id}`)
      .then((response) => response.data)

      .then((iddetail) => res.json(iddetail))
      .catch(() => next({ status: 404, message: "404 - Pokemon not found." }));
  }
  if (isUUID) {
    return Pokemon.findOne({ where: { id }, include: { model: Type } })
      .then((response) => res.json(response))
      .catch(() => next({ status: 404, message: "404 - Pokemon not found." }));
  }
  return next({
    status: 404,
    message: "That pokemon does not exist for now.",
  });
}

async function addpokemon(req, res, next) {
  let name = req.body.name.toLowerCase();
  const { life, attack, defense, speed, height, weight, types, image } =
    req.body;
  if (!name) return next("No hay nombre.");
  try {
    const hasName = await nameExists(name);
    if (hasName) return res.json({ message: "That name already exists" });
    const newPokemon = await Pokemon.create({
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    newPokemon.setTypes(types);
    console.log("newpoke", newPokemon);
    return res.json(newPokemon);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// const getallpokemons = async (req, res) => {
//   const { name } = req.query;
//   try {
//     if (name !== undefined) {
//       if (name && name !== "") {
//         let pokenombre = {};
//         pokenombre = await Pokemon.findOne({
//           where: { name },
//           attributes: { exclude: ["createdAt", "updatedAt"] },
//           include: {
//             model: Type,
//             attributes: ["name"],
//           },
//         });
//         if (pokenombre) {
//           return res.json(pokenombre);
//         } else {
//           const pokeAPI = await axios(
//             `https://pokeapi.co/api/v2/pokemon/${name}`
//           );

//           if (pokeAPI) {
//             pokenombre = {
//               id: pokeAPI.data.id,
//               name: pokeAPI.data.name,
//               image: pokeAPI.data.sprites.front_default,
//               life: pokeAPI.data.stats[0].base_stat,
//               force: pokeAPI.data.stats[1].base_stat,
//               defense: pokeAPI.data.stats[2].base_stat,
//               velocity: pokeAPI.data.stats[5].base_stat,
//               height: pokeAPI.data.height,
//               weight: pokeAPI.data.weight,
//             };
//             let types = pokeAPI.data.types.map((type) => type.type.name);
//             let pokenombre = { ...pokenombre, types: types };
//             return res.json(pokenombre);
//           }
//         }
//       }
//     }

//     const pokemonsApi = await axios(
//       `https://pokeapi.co/api/v2/pokemon?limit=40`
//     );
//     const pokemonsDB = await Pokemon.findAll({
//       attributes: ["id", "name", "image", "force"],
//       include: {
//         model: Type,
//         attributes: ["name"],
//       },
//     });

//     //** ELIMINAR CAMPO POKEMON_TYPE**
//     // if(pokemonsDB.length > 0){
//     //     pokemonsDB.map(poke => {  poke.types.map(type => delete type.pokemon_type)
//     // })

//     // }

//     //guardo todos los pokes con sus detalles
//     let pokeDetails = await Promise.all(
//       pokemonsApi.data.results.map(async (poke) => await axios(poke.url))
//     );
//     //seteo los objetos con las prop que necesito
//     pokeDetails = pokeDetails.map((poke) => {
//       let newPoke = {};
//       //por cada poke
//       newPoke = {
//         id: poke.data.id,
//         image: poke.data.sprites.other.dream_world.front_default, //imagen
//         attack: poke.data.stats[1].base_stat,
//         name: poke.data.name,
//       };
//       let types = poke.data.types.map((type) => type.type);
//       //nesecito un obj con propiedad name para hacer filtros en el front
//       types.map((type) => delete type.url);
//       return (newPoke = { ...newPoke, types: types });
//     });

//     pokeDetails = pokeDetails.concat(pokemonsDB);
//     return res.json({
//       Numeropokemons: pokeDetails.length,
//       pokemons: pokeDetails,
//     });
//   } catch (error) {
//     console.log("Error en la consulta de getPokemons", error);
//     //se puede usar un switch para saber que error en con la propiedad status error.response.status
//     if ((error.status = 404))
//       return res.status(404).json({
//         message: `El pokemon con nombre ${name} no se encontro. Intente nuevamente.`,
//       });
//     res.status(500).json({ message: "Hubo un problema en el servidor" });
//   }
// };

//   let fullPokemons = [];
//   if (req.query.name) {
//     let fullPokemons = [];
//     let { name } = req.query;
//     let nuevoname = name.replace(/['"]+/g, "");
//     try {
//       const pokemons = await axios.get(
//         `https://pokeapi.co/api/v2/pokemon/${nuevoname}`
//       );
//       const response = await pokemons.data;
//       let poke = {
//         id: response.id,
//         name: response.name,
//         image: response.sprites.front_default,
//         type: response.types.map((e) => e.type.name),
//         name: response.name,
//         life: response.stats[0].base_stat,
//         force: response.stats[1].base_stat,
//         defense: response.stats[2].base_stat,
//         velocity: response.stats[5].base_stat,
//         height: response.height,
//         weight: response.weight,
//       };

//       fullPokemons = [...fullPokemons, poke];
//       await res.status(200).json(fullPokemons);
//     } catch (error) {
//       if ((error.status = 404)) {
//         const find = await Pokemon.findAll({
//           where: {
//             [Op.or]: { name: { [Op.like]: `%${nuevoname}%` } },
//           },
//           attributes: [
//             "id",
//             "name",
//             "image",

//             "life",
//             "force",
//             "defense",
//             "velocity",
//             "height",
//             "weight",
//           ],
//         });
//         if (find.length > 0) {
//           if ((error.status = 500)) {
//             res.status(200).send(find);
//           }
//         } else {
//           if ((error.status = 500)) {
//             res.status(200).send({
//               message: "Lo sentimos no se encontro tu pokemon",
//             });
//           }
//         }
//       }
//     }
//   } else if (req.query.offset) {
//     let limit = req.query.limit;
//     let offset = req.query.offset;

//     const pokemons = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
//     );
//     const response = pokemons.data.results;

//     if (offset === "10") {
//       console.log(offset + 10);

//       let count = pokemons.data;
//       count = [
//         {
//           next: `http://localhost:3001/pokemons?offset=${
//             Number(offset) + 10
//           }&limit=10`,
//           previous: `http://localhost:3001/pokemons`,
//         },
//       ];
//       try {
//         for (let i = 0; i < response.length; i++) {
//           try {
//             let detail = (await axios.get(response[i].url)).data;
//             let poke = {
//               name: detail.name,
//               image: detail.sprites.front_default,
//               type: detail.types.map((e) => e.type.name),
//             };

//             fullPokemons = [...fullPokemons, poke];
//           } catch (error) {
//             return next(error);
//           }
//         }
//         let dataBase = await Pokemon.findAll({
//           attributes: ["name", "image", "type"],
//         });
//         await res.status(200).json(fullPokemons.concat(dataBase).concat(count));
//       } catch (error) {
//         return next(error);
//       }
//     }
//     if (offset > "10" && offset < "40") {
//       let count1 = pokemons.data;
//       count1 = {
//         next: `http://localhost:3001/pokemons?offset=${
//           Number(offset) + 10
//         }&limit=10`,
//         previous: `http://localhost:3001/pokemons?offset=${
//           Number(offset) - 10
//         }&limit=10`,
//       };

//       try {
//         offset = offset + 10;
//         for (let i = 0; i < response.length; i++) {
//           try {
//             let detail = (await axios.get(response[i].url)).data;
//             let poke = {
//               name: detail.name,
//               image: detail.sprites.front_default,
//               type: detail.types.map((e) => e.type.name),
//             };

//             fullPokemons = [...fullPokemons, poke];
//           } catch (error) {
//             return next(error);
//           }
//         }
//         let dataBase = await Pokemon.findAll({
//           attributes: ["name", "image", "type"],
//         });
//         await res
//           .status(200)
//           .json(fullPokemons.concat(dataBase).concat(count1));
//       } catch (error) {
//         return next(error);
//       }
//     }
//     if (offset >= "40") {
//       let count = pokemons.data;
//       count = [
//         {
//           next: null,
//           previous: `http://localhost:3001/pokemons?offset=${
//             Number(offset) - 10
//           }&limit=10`,
//         },
//       ];

//       try {
//         offset = offset + 10;
//         for (let i = 0; i < response.length; i++) {
//           try {
//             let detail = (await axios.get(response[i].url)).data;
//             let poke = {
//               name: detail.name,
//               image: detail.sprites.front_default,
//               type: detail.types.map((e) => e.type.name),
//             };

//             fullPokemons = [...fullPokemons, poke];
//           } catch (error) {
//             return next(error);
//           }
//         }
//         let dataBase = await Pokemon.findAll({
//           attributes: ["name", "image", "type"],
//         });
//         await res.status(200).json(fullPokemons.concat(dataBase).push(count));
//       } catch (error) {
//         return next(error);
//       }
//     }
//   } else {
//     let limit = 10;
//     let offset = 0;
//     const pokemons = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
//     );
//     const response = pokemons.data.results;
//     let count = pokemons.data;
//     count = [
//       {
//         next: `http://localhost:3001/pokemons?offset=${limit}&limit=10`,
//         previous: null,
//       },
//     ];

//     try {
//       for (let i = 0; i < response.length; i++) {
//         try {
//           let detail = (await axios.get(response[i].url)).data;
//           let poke = {
//             name: detail.name,
//             image: detail.sprites.front_default,
//             type: detail.types.map((e) => e.type.name),
//           };
//           fullPokemons = [...fullPokemons, poke];
//         } catch (error) {
//           return next(error);
//         }
//       }
//       let perro = await Pokemon.findAll({
//         attributes: ["name", "image", "type"],
//       });
//       let run = fullPokemons.concat(perro).concat(count);

//       return await res.status(200).json(run);
//     } catch (error) {
//       return next(error);
//     }
//   }
// }

// async function getID(req, res) {
//   // let fullPokemons = [];
//   let { id } = req.params;
//   if (!id) return res.status(400).json({ message: " invalid ID." });
//   // let nuevoid = id.replace(/['"]+/g, "");
//   try {
//     if (!id.includes("-")) {
//       const pokemons = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
//       const response = await pokemons.data;
//       let pokemon = {
//         id: response.id,
//         name: response.name,
//         image: response.sprites.front_default,
//         life: response.stats[0].base_stat,
//         force: response.stats[1].base_stat,
//         defense: response.stats[2].base_stat,
//         velocity: response.stats[5].base_stat,
//         height: response.height,
//         weight: response.weight,
//       };
//       let types = response.types.map((type) => {
//         let obj = {};
//         return (obj = { name: type.type.name });
//       });
//       pokemon = { ...pokemon, types: types };
//       res.json(pokemon);
//     } else {
//       const pokemon = await Pokemon.findByPk(String(id), {
//         attributes: { exclude: ["createdAt", "updatedAt"] },
//         include: {
//           model: Type,
//           attributes: ["name"],
//         },
//       });
//       pokemon
//         ? res.json(pokemon)
//         : res.status(400).json({ message: "Invalid ID." });
//     }
//   } catch (error) {
//     console.log("Error en la consulta de getPokemonID", error);
//     res.sendStatus(500, { message: "Hubo un problema en el servidor" });
//   }
// }
//   try {
//     const pokemons = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${nuevoid}`
//     );
//     const response = await pokemons.data;

//     let poke = {
//       id: response.id,
//       name: response.name,
//       image: response.sprites.front_default,
//       type: response.types.map((e) => e.type.name),
//       name: response.name,
//       life: response.stats[0].base_stat,
//       force: response.stats[1].base_stat,
//       defense: response.stats[2].base_stat,
//       velocity: response.stats[5].base_stat,
//       height: response.height,
//       weight: response.weight,
//     };

//     fullPokemons = [...fullPokemons, poke];
//     await res.json(fullPokemons);
//   } catch (error) {
//     if ((error.status = 404)) {
//       const find = await Pokemon.findAll({
//         where: {
//           id: nuevoid,
//         },
//         attributes: [
//           "id",
//           "name",
//           "life",
//           "force",
//           "image",
//           "defense",
//           "velocity",
//           "height",
//           "weight",
//         ],
//       });
//       if (find.length > 0) {
//         if ((error.status = 500)) {
//           res.send(find);
//         }
//         //  next(find);
//       } else {
//         if ((error.status = 500)) {
//           res.send({
//             message: "Lo sentimos no se encontro tu pokemon",
//           });
//         }
//       }
//       // return next(find);
//       // return next("sigmo");
//     }
//   }
// }

// async function addpokemon(req, res, next) {
//   let { name, image, life, force, velocity, defense, height, weight, types } =
//     req.body;
//   try {
//     const createpokemon = await Pokemon.create({
//       name,
//       image,
//       life,
//       force,
//       velocity,
//       defense,
//       height,
//       weight,
//     });
//     createpokemon.addType(types);
//     res.json(`${createpokemon.name}`);
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  getallpokemons,
  addpokemon,
  getID,
};
