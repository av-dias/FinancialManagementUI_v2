import React from "react";
import "./Cardtitle.css";

import Grid from "@mui/material/Grid";

export default function Card(props) {
  return (
    <div className={"cardtitle " + props.color}>
      <div className="cardtitle-align">
        <Grid container spacing={1}>
          {props.children}
        </Grid>
      </div>
    </div>
  );
}
