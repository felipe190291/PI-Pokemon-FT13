import axios from "axios";
import { GET_TYPES, SERVER_URL } from "../constantes";

function getTypes() {
  return async (dispatch) =>
    await axios
      .get(`${SERVER_URL}/types`)
      .then((res) => res.data)
      .then((types) => {
        console.log("gettypes", types);
        dispatch({ type: GET_TYPES, payload: types });
      });
}

export { getTypes };
