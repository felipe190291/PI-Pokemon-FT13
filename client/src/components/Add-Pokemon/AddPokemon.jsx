/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import useNameExists from "../../hooks/useNameExists";
import { getTypes } from "../../actions/get/porTYPE";
import { SERVER_URL } from "../../actions/constantes.js";
// import image from "../../Images/toppng.com-3d-pokeball-transparent-pokemon-ball-3d-304x304.png";
import styles from "./styles/AddPokemon.module.css";

function AddPokemon({ history }) {
  const allTypes = useSelector((state) => state.types);
  // const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: " ",
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: null,
    image: null,
  });
  const [type, setType] = useState([]);
  const [errorsName, setErrorsName] = useState("");
  const [errorsNumbers, setErrorsNumbers] = useState("");

  useEffect(() => {
    getTypes();
    const exists = async () => {
      try {
        const res = await useNameExists(input.name.toLowerCase());
        if (input.name.length !== 0 && res) {
          setErrorsName("That name already exists.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    exists();
  }, [input.name]);

  const handleChange = (e) => {
    const target = e.target;
    console.log("target", target);
    const regexName = /^[A-Za-z]+$/;
    setInput({
      ...input,
      [target.name]: target.value,
    });

    if (!input.name) {
      setErrorsName("Name is required");
    } else if (!regexName.test(input.name)) {
      setErrorsName("Name is invalid.");
    } else {
      setErrorsName(null);
    }

    if (!input.attack) {
      setErrorsNumbers("This attribute is missing.");
    } else if (!Number.isInteger(Number(input.attack))) {
      setErrorsNumbers("Must be a number.");
    } else {
      setErrorsNumbers(null);
    }
  };

  const handleChecked = (e) => {
    const checked = e.target.checked;

    console.log("checked", checked);
    const value = e.target.value;
    console.log("value", value);

    if (checked) {
      setType([...type, parseInt(value)]);
    } else if (!checked) {
      setType(type.filter((el) => el !== parseInt(value)));
    }

    // if (type.length >= 2) {
    //   const newType = [...type];
    //   document.getElementById(type[0]).checked = false;
    //   newType.shift();
    //   setType([...newType, parseInt(value)]);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type.length === 1 || type.length === 2) {
      return await axios
        .post(`${SERVER_URL}/pokemons`, {
          name: input.name,
          life: input.life,
          attack: input.attack,
          defense: input.defense,
          speed: input.speed,
          height: input.height,
          weight: input.weight,
          types: type,
          image:
            input.image ||
            "../../Images/WhatsApp Image 2021-06-03 at 12.32.56 PM.jpeg",
        })
        .then((res) =>
          res.data.hasOwnProperty("message")
            ? alert(res.data.message)
            : history.push(`/home`)
        )
        .catch((err) => console.log(err));
    } else {
      alert("Falta seleccionar tipos o seleccionados de mas.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <section className={styles.inputs}>
        <h3>Properties</h3>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          className={errorsName ? styles.errorName : styles.correctName}
          placeholder="Name…"
        />
        {errorsName ? (
          <label htmlFor="name" className={styles.errorMessage}>
            {errorsName}
          </label>
        ) : null}

        <label htmlFor="life">LIFE</label>
        <input
          required
          id="life"
          name="life"
          type="number"
          onChange={handleChange}
          placeholder="life"
        />
        <label htmlFor="attack">Attack</label>
        <input
          required
          id="attack"
          name="attack"
          type="number"
          onChange={handleChange}
          className={errorsNumbers ? styles.errorNumbers : styles.correctNumber}
          placeholder="Attack…"
        />
        {errorsNumbers ? (
          <label htmlFor="name" className={styles.errorMessage}>
            {errorsNumbers}
          </label>
        ) : null}
        <label htmlFor="defense">Defense</label>
        <input
          required
          id="defense"
          name="defense"
          type="number"
          onChange={handleChange}
          placeholder="Defense…"
        />
        <label htmlFor="speed">Speed</label>
        <input
          required
          name="speed"
          id="speed"
          type="number"
          onChange={handleChange}
          placeholder="Speed…"
        />
        <label htmlFor="weight">Weight (Kg)</label>
        <input
          required
          id="weight"
          name="weight"
          type="number"
          onChange={handleChange}
          placeholder="Weight…"
        />
        <label htmlFor="height">Height (cm)</label>
        <input
          required
          name="height"
          id="height"
          type="number"
          onChange={handleChange}
          placeholder="Height…"
        />
        <label htmlFor="image">Image Link</label>
        <input
          type="text"
          name="image"
          id="link"
          className={styles.inputLink}
          onChange={handleChange}
          placeholder="Image link…"
        />
      </section>

      <section className={styles.typesContainer}>
        {allTypes.map((eachType) => (
          <label className={styles.label} key={`type-${eachType.id}`}>
            <input
              className={styles.checkbo}
              type="checkbox"
              id={eachType.id}
              value={eachType.id}
              onChange={handleChecked}
            />
            {eachType.name}
          </label>
        ))}
      </section>
      <input
        className={styles.submit}
        disabled={
          errorsName || errorsNumbers || type.length < 1 || type.length > 2
            ? true
            : false
        }
        type="submit"
        value="Create Pokemon"
      />
    </form>
  );
}

export default AddPokemon;
