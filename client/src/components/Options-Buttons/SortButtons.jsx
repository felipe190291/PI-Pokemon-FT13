import React from "react";
import { useSelector } from "react-redux";
import {
  useCompareAsc,
  useCompareDes,
  useCompareId,
  useCompareAttackAsc,
  useCompareAttackDes,
} from "../../hooks/useCompare.hook";
import styles from "./styles/SortButtons.module.css";

function SortButtons({ listPokemons, history }) {
  const stats = useSelector((state) => state.pokemonStats);

  const handleFilter = (e) => {
    const name = e.target.value;
    console.log("name1", name);
    if (name === "number") {
      listPokemons.sort(useCompareId);
    }
    if (name === "nameAZ") {
      listPokemons.sort(useCompareAsc);
    }
    if (name === "nameZA") {
      listPokemons.sort(useCompareDes);
    }
    if (name === "byStatsAsc") {
      stats.sort(useCompareAttackAsc);
      const sortingArray = stats.map((el) => el.id);
      listPokemons.sort(function (a, b) {
        const A = Number.isInteger(Number(a.id)) ? parseInt(a.id) : a.id;
        const B = Number.isInteger(Number(b.id)) ? parseInt(b.id) : b.id;
        if (name === "byStatsAsc") {
          if (sortingArray.indexOf(A) > sortingArray.indexOf(B)) return 1;
          return -1;
        }
        if (sortingArray.indexOf(A) < sortingArray.indexOf(B)) return 1;
        return -1;
      });
    }
    if (name === "byStatsDes") {
      stats.sort(useCompareAttackDes);
      const sortingArray = stats.map((el) => el.id);
      listPokemons.sort(function (a, b) {
        const A = Number.isInteger(Number(a.id)) ? parseInt(a.id) : a.id;
        const B = Number.isInteger(Number(b.id)) ? parseInt(b.id) : b.id;
        if (name === "byStatsAsc") {
          if (sortingArray.indexOf(A) > sortingArray.indexOf(B)) return 1;
          return -1;
        }
        if (sortingArray.indexOf(A) < sortingArray.indexOf(B)) return 1;
        return -1;
      });
    }
    return history.push("/home");
  };
  return (
    <aside className={styles.buttonContainer}>
      <select onChange={handleFilter} className={styles.byorder}>
        <option value="-1">Select order </option>
        <option value="number">Number</option>
        <option value="nameAZ">A-Z</option>
        <option value="nameZA">Z-A</option>
        <option value="byStatsAsc">Attack ↑</option>
        <option value="byStatsDes">Attack ↓</option>
      </select>
    </aside>
  );
}

export default SortButtons;
