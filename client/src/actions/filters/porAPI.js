import axios from "axios";
import { FILTER_BY_ORIGIN_API, SERVER_URL, LIMIT } from "../constantes.js";

function filterByApi() {
  return async (dispatch) => {
    await axios
      .get(`${SERVER_URL}/pokemons?filter=byApi&limit=${LIMIT}`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: FILTER_BY_ORIGIN_API, payload: pokemons });
        console.log("filterpo api", {
          type: FILTER_BY_ORIGIN_API,
          payload: pokemons,
        });
      });
  };
}

export { filterByApi };
