import React from "react";
import "./Sidebar.css";
import navLogo from "../images/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function Sidebar(props) {
  const location = useLocation().pathname;
    return (
    <div className="sidebar">
      <img src={navLogo} alt="logo" className="sidebar--logo" />
      <a
        href="/Dashboard"
        className={
          location === "/Dashboard" || location === "/"
            ? "sidebar--button active"
            : "sidebar--button"
        }
      >
        Dashboard
      </a>
      <a
        href="/Moviments"
        className={
          location === "/Moviments"
            ? "sidebar--button active"
            : "sidebar--button"
        }
      >
        Moviments
      </a>
      <a
        href="/Splits"
        className={
          location === "/Splits" ? "sidebar--button active" : "sidebar--button"
        }
      >
        Splits
      </a>
      <div className="end sidebar-login">
        <span className="sidebar--button grey">
          {window.sessionStorage.getItem("user_id") === "1"
            ? "Alison Dias"
            : "Ana Catarina"}
        </span>
        <a href="/">
          <AiOutlineLogout size={20} color="gray" className="sidebar-icon" />
        </a>
      </div>
    </div>
  );
}
