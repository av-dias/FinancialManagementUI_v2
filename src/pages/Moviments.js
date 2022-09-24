import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import Sidebar from "../components/Sidebar";
import Popup from "../components/Popup";
import Button from "../components/Button";

import {
  showMainTables,
  showPopup,
  showSelectionButtons,
} from "../combos/moviments.combos";

import {
  usePopUp,
  useOpen,
  useItem,
  /* useItemPos, */
  useDate,
  useRows,
  useSlider,
} from "../hooks/moviments.hook";
import { rowsData, sortArray /* , truncateMax */ } from "../api/moviment.api";
//import STATUS from "../utility/status";

export default function Moviment() {
  const [isPopup, setIsPopup] = usePopUp(); // Popup type
  const [isOpen, setIsOpen] = useOpen(); // Popup is showing or not
  const [lastItem, setlastItem] = useItem(); // Last clicked row data
  const [date, setDate] = useDate(); // Last date
  const [rows, setRows] = useRows(); // Rows with table data
  const [slider, setSlider] = useSlider(); // Slider value

  const togglePopup = (type) => {
    setIsOpen(!isOpen);
    setIsPopup(type);
  };

  useEffect(() => {
    rowsData().then((data) => {
      data = sortArray(data);
      setRows(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <Grid container spacing={{ xs: 1, sm: 1, md: 1 }}>
          {showSelectionButtons()}
          <Grid item xs={8} sm={8} md={8}></Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Button
              type="contained"
              text="Purchase"
              onClick={() => {
                togglePopup("Purchase");
              }}
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Button
              type="contained"
              text="Income"
              onClick={() => {
                togglePopup("Income");
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12}>
            {showMainTables(rows, togglePopup, setSlider, setlastItem)}
          </Grid>
        </Grid>
      </div>
      {isOpen && (
        <>
          <Popup
            content={showPopup(
              isPopup,
              setIsOpen,
              date,
              setRows,
              setDate,
              slider,
              setSlider,
              lastItem
            )}
            handleClose={togglePopup}
          />
        </>
      )}
    </div>
  );
}
