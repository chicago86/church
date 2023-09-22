import React, { useState } from "react";
import map from './images/map.jpg'
import styles from './map.module.scss';


const Map = () => {
    return (
      <div className={styles.container}>
       <img className={styles.mapImg} src={map} alt="map" />
      </div>
    );
  };
  
  export default Map;