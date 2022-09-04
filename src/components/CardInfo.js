import React from "react";
import "./CardInfo.css";

export default function Card(props) {
  return (
    <div className="cardinfo">
      <div>
        {props.text && <span className="center">{props.text}</span>}
        {props.description && (
          <div className="center bold">
            <br></br>
            <span>{props.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}
