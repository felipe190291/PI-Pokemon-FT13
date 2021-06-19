import axios from "axios";
import { SERVER_URL } from "../actions/constantes";

async function useNameExists(pokeName) {
  const listNames = await axios
    .get(`${SERVER_URL}/pokemons?limit=100`)
    .then((res) => res.data)
    .then((data) => data.map((pokemon) => pokemon.name))
    .catch((err) => console.error(err));

  const found = listNames.find(
    (name) => pokeName.toLowerCase() === name.toLowerCase()
  );

  return found;
}

export default useNameExists;
