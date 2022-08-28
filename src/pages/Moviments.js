import React from "react";

import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Popup from "../components/Popup";

import { showSelectionButtons } from "../combos/dashboard";
import { showMainTables, showPopup } from "../combos/moviments";
import STATUS from "../utility/status";

export default function Moviment() {
  const [isPopup, setIsPopup] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [lastItem, setlastItem] = React.useState();
  const [lastItemPos, setLastItemPos] = React.useState({ x: 0, y: 0 });

  const togglePopup = (type, item, mouseEvent) => {
    setIsOpen(!isOpen);
    setIsPopup(type);
    if (item) {
      setlastItem(item);
      setLastItemPos({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    }
  };

  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <section className="horizontal-header">
          {showSelectionButtons()}
          <Button
            text="+Purchase"
            onClick={() => {
              togglePopup("Purchase");
            }}
          />
          <Button
            text="+Income"
            onClick={() => {
              togglePopup("Income");
            }}
          />
        </section>
        <section className="top-margin">{showMainTables()}</section>
      </div>
      {isOpen && (
        <>
          <Popup content={showPopup(isPopup)} handleClose={togglePopup} />
        </>
      )}
    </div>
  );
}
