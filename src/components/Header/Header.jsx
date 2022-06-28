import React from "react";
import logo from "./Logo.png";
import classes from './header.module.css'
const Header = () => {
  return (
    <header className={classes.header}
    >
      <img
        alt="LOGO"
        src={logo}
        className={classes.header__logo}
      />
    </header>
  );
};
export default Header;
