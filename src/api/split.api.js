import ADDRESS from "../utility/address";

export async function loadData() {
  try {
    let user_id = window.sessionStorage.getItem("user_id");
    let user_name = window.sessionStorage.getItem("user_name");

    let response = await fetch(
      `http://${ADDRESS.BACKEND}/api/v1/split/users/user/${user_id}/stats`,
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

    // This fetch needs work as it is required a
    // transactions calculation between specific origin and destination
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

    const data = await response.json();
    const dataTransactions = await resTransactions.json();

    let json = {};
    data.Self.forEach((item) => {
      //let id = item.substring(0, item.indexOf("="));
      json.Self = JSON.parse(item.substring(item.indexOf("=") + 1));
      json.Self.id = user_id;
      json.Self.name = user_name;
    });

    data.Given.forEach((item) => {
      let id = item.substring(0, item.indexOf("="));
      json.Given = JSON.parse(item.substring(item.indexOf("=") + 1));
      json.Given.id = id;
      json.Given.name = data.Names[id];
    });

    json.transactions = dataTransactions.total;

    return json;
  } catch (e) {
    console.log(e.message);
  }
}
