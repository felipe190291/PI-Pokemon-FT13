import {
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN_USER,
  SERVER_URL,
} from "../constantes";
const { default: axios } = require("axios");
function filterByType(type) {
  console.log("type", type);
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
}
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

export { filterByType, filterByUsers };
