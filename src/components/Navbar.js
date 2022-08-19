import React from "react";
import navLogo from "../images/logo.png";

export default function Navbar(props) {
  return (
    <nav>
      <div className="nav--title">
        <img src={navLogo} alt="logo" className="nav--logo" />
        <h1>{props.title}</h1>
      </div>
    </nav>
  );
}
