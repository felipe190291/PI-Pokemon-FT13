import { FILTER_BY_TYPE } from "../constantes";
function filterByType(type) {
  console.log("type", type);
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
}

export { filterByType };
