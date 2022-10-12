import React from "react";
import Grid from "@mui/material/Grid";

import Table from "../components/Table";
import Card from "../components/Card";
import ButtonOutline from "../components/Button";
import Slider from "react-input-slider";
import Button from "../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../components/Table.css";
import ADDRESS from "../utility/address";
import STATUS from "../utility/status";

import { rowsData, sortArray } from "../api/moviment.api";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: STATUS.FILTER_ITEMS.LARGE,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: STATUS.FILTER_ITEMS.DESKTOP,
    partialVisibilityGutter: 40, // this is optional if you are not using partialVisible props
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: STATUS.FILTER_ITEMS.TABLET,
    partialVisibilityGutter: 30, // this is optional if you are not using partialVisible props
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: STATUS.FILTER_ITEMS.MOBILE,
    partialVisibilityGutter: 30, // this is optional if you are not using partialVisible props
  },
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <>
      <div
        className={
          currentSlide === 0
            ? "carousel-button-left item-hidden"
            : "carousel-button-left"
        }
      >
        <IoIosArrowBack
          className="cursor-pointer"
          onClick={() => {
            if (currentSlide - rest.carouselState.slidesToShow - 1 < 0)
              goToSlide(0);
            else goToSlide(currentSlide - rest.carouselState.slidesToShow - 1);
          }}
        />
      </div>
      <div
        className={
          currentSlide ===
          rest.carouselState.totalItems - rest.carouselState.slidesToShow - 1
            ? "carousel-button-right item-hidden"
            : "carousel-button-right"
        }
      >
        <IoIosArrowForward
          className="cursor-pointer"
          onClick={() => {
            if (
              currentSlide + rest.carouselState.slidesToShow - 1 >
              rest.carouselState.totalItems -
                rest.carouselState.slidesToShow -
                1
            )
              goToSlide(
                rest.carouselState.totalItems -
                  rest.carouselState.slidesToShow -
                  1
              );
            else goToSlide(currentSlide + rest.carouselState.slidesToShow - 1);
          }}
        />
      </div>
    </>
  );
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
                responsive={responsive}
                customButtonGroup={<ButtonGroup />}
                arrows={false}
              >
                {filter !== "overall" && (
                  <Button
                    key={Math.random()}
                    textSize={10}
                    shadow={1}
                    onClick={() => {
                      setFilter("overall");
                    }}
                    color={filter === "overall" ? "secondary" : null}
                  >
                    overall
                  </Button>
                )}
                {purchaseType.map((item, i) => {
                  if (item[0] !== filter)
                    return (
                      <Button
                        key={Math.random()}
                        textSize={10}
                        shadow={1}
                        onClick={() => {
                          setFilter(item[0]);
                        }}
                        color={filter === item[0] ? "secondary" : null}
                      >
                        {item[0]}
                      </Button>
                    );
                  else return null;
                })}
              </Carousel>
            </Grid>
          </>
        </Card>
      </Grid>

      <Grid item xs={7} sm={7} md={7}>
        <Table
          size="bg"
          rows={data}
          togglePopup={togglePopup}
          setSlider={setSlider}
          setlastItem={setlastItem}
          filter={filter}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={5}>
        <Table size="sm" />
      </Grid>
    </Grid>
  );
};

const editHandle = async (e, editDate, lastItem, setIsOpen) => {
  e.preventDefault();

  let _name = document.getElementById("edit_name").value;
  let _type = document.getElementById("edit_type").value;
  let _value = document.getElementById("edit_value").value;
  let _date = new Date(editDate);
  let _dop = new Date(_date.setTime(_date.getTime() + 1 * 60 * 60 * 1000));

  //let user_id = window.sessionStorage.getItem("user_id");

  // EDIT INCOME
  if (lastItem.status === STATUS.PURCHASE.INCOME) {
    let Edit = { value: _value, type: _name, subType: _type, doi: _dop };
    await fetch(`http://${ADDRESS.BACKEND}/api/v1/income/${lastItem.id}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + window.sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(Edit),
    });
  } else {
    // EDIT PURCHASE
    try {
      let Edit = { value: _value, type: _type, name: _name, dop: _dop };

      await fetch(`http://${ADDRESS.BACKEND}/api/v1/purchase/${lastItem.id}`, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("access_token"),
        },
        body: JSON.stringify(Edit),
      });
    } catch (err) {
      console.log(err);
    }
  }
  document.getElementById("edit_name").value = "";
  document.getElementById("edit_type").value = "";
  document.getElementById("edit_value").value = "";
  setIsOpen(false);
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

const todayDate = (date) => {
  const today = new Date(date) || new Date();
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
            <Card color="card-yellow" key={"title_purchase"}>
              {"Purchase"}
            </Card>
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
      return (
        <div className="horizontal-header box">
          <form
            onSubmit={async (e) => {
              date = updateDate("edate");
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
                date = updateDate("edate");
              }}
            ></input>
            <button type="submit" name="save" value="save">
              Submit Edit
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

export const showSelectionButtons = () => {
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
