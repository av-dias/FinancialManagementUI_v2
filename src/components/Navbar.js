import React from "react";
import "./Navbar.css";
import loginIcon from "../images/login.png";
import userIcon from "../images/user.png";

export default function Navbar(props) {
  return (
    <nav>
      <h1 className="nav--title">{props.Title || "Dashboard"}</h1>
      <img className="align--right nav--icon" src={userIcon} alt="Login"></img>
    </nav>
  );
}
