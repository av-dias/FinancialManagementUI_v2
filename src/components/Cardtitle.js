import React from "react";
import "./Cardtitle.css";

export default function Card(props) {
  return (
    <div className="cardtitle">
      <div className="cardtitle-align">
        <span className="bold">{props.text}</span>
      </div>
    </div>
  );
}
