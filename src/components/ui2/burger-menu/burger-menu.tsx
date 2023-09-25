import React, { useState } from "react";
import styles from "../burger-menu/burger-menu.module.scss";
import SideBar from "../side-bar/side-bar";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`${styles.burger} ${isOpen ? styles.active : ""}`} onClick={toggleMenu}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
      {isOpen && <SideBar />}
    </div>
  );
};

export default BurgerMenu;
