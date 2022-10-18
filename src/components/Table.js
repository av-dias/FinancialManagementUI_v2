import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

const StickyHeadTable = (props) => {
  let columns = props.columns;

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
          <TableBody key={Math.random()}>{props.children}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.rows === nextProps.rows &&
    prevProps.filter === nextProps.filter
  )
    return true;
  else return false;
};

export default React.memo(StickyHeadTable, areEqual);
