import React from "react";
import bulba from "../../Images/Bulbasaur_XY_AttackAnimation_Sprite.gif";
import styles from "./styles/spinner.module.css";
function Spinner() {
  return (
    <div>
      <div>
        <img src={bulba} className={styles.Spinner}></img>
      </div>
      {/* <div className="double-bounce2">🚕</div> */}
    </div>
  );
}

export default Spinner;
