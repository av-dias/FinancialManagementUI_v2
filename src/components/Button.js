import * as React from "react";
import Button from "@mui/material/Button";
import "./Button.css";

export default function ButtonOutline(props) {
  return (
    <div className="button">
      <Button variant="outlined" size="small" onClick={props.onClick}>
        {props.text}
      </Button>
    </div>
  );
}
