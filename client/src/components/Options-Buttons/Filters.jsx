import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { filterByType, filterByUsers } from "../../actions/filters/porTYPE";
import { getAllPokemons } from "../../actions/get/porPOKEMON";
import styles from "./styles/Filters.module.css";

function Filters() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  const handleFilter = (e) => {
    const target = e.target;
    const idButton = target.id;
    const value = target.value;

    types.forEach((type) => {
      if (value.toString() === type.name) {
        dispatch(filterByType(value));
      }
    });
    if (value.toString() === "created") {
      dispatch(filterByUsers());
      console.log("allPokemons", allPokemons);
      if (allPokemons.length < 41) {
        alert("No pokemons created by users yet.");
        dispatch(getAllPokemons());
      }
    }
    if (value.toString() === "reset") {
      dispatch(getAllPokemons());
      document.getElementById("selector").value = -1;
    }
  };
  return (
    <aside className={styles.buttonContainer}>
      <select className={styles.byTypes} id="selector" onChange={handleFilter}>
        <option value="-1">Select a type </option>
        <option value="reset">Reset All</option>
        <option value="created">pokeCreated</option>
        {types.map((type) => (
          <option key={`type-${type.id}`} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </aside>
  );
}

export default Filters;
