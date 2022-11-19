import React from "react";
import Slider from "react-input-slider";

import Card from "../components/Card";
import ButtonOutline from "../components/Button";

import {
  rowsData,
  purchaseHandle,
  incomeHandle,
  splitHandle,
  editHandle,
  editSplitHandle,
} from "../api/moviment.api";

import { sortArray } from "../functions/arrays";
import {
  setElementValueById,
  getElementValueById,
} from "../functions/elements";
import { todayDate } from "../functions/string";
import { PURCHASE } from "../utility/status";

const handleUpdate = (setRows) => {
  rowsData().then((data) => {
    data = sortArray(data);
    setRows(data);
  });
};

const PopContent = ({
  isPopup,
  setIsOpen,
  date,
  setRows,
  setDate,
  slider,
  setSlider,
  lastItem,
  purchaseType,
}) => {
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
                if (item[2] !== PURCHASE.INCOME) {
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
                } else return null;
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
            <select
              key={Math.random()}
              id={"purchase_type"}
              name="purchase_type"
            >
              <option key={Math.random()} value={""}>
                {"View Existing Types"}
              </option>
              {purchaseType.map((item, i) => {
                if (item[2] === PURCHASE.INCOME) {
                  return (
                    <option
                      key={Math.random()}
                      value={item[0]}
                      onClick={() => {
                        setElementValueById("income_type", item[0]);
                      }}
                    >
                      {item[0]}
                    </option>
                  );
                } else return null;
              })}
            </select>
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
              step=".01"
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

export default PopContent;
