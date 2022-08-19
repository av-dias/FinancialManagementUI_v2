import React from "react";
import "./Sidebar.css";
import navLogo from "../images/logo.png";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <img src={navLogo} alt="logo" className="sidebar--logo" />
      <hr />
      <p className="sidebar--button hover">Dashboard</p>
      <p className="sidebar--button hover">Moviments</p>
      <p className="sidebar--button hover">Splits</p>
    </div>
  );
}
