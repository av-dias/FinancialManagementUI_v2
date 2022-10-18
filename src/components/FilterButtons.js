import React from "react";
import Grid from "@mui/material/Grid";

import ButtonOutline from "../components/Button";

const SelectionButtons = ({ filters }) => {
  return (
    <>
      {filters.map((filter) => {
        if (filter.mode === filter.currentMode) filter.type = "contained";
        else filter.type = "outlined";

        return (
          <Grid key={Math.random()} item xs={1} sm={1} md={1}>
            <ButtonOutline
              type={filter.type}
              onClick={filter.onClick}
              key={Math.random()}
            >
              {filter.text}
            </ButtonOutline>
          </Grid>
        );
      })}
    </>
  );
};

// If any button as a onClick function re-render is required
const areEqual = (prevProps, nextProps) => {
  let hasClick = false;
  prevProps.filters.forEach((filter) => {
    if (Object.keys(filter).includes("onClick")) return (hasClick = true);
  });

  if (hasClick) return false;
  else return true;
};

export default React.memo(SelectionButtons, areEqual);
