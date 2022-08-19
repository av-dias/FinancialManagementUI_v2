import React from "react";
import "./Cardtext.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Card(props) {
  return (
    <div className="card-text">
      <div className="card--stats">
        {props.icon && (
          <img src={props.icon} alt="logo" className="cardtext--icon" />
        )}
        <span>{props.text}</span>
        {props.date && (
          <span className="gray bold">{monthNames[props.date]}</span>
        )}
        {props.value && <span className="gray bold">{props.value + "€"}</span>}
      </div>
    </div>
  );
}
