import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div className="card">
      <img src={props.img} alt="logo" className="card--image" />
      <div className="card--stats">
        <img src={props.icon} alt="logo" className="card--icon" />
        <span>{props.star}</span>
        <span className="gray">{props.value} </span>
        <span className="gray">- {props.country}</span>
      </div>
      <div className="align--bottom"></div>
      <div>
        <p>{props.text}</p>
        <p>
          <span className="bold">{props.price}</span>
        </p>
      </div>
    </div>
  );
}
