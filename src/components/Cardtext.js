import React from "react";
import "./Cardtext.css";

export default function Card(props) {
  return (
    <div className="cardtext">
      <div className="cardtext-align">
        {props.text && (
          <span>
            <span className="cardtext-s-text"> {props.text}</span>
            <br />
            <span className="bold m-text">{props.value + "€"}</span>
          </span>
        )}
      </div>
    </div>
  );
}
