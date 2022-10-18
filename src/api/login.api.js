import jwt_decode from "jwt-decode";

import ADDRESS from "../utility/address";

export const loginHandle = async () => {
  var authInfo = {
    username: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  var formBody = [];
  for (let info in authInfo) {
    var encodedKey = encodeURIComponent(info);
    var encodedValue = encodeURIComponent(authInfo[info]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch(`http://${ADDRESS.BACKEND}/api/v1/login`, {
    headers: {
      Accept: "application/x-www-form-urlencoded;charset=UTF-8",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
    body: formBody,
  });
  if (response.status === 200) {
    const data = await response.json();
    window.sessionStorage.setItem("access_token", data.access_token);
    window.sessionStorage.setItem("refresh_token", data.refresh_token);
    window.sessionStorage.setItem(
      "user_id",
      jwt_decode(data.access_token).user_id
    );
    window.sessionStorage.setItem(
      "user_name",
      jwt_decode(data.access_token).sub
    );
    //history.push("/Dashboard"); //doing redirect here.
    return 200;
  } else {
    const data = await response.json();
    console.log(data);
    window.alert(JSON.stringify(data));
    return 400;
  }
};
