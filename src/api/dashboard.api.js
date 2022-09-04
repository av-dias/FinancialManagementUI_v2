import ADDRESS from "../utility/address";

export async function loadData() {
  try {
    let user_id = window.sessionStorage.getItem("user_id");

    let response = await fetch(
      `http://${ADDRESS.BACKEND}/api/v1/user/${user_id}/purchase/statistics`,
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
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
