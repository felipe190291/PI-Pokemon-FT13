import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import production from "./sun-moon-team-up.mp4";
function App() {
  const [pokemons, setpokemons] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/pokemons")
      .then((pokemons) => setpokemons(pokemons.data));
  }, []);
  let pokemonData = pokemons.map((pokemon) => {
    return (
      <div>
        <h3>{pokemon.name}</h3>
        <h5>
          <em>{pokemon.type}</em>
        </h5>
        <p>
          <img src={pokemon.image} alt="pokemons" />
        </p>
      </div>
    );
  });
  return (
    <div className="App">
      <div>
        <video
          id="video"
          preload="auto"
          loop="loop"
          muted
          autoplay="autoplay"
          src={production}
        ></video>
      </div>
      <h1>{pokemonData}</h1>
    </div>
  );
}

export default App;
