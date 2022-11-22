import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/Sidebar";
import Popup from "../components/Popup";
import Button from "../components/Button";
import PopContent from "../components/PopContent";
import SelectionButtons from "../components/FilterButtons";

import { showMainTables } from "../combos/moviments.combos";

import { sortArray } from "../functions/arrays";
import { rowsData } from "../api/moviment.api";

import {
  usePopUp,
  useOpen,
  useItem,
  useDate,
  useRows,
  useSlider,
} from "../hooks/moviments.hook";

export default function Moviment() {
  const [isPopup, setIsPopup] = usePopUp(); // Popup type
  const [isOpen, setIsOpen] = useOpen(); // Popup is showing or not
  const [lastItem, setlastItem] = useItem(); // Last clicked row data
  const [date, setDate] = useDate(); // Last date
  const [rows, setRows] = useRows(); // Rows with table data
  const [slider, setSlider] = useSlider(); // Slider value
  const [purchaseType, setPurchaseType] = React.useState([]); // List of purchase types
  const [filter, setFilter] = React.useState("overall"); // List of purchase types

  const togglePopup = (type) => {
    setIsOpen(!isOpen);
    setIsPopup(type);
  };

  const rowTypesList = (data) => {
    const output = data.reduce((accum, x) => {
      let typeName = x.type;
      let status = x.status;
      if (accum.filter((e) => e[0] === typeName).length === 0) {
        accum.push([typeName, 1, status]);
      } else {
        let index = accum.findIndex((item) => item[0] === typeName);
        accum[index][1]++;
      }
      return accum;
    }, []);
    return output.sort(function (a, b) {
      return b[1] - a[1];
    });
  };

  useEffect(() => {
    rowsData().then((data) => {
      setPurchaseType(rowTypesList(data));
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
          <SelectionButtons filters={[{ text: "Total" }, { text: "iShare" }]} />
          <Grid item xs={7} sm={7} md={7}></Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Button
              type="contained"
              onClick={() => {
                togglePopup("Purchase");
              }}
            >
              Purchase
            </Button>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Button
              type="contained"
              onClick={() => {
                togglePopup("Income");
              }}
            >
              Income
            </Button>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Button
              type="contained"
              onClick={() => {
                togglePopup("Transaction");
              }}
            >
              Transaction
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12}>
            {showMainTables(
              rows,
              togglePopup,
              setSlider,
              setlastItem,
              purchaseType,
              filter,
              setFilter
            )}
          </Grid>
        </Grid>
      </div>
      {isOpen && (
        <Popup handleClose={togglePopup}>
          <PopContent
            isPopup={isPopup}
            setIsOpen={setIsOpen}
            date={date}
            setRows={setRows}
            setDate={setDate}
            slider={slider}
            setSlider={setSlider}
            lastItem={lastItem}
            purchaseType={purchaseType}
          />
        </Popup>
      )}
    </div>
  );
}
