import axios from "axios";
import { GET_ALL_POKEMONS, SERVER_URL, LIMIT } from "../constantes";

function getAllPokemons() {
  return async (dispatch) =>
    await axios
      .get(`${SERVER_URL}/pokemons?limit=${LIMIT}`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_ALL_POKEMONS, payload: pokemons });
        console.log({ type: GET_ALL_POKEMONS, payload: pokemons });
      });
}

export { getAllPokemons };
