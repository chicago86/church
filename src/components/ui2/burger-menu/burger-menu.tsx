import React, { useState } from "react";
import classnames from "classnames";
import styles from "./burger-menu.module.scss";
import { Sidebar } from "../side-bar";

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={classnames(styles.burger, { [styles.active]: isOpen })} onClick={toggle}>
      <div className={styles.bar} />
      <div className={classnames(styles.backDrop, { [styles.active]: isOpen })} onClick={toggle} />
      <Sidebar isMobile isOpen={isOpen} />
    </div>
  );
};

export default BurgerMenu;
