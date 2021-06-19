import axios from "axios";
import { GET_POKEMON_DETAILS, SERVER_URL } from "../constantes";

function getPokemonDetails(id) {
  return async (dispatch) => {
    await axios
      .get(`${SERVER_URL}/pokemons/${id}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({ type: GET_POKEMON_DETAILS, payload: data });
      })
      .catch((err) => console.error(err));
  };
}

export { getPokemonDetails };
