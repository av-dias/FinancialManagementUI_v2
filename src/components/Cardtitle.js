import React from "react";
import "./Cardtitle.css";

import Grid from "@mui/material/Grid";

export default function Card(props) {
  console.log(props.children);
  return (
    <div className={"cardtitle " + props.color}>
      <div className="cardtitle-align">
        <Grid container spacing={1}>
          <Grid item xs={5} sm={4} md={3} lg={4}>
            <span className="bold">{props.text}</span>
          </Grid>
          {props.children &&
            [...props.children].map(function (elem) {
              //console.log(elem.props.className);
              return elem.props.className !== "arrow-icon" ? (
                <Grid key={Math.random()} item xs={2} sm={2} md={2} lg={1}>
                  {elem}
                </Grid>
              ) : (
                <React.Fragment key={Math.random()}>{elem}</React.Fragment>
              );
            })}
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
