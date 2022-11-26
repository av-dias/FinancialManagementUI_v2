import ADDRESS from "../utility/address";

export async function loadData(month) {
  try {
    let user_id = window.sessionStorage.getItem("user_id");

    let response = await fetch(
      `http://${ADDRESS.BACKEND}/api/v1/user/${user_id}/purchase/statistics/month/${month}`,
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

    let resSplit = await fetch(
      `http://${ADDRESS.BACKEND}/api/v1/split/purchases/user/${user_id}/month/${month}`,
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

    let resTransactions = await fetch(
      `http://${ADDRESS.BACKEND}/api/v1/transactions/user/${user_id}`,
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

    const dataSplit = await resSplit.json();
    const dataTransactions = await resTransactions.json();
    const data = await response.json();
    data["total"] = dataSplit;
    data["transactions"] = dataTransactions;
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
