import React from "react";
import { NavLink } from "react-router-dom";
import useQuery from "../../hooks/useQuery.hook";
import styles from "./styles/Pagination.module.css";

function Pagination({ pokemonsPerPage, totalPkmns, paginate }) {
  const query = useQuery().get("page" || 1);
  console.log("query", query);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPkmns / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }
  console.log("pageNumber", pageNumber);

  return (
    <nav className={styles.navpag}>
      <ul className={styles.navpagUl}>
        {pageNumber.map((number, index) => (
          <NavLink
            to={`/home?page=${number}`}
            key={`page-${index}`}
            className={
              parseInt(query) === number
                ? `${styles.navpagLi} ${styles.active}`
                : styles.navpagLi
            }
            onClick={() => paginate(number)}
          >
            <li key={`li-${index}`}>{number}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
