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
                props.setMonth(props.month - 1);
              }}
            />
            <img src={props.icon} alt="logo" className="carddate--icon" />
          </>
        )}
        {props.month && (
          <span className="bold m-text">{monthNames[props.month]}</span>
        )}
        {props.icon && (
          <>
            <IoIosArrowForward
              onClick={() => {
                props.setMonth(props.month + 1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
