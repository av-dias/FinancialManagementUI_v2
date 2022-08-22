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
    <div className="cardtext">
      <div className="align-center">
        {props.icon && (
          <img src={props.icon} alt="logo" className="cardtext--icon" />
        )}
        {props.date && (
          <span className="bold m-text">{monthNames[props.date]}</span>
        )}
        {props.text && (
          <span>
            <span className="s-text"> {props.text}</span>
            <br />
            <span className="bold m-text">{props.value + "€"}</span>
          </span>
        )}
      </div>
    </div>
  );
}
