import * as React from "react";
import Button from "@mui/material/Button";
import "./Button.css";

export default function ButtonOutline(props) {
  return (
    <Button
      sx={{
        boxShadow: 2,
      }}
      variant={props.type}
      size="small"
      onClick={props.onClick}
      fullWidth
    >
      {props.text}
    </Button>
  );
}
