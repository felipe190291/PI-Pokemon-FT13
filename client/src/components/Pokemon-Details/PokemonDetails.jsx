/* eslint-disable */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPokemonDetails } from "../../actions/get/porDETAIL.js";
import Spinner from "../Spinner/Spinner";
import styles from "./styles/PokemonDetails.module.css";

function PokemonDetails({ match }) {
  const pokemonDetails = useSelector((state) => state.pokemonDetails);
  console.log("pokemonDetails", pokemonDetails);
  const dispatch = useDispatch();

  const id = match.params.id;
  console.log("id", id);

  useEffect(async () => {
    dispatch(getPokemonDetails(id));
  }, []);

  if (!pokemonDetails) return <Redirect to="/home" />;
  if (Object.keys(pokemonDetails).length === 0) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2>{`#${pokemonDetails.id}`}</h2>
      <h2>{pokemonDetails.name}</h2>
      {Number.isInteger(Number(pokemonDetails.id)) ? (
        <img
          src={pokemonDetails.sprites.other["official-artwork"].front_default}
          alt={`${pokemonDetails.name} sprite.`}
        />
      ) : (
        <img
          src={pokemonDetails.image}
          alt={`${pokemonDetails.name} sprite.`}
        />
      )}

      <ul>
        <li>{`Life: ${
          pokemonDetails.life
            ? pokemonDetails.life
            : pokemonDetails.stats[0].base_stat
        }`}</li>
        <li>{`Attack: ${
          pokemonDetails.attack
            ? pokemonDetails.attack
            : pokemonDetails.stats[1].base_stat
        }`}</li>
        <li>{`Defense: ${
          pokemonDetails.defense
            ? pokemonDetails.defense
            : pokemonDetails.stats[2].base_stat
        }`}</li>
        <li>{`Speed: ${
          pokemonDetails.speed
            ? pokemonDetails.speed
            : pokemonDetails.stats[5].base_stat
        }`}</li>
        <li>{`Height: ${pokemonDetails.height}`}</li>
        <li>{`Weight: ${pokemonDetails.weight}`}</li>
      </ul>
      <h3>Types</h3>
      <section className={styles.types}>
        {pokemonDetails.types.map((type, index) =>
          type.type ? (
            type.length > 1 ? (
              <div>
                <button
                  className={styles.button1}
                >{`${type.type.name}`}</button>
                <button
                  className={styles.button1}
                >{`${type.type.name}`}</button>
              </div>
            ) : (
              <button className={styles.button2}>{`${type.type.name}`}</button>
            )
          ) : type.length > 1 ? (
            <div>
              <button className={styles.button1}>{`${type.name}`}</button>
              <button className={styles.button1}>{`${type.name}`}</button>
            </div>
          ) : (
            <button className={styles.button2}>{`${type.name}`}</button>
          )
        )}
      </section>
    </div>
  );
}

export default PokemonDetails;
