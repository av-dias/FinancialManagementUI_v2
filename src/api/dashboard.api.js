import ADDRESS from "../utility/address";

export async function loadData(currentDate) {
  try {
    let user_id = window.sessionStorage.getItem("user_id");

    let resStats = await fetch(`http://${ADDRESS.BACKEND}/api/v1/purchase/user/${user_id}/stats`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("access_token"),
      },
    });
    const stats = await resStats.json();

    console.log(stats);

    let data = stats;
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
