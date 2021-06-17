const { Router } = require("express");
const typesRoute = require("./types");
const pokemonsRoute = require("./pokemon");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/pokemons", pokemonsRoute);
router.use("/types", typesRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
