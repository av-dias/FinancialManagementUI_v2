import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import Sidebar from "../components/Sidebar";
import Popup from "../components/Popup";
import Button from "../components/Button";

import {
  showMainTables,
  showPopup,
  showSelectionButtons,
} from "../combos/moviments";

import { rowsData, sortArray, truncateMax } from "../api/moviment.api";

import STATUS from "../utility/status";

export default function Moviment() {
  const [isPopup, setIsPopup] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [lastItem, setlastItem] = React.useState();
  const [lastItemPos, setLastItemPos] = React.useState({ x: 0, y: 0 });
  const [rows, setRows] = React.useState([]);

  const togglePopup = (type, item, mouseEvent) => {
    setIsOpen(!isOpen);
    setIsPopup(type);
    if (item) {
      setlastItem(item);
      setLastItemPos({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    }
  };

  useEffect(() => {
    rowsData().then((data) => {
      data = sortArray(data);
      setRows(data);
    });
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
            {showMainTables(rows)}
          </Grid>
        </Grid>
      </div>
      {isOpen && (
        <>
          <Popup content={showPopup(isPopup)} handleClose={togglePopup} />
        </>
      )}
    </div>
  );
}
