import React from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ButtonGroup from "@mui/material/ButtonGroup";
import "react-multi-carousel/lib/styles.css";
import {
  IoIosCreate,
  IoIosGitBranch,
  IoIosGitPullRequest,
} from "react-icons/io";

import Table from "../components/Table";
import Card from "../components/Card";
import ButtonOutline from "../components/Button";
import Carousel from "../components/Carousel";
import Button from "../components/Button";

import "../components/Table.css";
import STATUS from "../utility/status";

import { columns, defineNaming, getColValue } from "../functions/tables";

const cellData = (column, row, setlastItem, togglePopup, setSlider, value) => {
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
              setlastItem(row);
              togglePopup("Edit");
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
              setlastItem(row);
              setSlider(row.split.weight);
              togglePopup("Split");
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
              setlastItem(row);
              togglePopup("Edit");
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
              setlastItem(row);
              togglePopup("Edit");
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
              setlastItem(row);
              setSlider(row.weight);
              togglePopup("EditSplit");
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

export const showMainTables = (
  data,
  togglePopup,
  setSlider,
  setlastItem,
  purchaseType,
  filter,
  setFilter
) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
        <Card key={"msaving"}>
          <>
            <Grid item xs={5} sm={4} md={3} lg={3}>
              <span className="bold">{"Moviments"}</span>
            </Grid>
            <Grid key={Math.random()} item xs={1} sm={1} md={1} lg={1}>
              <Button
                key={"fixed_button"}
                textSize={10}
                shadow={1}
                color={"secondary"}
              >
                {filter}
              </Button>
            </Grid>
            <Grid key={Math.random()} item xs={6} sm={6} md={6} lg={6}>
              <Carousel
                key={Math.random()}
                purchaseType={purchaseType}
                setFilter={setFilter}
                filter={filter}
              />
            </Grid>
          </>
        </Card>
      </Grid>
      <Grid item xs={7} sm={7} md={7}>
        <Table
          size="bg"
          columns={columns}
          rows={data}
          togglePopup={togglePopup}
          setSlider={setSlider}
          setlastItem={setlastItem}
          filter={filter}
        >
          {data.map((row) => {
            if (row.type === filter || filter === "overall") {
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
                        {cellData(
                          column,
                          row,
                          setlastItem,
                          togglePopup,
                          setSlider,
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            } else return null;
          })}
        </Table>
      </Grid>
      <Grid item xs={5} sm={5} md={5}>
        <Card />
      </Grid>
    </Grid>
  );
};

const ShowSelectionButtons = () => {
  return (
    <>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined">Total</ButtonOutline>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined">iShare</ButtonOutline>
      </Grid>
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  return true;
};

export const SelectionButtons = React.memo(ShowSelectionButtons, areEqual);
