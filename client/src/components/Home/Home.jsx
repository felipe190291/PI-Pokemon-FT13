/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons } from "../../actions/get/porPOKEMON";
import { getTypes } from "../../actions/get/porTYPE";
import { setPkmnsPerPage } from "../../actions/set/set.js";
import useQuery from "../../hooks/useQuery.hook";
import Spinner from "../Spinner/Spinner";
import NumberOfPages from "../Options-Buttons/NumberOfPages";
import SortButtons from "../Options-Buttons/SortButtons";
import Card from "./Card";
import Pagination from "../Options-Buttons/Pagination";
import Filters from "../Options-Buttons/Filters";
// import fondo from "../../Images/Mountains, Desert, Camels, Asia.mp4";
import styles from "./styles/Home.module.css";

function Home({ history }) {
  console.log("histoty", history);

  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const dispatch = useDispatch();
  const query = useQuery().get("page");
  const [currentPage, setCurrentPage] = useState(query || 1);
  const [perPage, setPerPage] = useState(pokemonsPerPage);
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getTypes());
  }, []);

  if (allPokemons.length === 0) return <Spinner className={styles.Spinner} />;

  const indexOfLastPkmn = currentPage * perPage;
  const indexOfFirstPkmn = indexOfLastPkmn - perPage;
  const currentPkmns = allPokemons.slice(indexOfFirstPkmn, indexOfLastPkmn);

  const paginate = (number) => {
    setCurrentPage(number);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container} id="home">
      {/* <video
        className={styles.video}
        src={fondo}
        preload="auto"
        loop="loop"
        muted
        autoPlay="autoplay"
      ></video> */}
      <section className={styles.asideContainer}>
        <input
          id="check"
          type="checkbox"
          name="check"
          className={styles.hamburguerCheck}
        />
        <label htmlFor="check" className={styles.hamburguerContainer}>
          <div className={styles.hamburguer}></div>
          <div className={styles.hamburguer}></div>
          <div className={styles.hamburguer}></div>
        </label>
        <article className={styles.asideScroll}>
          <NumberOfPages
            setPerPage={setPerPage}
            setPkmnsPerPage={setPkmnsPerPage}
            perPage={perPage}
            history={history}
          />
        </article>
        <article className={styles.asideSort}>
          <SortButtons listPokemons={allPokemons} history={history} />
        </article>
        <article className={styles.asideFilter}>
          <Filters />
        </article>
      </section>
      <section className={styles.cardsContainer}>
        {currentPkmns.map((pokemon, index) => {
          return (
            <a key={`poke-${index}`} href={`/pokemon/${pokemon.id}`}>
              <Card
                className={styles.card}
                name={pokemon.name}
                pokeId={pokemon.id}
                key={index}
                id={index}
              />
            </a>
          );
        })}
      </section>
      <section className={styles.pagesContainer}>
        <Pagination
          pokemonsPerPage={perPage}
          totalPkmns={allPokemons.length}
          paginate={paginate}
        />
      </section>
    </div>
  );
}

export default Home;
