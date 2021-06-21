/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPkmnsStats } from "../../actions/set/set.js";
import { SERVER_API } from "../../actions/constantes";
import styles from "./styles/Card.module.css";
import fondo from "../../Images/Mountains, Desert, Camels, Asia.mp4";

function Card({ name, pokeId }) {
  const dispatch = useDispatch();
  const [type, setType] = useState([]);
  const [image, setSprite] = useState("");
  let idCreated = null;
  useEffect(() => {
    const getImgAndTypes = async () => {
      let res = null;
      if (Number.isInteger(Number(pokeId))) {
        res = await axios.get(`${SERVER_API}${pokeId}`);
        dispatch(
          setPkmnsStats({
            id: res.data.id,
            life: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            image: res.data.sprites.other["official-artwork"].front_default,
            types: res.data.types.map((el) => el.type.name),
            height: res.data.height,
            weight: res.data.weight,
          })
        );
        setType(res.data.types.map((el) => el.type.name));
        pokeId <= 151;
        setSprite(res.data.sprites.other["official-artwork"].front_default);
      } else {
        res = await axios.get(`${SERVER_API}${pokeId}?limit=500`);
        dispatch(
          setPkmnsStats({
            id: res.data.id,
            life: res.data.life,
            attack: res.data.attack,
            defense: res.data.defense,
            speed: res.data.speed,
            image: res.data.image,
            types: res.data.types.map((el) => el.name),
            height: res.data.height,
            weight: res.data.weight,
          })
        );
        setSprite(res.data.image);
        setType(res.data.types.map((el) => el.name));
      }
    };
    getImgAndTypes();
  }, [pokeId]); //si no la imagen se desubica del poke inidicado
  //lo enfoca en cada card

  return (
    <div className={`${styles.container} ${styles[type[0]]}`}>
      <h3 className={styles.id}>
        {idCreated ? `#${idCreated}` : `#${pokeId}`}
      </h3>
      <img className={styles.sprite} src={image} alt="Pokemon sprite." />
      <h3 className={styles.name}>{name}</h3>
      {type.length > 1 ? (
        <div>
          <button className={styles.button1}>{`${type[0]}`}</button>
          <button className={styles.button1}>{`${type[1]}`}</button>
        </div>
      ) : (
        <button className={styles.button2}>{`${type[0]}`}</button>
      )}
    </div>
  );
}

export default Card;
