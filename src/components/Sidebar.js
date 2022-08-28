import React from "react";
import "./Sidebar.css";
import navLogo from "../images/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function Sidebar(props) {
  const location = useLocation().pathname;
  //console.log(location);
  return (
    <div className="sidebar">
      <img src={navLogo} alt="logo" className="sidebar--logo" />
      <a
        href="/Dashboard"
        className={
          location === "/Dashboard" || location === "/"
            ? "sidebar--button hover active"
            : "sidebar--button hover"
        }
      >
        Dashboard
      </a>
      <a
        href="/Moviments"
        className={
          location === "/Moviments"
            ? "sidebar--button hover active"
            : "sidebar--button hover"
        }
      >
        Moviments
      </a>
      <a
        href="/Splits"
        className={
          location === "/Splits"
            ? "sidebar--button hover active"
            : "sidebar--button hover"
        }
      >
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
