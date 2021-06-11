import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
export function NavBar() {
  return (
    <div>
      <div className="inicio">
        <img src={movie} width="50" heigth="50" alt="no se " />
      </div>
      <div className="NavBar">
        <NavLink to="/">
          <img src={home} width="50" heigth="50" alt="no se " />
        </NavLink>
        <br />
        <NavLink exact to="/favs">
          <img src={favs} width="50" heigth="50" alt="no se " />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
