import STATUS from "../utility/status";
import { truncateMax } from "../functions/string";

export const columns = [
  { id: "name", label: "Name", minWidth: 50, align: "center" },
  {
    id: "value",
    label: "Value",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "dop", label: "Date", minWidth: 50, align: "center" },
  {
    id: "options",
    label: "",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export const transactionCol = [
  { id: "user_origin_id", label: "Origin", minWidth: 50, align: "center" },
  { id: "user_destination_id", label: "Destination", minWidth: 50, align: "center" },
  {
    id: "amount",
    label: "Value",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "dot", label: "Date", minWidth: 50, align: "center" },
];

export function defineNaming(row) {
  if (row.status === STATUS.PURCHASE.NO_SPLIT) {
    return "ns";
  } else if (row.status === STATUS.PURCHASE.INCOME) {
    return "in";
  } else if (row.status === STATUS.PURCHASE.WITH_SPLIT) {
    return "ws";
  } else if (row.status === STATUS.PURCHASE.FROM_SPLIT) {
    return "fs";
  } else if (row.status === STATUS.TRANSACTION.SENT) {
    return "trs";
  } else if (row.status === STATUS.TRANSACTION.RECEIVED) {
    return "trr";
  }
  return Math.random();
}

export function getColValue(row, column) {
  if (row.status === STATUS.PURCHASE.INCOME && column.id === "dop") {
    return row["doi"];
  } else {
    let value = row[column.id];
    if (column.id === "name") {
      return truncateMax(value);
    }
    return value;
  }
}

export function getColValueTransaction(row, column) {
  if (column.id === "dot") {
    return row["dot"];
  } else if (column.id === "user_origin_id" || column.id === "user_destination_id") {
    if (row[column.id] === 1) return "Alison";
    else if (row[column.id] === 2) return "Ana";
  } else {
    let value = row[column.id];
    if (column.id === "description") {
      return truncateMax(value);
    }
    return value;
  }
}
