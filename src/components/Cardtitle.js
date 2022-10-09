import React from "react";
import "./Cardtitle.css";

import Grid from "@mui/material/Grid";

export default function Card(props) {
  return (
    <div className={"cardtitle " + props.color}>
      <div className="cardtitle-align">
        <Grid container spacing={1}>
          {props.children &&
          props.children.length === 2 &&
          props.children[0].key === "fixed_button" ? (
            <>
              <Grid item xs={5} sm={4} md={3} lg={3}>
                <span className="bold">{props.text}</span>
              </Grid>
              <Grid key={Math.random()} item xs={1} sm={1} md={1} lg={1}>
                {props.children[0]}
              </Grid>
              <Grid key={Math.random()} item xs={6} sm={6} md={6} lg={6}>
                {props.children[1]}
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="bold">{props.text}</span>
              </Grid>
            </>
          )}
        </Grid>
      </div>
      {props.description && (
        <div className="cardtitle-align">
          <span>{props.description}</span>
        </div>
      )}
    </div>
  );
}
