import React from "react";
import "./Popup.css";
import { IoIosCloseCircle } from "react-icons/io";

const Popup = (props) => {
  return (
    <>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            <IoIosCloseCircle size={30} />
          </span>
          {props.content}
        </div>
      </div>
    </>
  );
};

export default Popup;
