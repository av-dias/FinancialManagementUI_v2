import React from "react";
import "./Popup.css";
import { IoIosCloseCircle } from "react-icons/io";
import Grid from "@mui/material/Grid";

const Popup = (props) => {
  return (
    <>
      <div className="popup-box">
        <div className="box">
          <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} columns={24}>
            <Grid item xs sm md></Grid>
            <Grid item xs={6} sm={6} md={6}>
              {props.children}
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <span
                className="close-icon"
                onClick={() => {
                  props.handleClose(false);
                }}
              >
                <IoIosCloseCircle size={30} />
              </span>
            </Grid>
            <Grid item xs sm md></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Popup;
