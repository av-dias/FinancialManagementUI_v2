import React from "react";
import Grid from "@mui/material/Grid";

import ButtonOutline from "../components/Button";

const SelectionButtons = ({ filters }) => {
  return (
    <>
      {filters.map((filter) => {
        return (
          <Grid key={Math.random()} item xs={1} sm={1} md={1}>
            <ButtonOutline key={Math.random()} type="outlined">
              {filter}
            </ButtonOutline>
          </Grid>
        );
      })}
    </>
  );
};

// filter iShare
const areEqual = (prevProps, nextProps) => {
  return true;
};

export default React.memo(SelectionButtons, areEqual);
