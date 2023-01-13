import React from "react";
import "./Carddate.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(date) {
  return monthNames[getCurrentMonth(date)[1] - 1] + "" + getCurrentMonth(date)[0];
}

// [year, month]
function getCurrentMonth(currentDate) {
  return [parseInt(currentDate.substring(0, 4)), parseInt(currentDate.substring(4))];
}

function increaseMonth(currentDate) {
  let [year, month] = getCurrentMonth(currentDate.toString());

  if (++month === 13) {
    month = 1;
    year = ++year;
  }
  if (month < 10) month = "0" + month;

  return year + "" + month;
}

function decreaseMonth(currentDate) {
  let [year, month] = getCurrentMonth(currentDate.toString());

  if (--month === 0) {
    month = 12;
    year = --year;
  }
  if (month < 10) month = "0" + month;

  return year + "" + month;
}

export default function Card(props) {
  return (
    <div className="carddate">
      <div className="carddate-align">
        {props.icon && (
          <>
            <IoIosArrowBack
              className="cursor-pointer"
              onClick={() => {
                props.setCurrentDate(decreaseMonth(props.currentDate));
              }}
            />
            <img src={props.icon} alt="logo" className="carddate--icon" />
          </>
        )}

        {props.currentDate && <span className="bold m-text">{formatDate(props.currentDate)}</span>}
        {props.icon && (
          <>
            <IoIosArrowForward
              className="cursor-pointer"
              onClick={() => {
                props.setCurrentDate(increaseMonth(props.currentDate));
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
