const { Router } = require("express");
const router = Router();
const {
  getallpokemons,
  addpokemon,
  getID,
} = require("../controllers/pokemons");

router.get("/", getallpokemons);
router.get("/:id", getID);
router.post("/", addpokemon);

module.exports = router;
