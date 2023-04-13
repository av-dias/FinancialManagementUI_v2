import React from "react";
import "./Carddate.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { formatDate, increaseMonth, decreaseMonth } from "../functions/date";

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
