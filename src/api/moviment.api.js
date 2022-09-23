import STATUS from "../utility/status";

export function truncateMax(data) {
  if (data.length > STATUS.NAME_MAX_LENGTH)
    return data.slice(0, STATUS.NAME_MAX_LENGTH - 1);
  return data;
}

export function sortArray(data) {
  data.sort(function (a, b) {
    var dateA = new Date(a.doi || a.dop),
      dateB = new Date(b.doi || b.dop);
    return dateB - dateA;
  });

  return data;
}

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
