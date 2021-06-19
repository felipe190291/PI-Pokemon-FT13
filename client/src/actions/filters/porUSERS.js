import axios from "axios";
import { FILTER_BY_ORIGIN_USER, SERVER_URL } from "../constantes";

function filterByUsers() {
  return async (dispatch) => {
    await axios
      .get(`${SERVER_URL}/pokemons?filter=byUsers`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: FILTER_BY_ORIGIN_USER, payload: pokemons });
      });
  };
}

export { filterByUsers };
