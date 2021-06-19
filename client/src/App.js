import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/Navbars/Navbar";
import Landing from "./components/Landing-Page/Initial";
import Home from "./components/Home/Home";
import PokemonDetails from "./components/Pokemon-Details/PokemonDetails";

import AddPokemon from "./components/Add-Pokemon/AddPokemon";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Navbar} />
      <Route path="/pokemon" component={Navbar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/pokemon/:id" component={PokemonDetails} />
      <Route path="/home/add" component={AddPokemon} />
    </React.Fragment>
  );
}

export default App;
