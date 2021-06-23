/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles/NumberOfPages.module.css";

function NumberOfPages({ setPerPage, setPkmnsPerPage, perPage }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setPerPage(12);
  }, []);

  const handleChange = (e) => {
    setPerPage(e.target.value);
    dispatch(setPkmnsPerPage(perPage));
  };

  return (
    <select
      className={styles.selectContainer}
      name="pkmnsPerPage"
      onChange={handleChange}
      key="select-A"
    >
      <option value="12">Pokem for page </option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  );
}

export default NumberOfPages;
