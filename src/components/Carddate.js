import React from "react";
import "./Carddate.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    <div className="carddate">
      <div className="carddate-align">
        {props.icon && (
          <>
            <IoIosArrowBack
              onClick={() => {
                alert("Previous Month");
              }}
            />
            <img src={props.icon} alt="logo" className="carddate--icon" />
          </>
        )}
        {props.date && (
          <span className="bold m-text">{monthNames[props.date]}</span>
        )}
        {props.icon && (
          <>
            <IoIosArrowForward
              onClick={() => {
                alert("Next Month");
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
