import React from "react";
import logo from "./Logo.png";
const Header = () => {
  return (
    <header
      style={{
        height: "150px",
        minHeight: "60px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <img
        alt="LOGO"
        src={logo}
        style={{
        width: "60px",
        borderRadius: "30px",
        minWidth: "40px",
        }}
      />
    </header>
  );
};
export default Header;
