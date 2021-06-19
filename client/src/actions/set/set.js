import { SET_PER_PAGE, SET_PKMNS_STATS } from "../constantes";

export function setPkmnsPerPage(payload) {
  return {
    type: SET_PER_PAGE,
    payload,
  };
}

export function setPkmnsStats(payload) {
  return {
    type: SET_PKMNS_STATS,
    payload,
  };
}
