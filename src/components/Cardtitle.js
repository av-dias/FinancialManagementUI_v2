import React from "react";
import "./Cardtitle.css";

export default function Card(props) {
  return (
    <div className="cardtitle">
      <div className="align-center">
        <span className="bold">{props.text}</span>
      </div>
    </div>
  );
}
