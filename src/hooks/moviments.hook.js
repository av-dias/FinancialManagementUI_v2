import React from "react";

export function usePopUp() {
  const [isPopup, setIsPopup] = React.useState(0);
  return [isPopup, setIsPopup];
}

export function useOpen() {
  const [isOpen, setIsOpen] = React.useState(false);
  return [isOpen, setIsOpen];
}

export function useItem() {
  const [lastItem, setlastItem] = React.useState();
  return [lastItem, setlastItem];
}

export function useItemPos() {
  const [lastItemPos, setLastItemPos] = React.useState({ x: 0, y: 0 });
  return [lastItemPos, setLastItemPos];
}

export function useDate() {
  const [purchaseDate, setPurchaseDate] = React.useState(new Date());
  return [purchaseDate, setPurchaseDate];
}

export function useRows() {
  const [rows, setRows] = React.useState([]);
  return [rows, setRows];
}
