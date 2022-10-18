import STATUS from "../utility/status";
import ADDRESS from "../utility/address";

export async function rowsData() {
  try {
    let user_id = window.sessionStorage.getItem("user_id");

    let response_purchase = await fetch(
      `http://localhost:8080/api/v1/purchase/user/${user_id}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("access_token"),
        },
      }
    );

    let response_income = await fetch(
      `http://localhost:8080/api/v1/income/user/${user_id}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("access_token"),
        },
      }
    );

    let response_split = await fetch(
      `http://localhost:8080/api/v1/split/user/${user_id}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("access_token"),
        },
      }
    );

    const data_purchase = await response_purchase.json();
    const data_income = await response_income.json();
    const data_split = await response_split.json();

    // Purchase without split
    for (const element of data_purchase) {
      if (element.split == null) {
        element.status = STATUS.PURCHASE.NO_SPLIT;
        element.iShare = element.value;
        element.split = { weight: 0 };
      } else {
        element.status = STATUS.PURCHASE.WITH_SPLIT;
        element.iShare = (
          ((100 - element.split.weight) / 100) *
          element.value
        ).toFixed(2);
        element.weight = element.split.weight;
      }
    }
    for (const element of data_income) {
      element.status = STATUS.PURCHASE.INCOME;
      element.name = element.subType;
    }
    for (const element of data_split) {
      element.status = STATUS.PURCHASE.FROM_SPLIT;
      element.iShare = ((element.split.weight / 100) * element.value).toFixed(
        2
      );
      element.weight = 100 - element.split.weight;
    }

    return [...data_purchase, ...data_income, ...data_split];
  } catch (e) {
    console.log(e.message);
  }
}

export const editHandle = async (e, editDate, lastItem, setIsOpen) => {
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

export const incomeHandle = async (e, incomeDate) => {
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

export const editSplitHandle = async (event, lastItem, slider, setIsOpen) => {
  event.preventDefault();
  let w;
  //let user_id = window.sessionStorage.getItem("user_id");
  //const u = document.getElementById("email" + purchase_id);

  let split_id = lastItem.split.id;
  if (lastItem.status === STATUS.PURCHASE.FROM_SPLIT) w = 100 - slider;
  else w = slider;

  let split = {
    weight: w.toString(),
  };

  try {
    await fetch(`http://${ADDRESS.BACKEND}/api/v1/split/${split_id}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + window.sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(split),
    });
    setIsOpen(false);
  } catch (e) {
    console.log(e);
  }
};

export const splitHandle = async (event, lastItem, slider, setIsOpen) => {
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

export const purchaseHandle = async (e, purchaseDate, setDate) => {
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
