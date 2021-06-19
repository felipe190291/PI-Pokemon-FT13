import React from "react";
// import { NavLink } from "react-router-dom";
// import { GiPokecog } from "react-icons/gi";
import styles from "./styles/Initial.module.css";
import { Link } from "react-router-dom";

import image from "../../Images/International_Pokémon_logo.svg";
import pro from "../../Images/sun-moon-team-up.mp4";
export function Landing() {
  return (
    <div className={styles.Landing}>
      <div className={styles.pokemon}>
        <img width="1000" heigth="1000" src={image} alt="" />
      </div>
      <div>
        <video
          className={styles.video}
          src={pro}
          preload="auto"
          loop="loop"
          muted
          autoPlay="autoplay"
        ></video>
        <Link to="/home">
          <button className={styles.button}>Welcome</button>
        </Link>
        {/* <img className="image" src={image} alt="picture" /> */}
      </div>
    </div>
  );
}

export default Landing;
