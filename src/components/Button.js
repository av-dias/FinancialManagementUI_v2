import * as React from "react";
import Button from "@mui/material/Button";
import "./Button.css";

export default function ButtonOutline(props) {
  return (
    <Button
      sx={{
        boxShadow: props.shadow || 2,
        fontSize: props.textSize || "small",
      }}
      variant={props.type || "text"}
      size="small"
      onClick={props.onClick}
      fullWidth
      color={props.color || "primary"}
    >
      {props.children}
    </Button>
  );
}
