import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { rowsData, sortArray, truncateMax } from "../api/moviment.api";
import STATUS from "../utility/status";

const columns_bg = [
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
    label: "options",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const columns_sm = [
  { id: "name", label: "Name", minWidth: 50, align: "center" },
  { id: "value", label: "Value", minWidth: 50, align: "center" },
  {
    id: "dop",
    label: "Date",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, value, size) {
  return { name, code, value, size };
}

function getColValue(row, column) {
  if (row.status == STATUS.PURCHASE.INCOME && column.id == "dop") {
    return row["doi"];
  } else {
    let value = row[column.id];
    if (column.id == "name") {
      return truncateMax(value);
    }
    return value;
  }
}

function defineNaming(row) {
  if (row.status === STATUS.PURCHASE.NO_SPLIT) {
    return "ns";
  } else if (row.status === STATUS.PURCHASE.INCOME) {
    return "iiii";
  } else if (row.status === STATUS.PURCHASE.WITH_SPLIT) {
    return "ws";
  } else if (row.status === STATUS.PURCHASE.FROM_SPLIT) {
    return "fs";
  }
  return Math.random();
}

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  let columns = props.size === "bg" ? columns_bg : columns_sm;
  if (props.columns) {
    columns = props.columns;
  }

  let rows = props.rows || [
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={"tr" + defineNaming(row) + row.id}
                >
                  {columns.map((column) => {
                    let value = getColValue(row, column);
                    return (
                      <TableCell
                        key={column.id + defineNaming(row) + row.id}
                        align={column.align}
                        size="small"
                        bgcolor={
                          row.status == STATUS.PURCHASE.INCOME
                            ? STATUS.COLORS.INCOME
                            : row.weight == 0
                            ? STATUS.COLORS.SPLITALL
                            : row.weight == 100
                            ? STATUS.COLORS.SPLITNONE
                            : STATUS.COLORS.NORMAL
                        }
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
