import * as React from "react";
import Button from "@mui/material/Button";
import "./Button.css";

export default function ButtonOutline(props) {
  return (
    <Button
      variant={props.type}
      size="small"
      onClick={props.onClick}
      fullWidth
      style={{ "box-shadow": "0 3px 3px rgba(0,0,0,0.2)" }}
    >
      {props.text}
    </Button>
  );
}
