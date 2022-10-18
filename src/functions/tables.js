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

export function defineNaming(row) {
  if (row.status === STATUS.PURCHASE.NO_SPLIT) {
    return "ns";
  } else if (row.status === STATUS.PURCHASE.INCOME) {
    return "in";
  } else if (row.status === STATUS.PURCHASE.WITH_SPLIT) {
    return "ws";
  } else if (row.status === STATUS.PURCHASE.FROM_SPLIT) {
    return "fs";
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
