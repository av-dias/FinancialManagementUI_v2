import React from "react";
import "./Sidebar.css";
import navLogo from "../images/logo.png";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <img src={navLogo} alt="logo" className="sidebar--logo" />
      <p className="sidebar--button hover active">Dashboard</p>
      <p className="sidebar--button hover">Moviments</p>
      <p className="sidebar--button hover">Splits</p>
      <p className="end sidebar--button hover">Login</p>
    </div>
  );
}
