import Grid from "@mui/material/Grid";

import Table from "../components/Table";
import CardTitle from "../components/Cardtitle";
import ButtonOutline from "../components/Button";
import Slider from "react-input-slider";

import "../components/Table.css";
import ADDRESS from "../utility/address";

import { rowsData, sortArray } from "../api/moviment.api";

export const showMainTables = (data, togglePopup, setSlider, setlastItem) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={7} sm={7} md={7}>
        <CardTitle key={"msaving"} text="Moviments" />
      </Grid>
      <Grid item xs={5} sm={5} md={5}>
        <CardTitle key={"msaving"} text="Home" />
      </Grid>
      <Grid item xs={7} sm={7} md={7}>
        <Table
          size="bg"
          rows={data}
          togglePopup={togglePopup}
          setSlider={setSlider}
          setlastItem={setlastItem}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={5}>
        <Table size="sm" />
      </Grid>
    </Grid>
  );
};

const incomeHandle = async (e, incomeDate) => {
  e.preventDefault();

  let _type = document.getElementById("income_type").value;
  let _subtype = document.getElementById("income_subType").value;
  let _value = document.getElementById("income_value").value;
  let _date = new Date(incomeDate);
  let _doi = new Date(_date.setTime(_date.getTime() + 1 * 60 * 60 * 1000));
  //let _dop = purchaseDate;

  let user_id = window.sessionStorage.getItem("user_id");

  let Income = { value: _value, type: _type, subType: _subtype, doi: _doi };
  try {
    await fetch(`http://${ADDRESS.BACKEND}/api/v1/income/user/${user_id}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + window.sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(Income),
    });
    document.getElementById("income_type").value = "";
    document.getElementById("income_subType").value = "";
    document.getElementById("income_value").value = "";
  } catch (err) {
    console.log(err);
  }
};

const splitHandle = async (event, lastItem, slider, setIsOpen) => {
  event.preventDefault();
  let purchase_id = lastItem.id;

  let user_id = window.sessionStorage.getItem("user_id");
  const w = slider;
  const u = document.getElementById("email" + purchase_id);
  let split = {
    weight: w.toString(),
    userEmail: u.value,
  };

  console.log(user_id, split);
  try {
    await fetch(
      `http://${ADDRESS.BACKEND}/api/v1/split/user/${user_id}/purchase/${purchase_id}`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("access_token"),
        },
        body: JSON.stringify(split),
      }
    );
    setIsOpen(false);
  } catch (e) {
    console.log(e);
  }
};

const handlePurchase = async (e, purchaseDate, setDate) => {
  e.preventDefault();

  let _name = document.getElementById("product_service_name").value;
  let _value = document.getElementById("product_service_price").value;
  let _type = document.getElementById("product_service_subtype").value;
  let date = new Date(purchaseDate);
  let _dop = new Date(date.setTime(date.getTime() + 1 * 60 * 60 * 1000));

  let user_id = window.sessionStorage.getItem("user_id");
  let Purchase = { value: _value, name: _name, type: _type, dop: _dop };

  if (
    _name === undefined ||
    _name === "" ||
    _value === undefined ||
    _value === "" ||
    _type === undefined ||
    _type === "" ||
    _dop === undefined ||
    _dop === "" ||
    user_id === undefined ||
    user_id === ""
  )
    return null;

  try {
    await fetch(`http://${ADDRESS.BACKEND}/api/v1/purchase/user/${user_id}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + window.sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(Purchase),
    });
    document.getElementById("product_service_name").value = "";
    document.getElementById("product_service_price").value = "";
    document.getElementById("product_service_subtype").value = "";
    setDate(date);
  } catch (err) {
    console.log(err);
  }
};

const todayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  return year + "-" + month + "-" + day;
};

const updateDate = (id) => {
  return document.getElementById(id).value;
};

const handleUpdate = (setRows) => {
  rowsData().then((data) => {
    data = sortArray(data);
    setRows(data);
  });
};

export const showPopup = (
  isPopup,
  setIsOpen,
  date,
  setRows,
  setDate,
  slider,
  setSlider,
  lastItem
) => {
  switch (isPopup) {
    case "Purchase":
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              await handlePurchase(e, date, setDate);
              handleUpdate(setRows);
            }}
          >
            <CardTitle
              color="cardtitle-yellow"
              key={"title_purchase"}
              text="Purchase"
            />
            <label htmlFor="pname">Product Name</label>
            <input
              type="text"
              id="product_service_name"
              name="pname"
              placeholder="Ikea"
            ></input>
            <label htmlFor="tname">Product Type</label>
            <input
              type="text"
              id="product_service_subtype"
              name="tname"
              placeholder="Home"
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
                date = updateDate("pdate");
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
            <CardTitle
              color="cardtitle-yellow"
              key={"title_income"}
              text="Income"
            />
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
                date = updateDate("idate");
              }}
            ></input>
            <button type="submit" name="save" value="save">
              Add Income
            </button>
          </form>
        </div>
      );
    case "Edit":
      return <></>;
    case "Split":
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              await splitHandle(e, lastItem, slider, setIsOpen);
              handleUpdate(setRows);
            }}
          >
            <CardTitle
              color="cardtitle-yellow"
              key={"title_split"}
              text="Split"
            />
            {window.sessionStorage.getItem("user_id") === 1 ? (
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
              text="Split 50-50"
              onClick={() => {
                setSlider(50);
              }}
            />
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

export const showSelectionButtons = () => {
  return (
    <>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined" text="Total" />
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined" text="iShare" />
      </Grid>
    </>
  );
};
