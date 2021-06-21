import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType } from "../../actions/filters/porTYPE";
import { getAllPokemons } from "../../actions/get/porPOKEMON";
import styles from "./styles/Filters.module.css";

function Filters() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const target = e.target;
    const idButton = target.id;
    const value = target.value;

    types.forEach((type) => {
      if (value.toString() === type.name) {
        dispatch(filterByType(value));
      }
    });
    if (idButton === "clear") {
      dispatch(getAllPokemons());
      document.getElementById("selector").value = -1;
    }
  };
  return (
    <aside className={styles.buttonContainer}>
      <select className={styles.byTypes} id="selector" onChange={handleFilter}>
        <option value="-1">Select a type</option>
        {types.map((type) => (
          <option key={`type-${type.id}`} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <button onClick={handleFilter} id="clear">
        Delete
      </button>
    </aside>
  );
}

export default Filters;
