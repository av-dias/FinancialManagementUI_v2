import React from "react";
import "./Carddate.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const monthNames = [
  "None",
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

function increaseMonth(month) {
  if (month === 12) return 12;
  else return month + 1;
}

function decreaseMonth(month) {
  if (month === 1) return 1;
  else return month - 1;
}

export default function Card(props) {
  return (
    <div className="carddate">
      <div className="carddate-align">
        {props.icon && (
          <>
            <IoIosArrowBack
              onClick={() => {
                props.setMonth(decreaseMonth(props.month));
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
                props.setMonth(increaseMonth(props.month));
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
