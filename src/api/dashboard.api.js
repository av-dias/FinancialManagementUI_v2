import ADDRESS from "../utility/address";

export async function loadData(month) {
  try {
    let user_id = window.sessionStorage.getItem("user_id");

    let response = await fetch(`http://${ADDRESS.BACKEND}/api/v1/user/${user_id}/purchase/statistics/month/${month}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("access_token"),
      },
    });

    let resSplit = await fetch(`http://${ADDRESS.BACKEND}/api/v1/split/purchases/user/${user_id}/month/${month}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("access_token"),
      },
    });

    let resTransactions = await fetch(`http://${ADDRESS.BACKEND}/api/v1/transactions/user/${user_id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("access_token"),
      },
    });

    let r = await fetch(`http://${ADDRESS.BACKEND}/api/v1/purchase/user/${user_id}/stats`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("access_token"),
      },
    });
    const rTest = await r.json();

    console.log(rTest);

    const dataSplit = await resSplit.json();
    const dataTransactions = await resTransactions.json();
    const data = await response.json();
    data["total"] = dataSplit;
    data["transactions"] = dataTransactions;

    // Rechecks all savings and spendings and adjusts with the transactions
    for (let i = 1; i <= 12; i++) {
      if (isNaN(data["transactions"].per_month[i])) continue;

      data["purchases_by_month"][i] -= data["transactions"].per_month[i];
      data["savings_by_month"][i] += data["transactions"].per_month[i];
    }

    // Rechecks all total savings and spendings
    if (data["transactions"].total > 0) {
      data["total_savings"] += data["transactions"].total;
      data["total_spendings"] += data["transactions"].total;
    } else {
      data["total_savings"] -= data["transactions"].total;
      data["total_spendings"] -= data["transactions"].total;
    }

    // Updates months's savings and spendings
    data["month_savings"] = data["savings_by_month"][month];
    data["month_spendings"] = data["purchases_by_month"][month];

    //console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
