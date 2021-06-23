import {
  GET_ALL_POKEMONS,
  SET_PER_PAGE,
  GET_TYPES,
  GET_POKEMON_DETAILS,
  SET_PKMNS_STATS,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN_USER,
  LIMIT,
} from "../actions/constantes";

const initialState = {
  allPokemons: [],
  types: [],
  pokemonStats: [],
  pokemonDetails: {},
  pokemonsPerPage: LIMIT,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };
    case SET_PER_PAGE:
      return {
        ...state,
        pokemonsPerPage: action.payload,
      };
    case SET_PKMNS_STATS:
      // console.log("stats", state.pokemonStats);
      // console.log("action sttats", action.payload); //cada poke con typo electric,uno a uno
      const idExists = state.pokemonStats.find(
        (el) => el.id == action.payload.id
      );
      return {
        ...state,
        pokemonStats: !idExists //si es uno creado que lo devuelva con todo, tiene en cuenta los creados
          ? [...state.pokemonStats, action.payload]
          : state.pokemonStats,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case FILTER_BY_TYPE:
      // console.log("typosarrreglo", state.pokemonStats);
      // console.log("typosarrreglo", action.payload);
      const typeAndId = state.pokemonStats.filter(
        (el) => el.types.includes(action.payload.toString()) && el.id
      ); //pimeropor aca porque tiene las propiedades types, y luego si lo filtro al otro

      return {
        ...state,
        allPokemons: state.allPokemons.filter((pkmn) => {
          return typeAndId.find((el) => el.id == pkmn.id); //all llega como string, pokemonstats por number
        }),
      };
    case FILTER_BY_ORIGIN_USER:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemonDetails: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
