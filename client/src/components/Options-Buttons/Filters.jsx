import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByApi } from "../../actions/filters/porAPI";
import { filterByUsers } from "../../actions/filters/porUSERS";
import { filterByType } from "../../actions/filters/porTYPE";
import { getAllPokemons } from "../../actions/get/porPOKEMON";
import styles from "./styles/Filters.module.css";

function Filters({ history }) {
  const types = useSelector((state) => state.types);
  console.log("typesall", types);
  const allPokemons = useSelector((state) => state.allPokemons);
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    const target = e.target;
    const idButton = target.id;
    const value = target.value;
    console.log("tpiseval", value);
    types.forEach((type) => {
      if (value.toString() === type.name) {
        dispatch(filterByType(value));
        return history.push("/home");
      }
    });

    if (idButton === "created") {
      dispatch(filterByUsers());
      if (!allPokemons) {
        alert("No pokemons created by users yet.");
        dispatch(getAllPokemons());
      }
      return history.push("/home");
    }
    if (idButton === "originals") {
      dispatch(filterByApi());
      return history.push("/home");
    }

    if (idButton === "clear") {
      dispatch(getAllPokemons());
      document.getElementById("selector").value = -1;
      return history.push("/home");
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
        Delete Filters
      </button>
    </aside>
  );
}

export default Filters;
