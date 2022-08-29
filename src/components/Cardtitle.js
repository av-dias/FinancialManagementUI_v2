import React from "react";
import "./Cardtitle.css";

export default function Card(props) {
  return (
    <div className={"cardtitle " + props.color}>
      <div className="cardtitle-align">
        <span className="bold">{props.text}</span>
      </div>
      {props.description && (
        <div className="cardtitle-align">
          <span>{props.description}</span>
        </div>
      )}
    </div>
  );
}
