const { Router } = require("express");
const typesRoute = require("./types");
const addpokemon = require("./pokemon");
const pokemonsRoute = require("./pokemon");
const pokemonId = require("./pokemon");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/pokemons", pokemonsRoute);
router.use("/pokemons/:id", pokemonId);
router.use("/types", typesRoute);
router.use("/pokemons", addpokemon);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
