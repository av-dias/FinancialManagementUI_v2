import React from "react";
import "./Card.css";

import Grid from "@mui/material/Grid";

export default function Card(props) {
  return (
    <div className={"card " + props.color}>
      <div className="card-align">
        <Grid container spacing={1}>
          {props.children}
        </Grid>
      </div>
    </div>
  );
}
