import React from "react";
import "./Sidebar.css";
import navLogo from "../images/logo.png";
import { AiOutlineLogout } from "react-icons/ai";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <img src={navLogo} alt="logo" className="sidebar--logo" />
      <a href="/Dashboard" className="sidebar--button hover active">
        Dashboard
      </a>
      <a href="/Moviments" className="sidebar--button hover">
        Moviments
      </a>
      <a href="/Splits" className="sidebar--button hover">
        Splits
      </a>
      <div className="end align-list">
        <a href="/Login" className="sidebar--button hover">
          Login
        </a>
        <AiOutlineLogout size={20} color="gray" className="sidebar-icon" />
      </div>
    </div>
  );
}
