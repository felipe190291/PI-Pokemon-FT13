const { Pokemon } = require("../db.js");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

async function getallpokemons(req, res, next) {
  let fullPokemons = [];

  
  if (req.query.name) {
    let fullPokemons = [];
    let { name } = req.query;
    let nuevoname = name.replace(/['"]+/g, "");
    try {
      const pokemons = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nuevoname}`
      );
      const response = await pokemons.data;
      let poke = {
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        type: response.types.map(e=>e.type.name),
        name: response.name,
        life: response.stats[0].base_stat,
        force: response.stats[1].base_stat,
        defense: response.stats[2].base_stat,
        velocity: response.stats[5].base_stat,
        height: response.height,
        weight: response.weight,
      };

      fullPokemons = [...fullPokemons, poke];
      await res.json(fullPokemons);
    } catch  (error) { 
      if(error.status=404  ){
        const find = await Pokemon.findAll({
          where: {       
            [Op.or]: { name: { [Op.like]: `%${nuevoname}%` } },
          },
          attributes: [
            "id",
            "name",
            "image",
            "type",
            "life",
            "force",
            "defense",
            "velocity",
            "height",
            "weight",
          ],
        });
        if ((find.length>0)) {
          if(error.status=500 ){
            res.send(find)
        }
      } 
        else {
          if(error.status=500 ){
            res.send({
              message:"Lo sentimos no se encontro tu pokemon"
            })
        }
        } 
      }
    }
  } 
  if(req.query.offset){
    let limit = req.query.limit;
     let offset=req.query.offset;
    const pokemons = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
const response = pokemons.data.results;
let count=pokemons.data
count={
  count:40,
  next:"localhost:3001/pokemons?offset=10&limit=10",
  previous:null
}
// let pagination=pokemons.data.next
// let pagination1=pokemons.data.previous

  try {
    offset=offset+10
    for (let i = 0; i < response.length; i++) {
      try {
        let detail = (await axios.get(response[i].url)).data;
        let poke = {
          name: detail.name,
          image: detail.sprites.front_default,
          type: detail.types.map(e=>e.type.name),
        };

        // if(offset===)
      
        fullPokemons = [...fullPokemons, poke];
      } catch (error) {
        return next(error);
      }
    }
    let dataBase = await Pokemon.findAll({
      attributes:["name","image","type"]
    });
    await res.json(fullPokemons.concat(dataBase).concat(count));
  } catch (error) {
    return next(error);
  }
  }
  
  else {
   
     let limit = 10;
     let offset=0;
   const pokemons = await axios.get(
     `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   );
   const response = pokemons.data.results;

    try {
      for (let i = 0; i < response.length; i++) {
        try {
          let detail = (await axios.get(response[i].url)).data;
          let poke = {
            name: detail.name,
            image: detail.sprites.front_default,
            type: detail.types.map(e=>e.type.name),
          };
          fullPokemons = [...fullPokemons, poke];
        } catch (error) {
          return next(error);
        }
      }
      let perro = await Pokemon.findAll({
        attributes:["name","image","type"]
      });
      await res.json(fullPokemons.concat(perro));
    } catch (error) {
      return next(error);
    }
  }
}


async function getID(req, res, next) {
  let fullPokemons = [];
  let { id } = req.params;
  let nuevoid = id.replace(/['"]+/g, "");
  try {
    const pokemons = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nuevoid}`
    );
    const response = await pokemons.data;

    let poke = {
      id: response.id,
      name: response.name,
      image: response.sprites.front_default,
      type: response.types.map(e=>e.type.name),
      name: response.name,
      life: response.stats[0].base_stat,
      force: response.stats[1].base_stat,
      defense: response.stats[2].base_stat,
      velocity: response.stats[5].base_stat,
      height: response.height,
      weight: response.weight,
    };

    fullPokemons = [...fullPokemons, poke];
    await res.json(fullPokemons);
  } catch (error) {
    if(error.status=404 ){
      const find = await Pokemon.findAll({
        where: {
          id: nuevoid,
        },
        attributes: [
          "id",
          "name",
          "life",
          "force",
          "image",
          "type",
          "defense",
          "velocity",
          "height",
          "weight",
        ],
      });
      if ((find.length>0)) {
        if(error.status=500 ){
          res.send(find)
      }
      //  next(find);
    } 
      else {
        if(error.status=500 ){
          res.send({
            message:"Lo sentimos no se encontro tu pokemon"
          })
      }
      } 
      // return next(find);
      // return next("sigmo");
    
  }
}
}

async function addpokemon(req, res, next) {
  const id = uuidv4();
  const pokemonbody = { ...req.body, id };

  try {
    const createpokemon = await Pokemon.create(pokemonbody);
    return res.send(createpokemon);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getallpokemons,
  addpokemon,
  getID,
};

// id: uuidv4(),
// name: detail.name,
// life: detail.stats[0].base_stat,
// force: detail.stats[1].base_stat,
// defense: detail.stats[2].base_stat,
// velocity: detail.stats[5].base_stat,
// height: detail.height,
// weight: detail.weight,
// Id: detail.id,
// image: detail.sprites.front_default,
// type: detail.types[0].type.name,
// Id: detail.id,
// image: detail.sprites.front_default,
// type: detail.types[0].type.name,

// defaults: {
//   Id: detail.id,
//   image: detail.sprites.front_default,
//   type: detail.types[0].type.name,
// },
// let perro = await Pokemon.findAll();
// const filtrado = await Pokemon.findAll();

// const guardado = await Pokemon.findOrCreate({
//   where: {
//     name: { [Op.iLike]: `%${req.query.name}%` },
//   },
//   //   [Op.substring]: `%req.query.name%`,
//   // },
// });
// await res.json(guardado);
// } else {
// try {
//   const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
//   const response = pokemons.data.results;
//   for (let i = 0; i < response.length; i++) {
//     try {
//       let detail = (await axios.get(response[i].url)).data;
//       let poke = {
//         name: detail.name,
//         image: detail.sprites.front_default,
//         type: detail.types[0].type.name,
//       };
//       fullPokemons = [...fullPokemons, poke];
//     } catch (error) {
//       next(error);
//     }
//   }
//   await res.json(fullPokemons);
// } catch (error) {
//   next(error);
// }
