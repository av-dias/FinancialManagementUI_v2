import React from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Slider from "react-input-slider";
import ButtonGroup from "@mui/material/ButtonGroup";
import "react-multi-carousel/lib/styles.css";
import {
  IoIosCreate,
  IoIosGitBranch,
  IoIosGitPullRequest,
} from "react-icons/io";

import Card from "../components/Card";
import Table from "../components/Table";
import ButtonOutline from "../components/Button";
import Carousel from "../components/Carousel";
import Button from "../components/Button";

import "../components/Table.css";
import STATUS from "../utility/status";

import {
  rowsData,
  purchaseHandle,
  incomeHandle,
  splitHandle,
  editHandle,
  editSplitHandle,
} from "../api/moviment.api";
import { columns, defineNaming, getColValue } from "../functions/tables";
import { sortArray } from "../functions/arrays";
import {
  setElementValueById,
  getElementValueById,
} from "../functions/elements";
import { todayDate } from "../functions/string";

const handleUpdate = (setRows) => {
  rowsData().then((data) => {
    data = sortArray(data);
    setRows(data);
  });
};

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

export const showPopup = (
  isPopup,
  setIsOpen,
  date,
  setRows,
  setDate,
  slider,
  setSlider,
  lastItem,
  purchaseType,
  ...rest
) => {
  switch (isPopup) {
    case "Purchase":
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              await purchaseHandle(e, date, setDate);
              handleUpdate(setRows);
            }}
          >
            <Card color="card-yellow" key={"title_purchase"}>
              {"Purchase"}
            </Card>
            <select
              key={Math.random()}
              id={"purchase_type"}
              name="purchase_type"
            >
              <option key={Math.random()} value={""}>
                {"View Existing Types"}
              </option>
              {purchaseType.map((item, i) => {
                return (
                  <option
                    key={Math.random()}
                    value={item[0]}
                    onClick={() => {
                      setElementValueById("product_service_subtype", item[0]);
                    }}
                  >
                    {item[0]}
                  </option>
                );
              })}
            </select>
            <label htmlFor="tname">Product Type</label>
            <input
              type="text"
              id="product_service_subtype"
              name="tname"
              placeholder="Home"
            ></input>
            <label htmlFor="pname">Product Name</label>
            <input
              type="text"
              id="product_service_name"
              name="pname"
              placeholder="Ikea"
            ></input>
            <label htmlFor="pprice">Product Price</label>
            <input
              type="number"
              id="product_service_price"
              name="pprice"
              placeholder="0"
              step=".01"
            ></input>
            <label htmlFor="pprice">Purchase Date</label>
            <input
              className="center"
              type="date"
              id="pdate"
              name="pdate"
              defaultValue={todayDate()}
              onChange={() => {
                date = getElementValueById("pdate");
              }}
            ></input>
            <button type="submit" name="purchase" value="purchase">
              Add Purchase
            </button>
          </form>
        </div>
      );
    case "Income":
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              await incomeHandle(e, date);
              handleUpdate(setRows);
            }}
          >
            <Card color="card-yellow" key={"title_income"}>
              {"Income"}
            </Card>
            <label htmlFor="pname">Income Type</label>
            <input
              type="text"
              id="income_type"
              name="iname"
              placeholder="Salary"
            ></input>
            <label htmlFor="tname">Income Origin</label>
            <input
              type="text"
              id="income_subType"
              name="iname"
              placeholder="Primark"
            ></input>
            <label htmlFor="pprice">Income Value</label>
            <input
              type="number"
              id="income_value"
              name="ivalue"
              placeholder="0"
            ></input>
            <label htmlFor="pprice">Income Date</label>
            <input
              type="date"
              id="idate"
              name="idate"
              defaultValue={todayDate()}
              onChange={() => {
                date = getElementValueById("idate");
              }}
            ></input>
            <button type="submit" name="save" value="save">
              Add Income
            </button>
          </form>
        </div>
      );
    case "Edit":
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              date = getElementValueById("edate");
              await editHandle(e, date, lastItem, setIsOpen);
              handleUpdate(setRows);
            }}
          >
            <Card color="card-yellow" key={"title_income"}>
              {"Edit"}
            </Card>
            <label htmlFor="pname">Type</label>
            <input
              type="text"
              id="edit_type"
              name="ename"
              defaultValue={lastItem.type}
            ></input>
            <label htmlFor="tname">Name</label>
            <input
              type="text"
              id="edit_name"
              name="ename"
              defaultValue={lastItem.name}
            ></input>
            <label htmlFor="pprice">Value</label>
            <input
              type="number"
              id="edit_value"
              name="evalue"
              defaultValue={lastItem.value}
            ></input>
            <label htmlFor="pprice">Date</label>
            <input
              type="date"
              id="edate"
              name="edate"
              defaultValue={lastItem.dop || lastItem.doi}
              onChange={() => {
                date = getElementValueById("edate");
              }}
            ></input>
            <button type="submit" name="save" value="save">
              Submit Edit
            </button>
          </form>
        </div>
      );
    case "EditSplit":
      //console.log(lastItem);
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              await editSplitHandle(e, lastItem, slider, setIsOpen);
              handleUpdate(setRows);
            }}
          >
            <Card color="card-yellow" key={"title_split"}>
              {"Edit Split"}
            </Card>
            {window.sessionStorage.getItem("user_id") === "1" ? (
              <select id={"email" + lastItem.id} name="split_userEmail">
                <option value="anacatarinarebelo98@gmail.com">
                  Ana Catarina
                </option>
              </select>
            ) : (
              <select id={"email" + lastItem.id} name="split_userEmail">
                <option value="al.vrdias@gmail.com">Álison Dias</option>
              </select>
            )}
            <ButtonOutline
              type="outlined"
              onClick={() => {
                setSlider(50);
              }}
            >
              Split 50-50
            </ButtonOutline>
            <div className="">
              <p>{slider}%</p>
              <Slider
                axis="x"
                x={slider}
                onChange={(newValue) => {
                  setSlider(newValue.x);
                }}
              />
              <h3>
                iShare:{" "}
                {Math.abs(lastItem.value * (slider / 100 - 1)).toFixed(2)}€
              </h3>
              <h3>
                yShare: {Math.abs((lastItem.value * slider) / 100).toFixed(2)}€
              </h3>
            </div>
            <button type="submit" name="save" value="save">
              Add Split
            </button>
          </form>
        </div>
      );
    case "Split":
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              await splitHandle(e, lastItem, slider, setIsOpen);
              handleUpdate(setRows);
            }}
          >
            <Card color="card-yellow" key={"title_split"}>
              {"Split"}
            </Card>
            {window.sessionStorage.getItem("user_id") === "1" ? (
              <select id={"email" + lastItem.id} name="split_userEmail">
                <option value="anacatarinarebelo98@gmail.com">
                  Ana Catarina
                </option>
              </select>
            ) : (
              <select id={"email" + lastItem.id} name="split_userEmail">
                <option value="al.vrdias@gmail.com">Álison Dias</option>
              </select>
            )}
            <ButtonOutline
              type="outlined"
              onClick={() => {
                setSlider(50);
              }}
            >
              Split 50-50
            </ButtonOutline>
            <div className="">
              <p>{slider}%</p>
              <Slider
                axis="x"
                x={slider}
                onChange={(newValue) => {
                  setSlider(newValue.x);
                }}
              />
              <h3>
                iShare:{" "}
                {Math.abs(lastItem.value * (slider / 100 - 1)).toFixed(2)}€
              </h3>
              <h3>
                yShare: {Math.abs((lastItem.value * slider) / 100).toFixed(2)}€
              </h3>
            </div>
            <button type="submit" name="save" value="save">
              Add Split
            </button>
          </form>
        </div>
      );
    default:
      return <></>;
  }
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
