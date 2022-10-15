import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "../components/Button";
import Grid from "@mui/material/Grid";

import { truncateMax } from "../api/moviment.api";
import STATUS from "../utility/status";

import {
  IoIosCreate,
  IoIosGitBranch,
  IoIosGitPullRequest,
} from "react-icons/io";

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
    label: "",
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

function defineNaming(row) {
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

export default function StickyHeadTable(props) {
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
    createData("---", " ", "0", "0"),
    createData("---", " ", "0", "0"),
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "75vh" }}>
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
          <TableBody key={Math.random()}>
            {rows.map((row) => {
              if (row.type === props.filter || props.filter === "overall") {
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
                            row.status === STATUS.PURCHASE.INCOME
                              ? STATUS.COLORS.INCOME
                              : row.weight === 0
                              ? STATUS.COLORS.SPLITALL
                              : row.weight === 100
                              ? STATUS.COLORS.SPLITNONE
                              : STATUS.COLORS.NORMAL
                          }
                        >
                          {cellData(column, row, props, value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              } else return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const cellData = (column, row, props, value) => {
  // PURCHASE with NO SPLIT [Edit and Split]
  if (column.id === "options" && row.status === STATUS.PURCHASE.NO_SPLIT) {
    return (
      <Grid container>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            type="outlined"
            key={Math.random()}
            textSize={15}
            shadow={1}
            textColor={"rgb(0, 0, 0)"}
            onClick={() => {
              props.setlastItem(row);
              props.togglePopup("Edit");
            }}
          >
            <IoIosCreate />
          </Button>
          <Button
            type="outlined"
            key={Math.random()}
            textSize={15}
            textColor={"rgb(0, 0, 0)"}
            onClick={() => {
              props.setlastItem(row);
              props.setSlider(row.split.weight);
              props.togglePopup("Split");
            }}
          >
            <IoIosGitBranch />
          </Button>
        </ButtonGroup>
      </Grid>
    );

    // INCOME [Edit]
  } else if (column.id === "options" && row.status === STATUS.PURCHASE.INCOME) {
    return (
      <Grid container>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            type="outlined"
            key={Math.random()}
            textSize={15}
            shadow={1}
            textColor={"rgb(0, 0, 0)"}
            onClick={() => {
              props.setlastItem(row);
              props.togglePopup("Edit");
            }}
          >
            <IoIosCreate />
          </Button>
        </ButtonGroup>
      </Grid>
    );
    // PURCHASE DIFFERENT THEN NO SPLIT [Edit and Split % and Icon]
  } else if (
    column.id === "options" &&
    row.status !== STATUS.PURCHASE.NO_SPLIT
  ) {
    return (
      <Grid container>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            type="outlined"
            key={Math.random()}
            textSize={15}
            shadow={1}
            textColor={"rgb(0, 0, 0)"}
            onClick={() => {
              props.setlastItem(row);
              props.togglePopup("Edit");
            }}
          >
            <IoIosCreate />
          </Button>
          <Button
            type="outlined"
            key={Math.random()}
            textSize={10}
            shadow={1}
            textColor={"rgb(0, 0, 0)"}
            onClick={() => {
              props.setlastItem(row);
              props.setSlider(row.weight);
              props.togglePopup("EditSplit");
            }}
          >
            <span>{row.weight}</span>
          </Button>
          {row.status === STATUS.PURCHASE.FROM_SPLIT ? (
            <Button
              type="contained"
              key={Math.random()}
              textSize={15}
              textColor={"rgb(0, 0, 0)"}
              color="error"
            >
              <IoIosGitPullRequest />
            </Button>
          ) : (
            ""
          )}
        </ButtonGroup>{" "}
      </Grid>
    );
  } /* else if (column.format && typeof value === "number") {
    return column.format(value);
  }  */ else {
    return value;
  }
};
