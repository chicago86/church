import React, { useState } from "react";
import styles from './main.module.scss';
import Map from "../map-container/map";
import Bar from "../side-bar/bar";


const Menu = () => {
    return (
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.topSubcolumn}><Map/></div>
          <div className={styles.bottomSubcolumn}></div>
        </div>
        <div className={styles.rightColumn}><Bar/></div>
      </div>
    );
  };
  
  export default Menu;