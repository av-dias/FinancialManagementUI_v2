import Grid from "@mui/material/Grid";

import navLogo from "../images/logo.png";
import { loginHandle } from "../api/login.api";
import { useNavigate } from "react-router-dom";

import { clearElementValueById } from "../functions/elements";

import ADDRESS from "../utility/address";

export default function Splits() {
  const navigate = useNavigate();
  window.sessionStorage.clear();

  return (
    <div className="background-page">
      <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={5} sm={5} md={5}></Grid>
        <Grid item xs={2} sm={2} md={2}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if ((await loginHandle()) === 200) {
                navigate("/Dashboard"); //doing redirect here.
              } else {
                clearElementValueById("email");
                clearElementValueById("password");
              }
            }}
          >
            <div className="center">
              <img src={navLogo} alt="logo" className="login--logo" />
            </div>
            <label className="padding" htmlFor="pname">
              Email
            </label>
            <input className="padding" type="text" id="email" name="email"></input>
            <label className="padding" htmlFor="tname">
              Password
            </label>
            <input className="padding" type="password" id="password" name="password"></input>
            <div className="center">
              <button className="padding" type="submit" name="save" value="Saveeeee">
                Login
              </button>
            </div>
          </form>
        </Grid>
        <Grid item xs={5} sm={5} md={5}></Grid>
        <Grid item xs={15} sm={15} md={15}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="center bold-ip">
            <h1> {ADDRESS.IP} </h1>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
