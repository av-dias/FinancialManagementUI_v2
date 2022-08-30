import Grid from "@mui/material/Grid";

import navLogo from "../images/logo.png";
import { loginHandle, incorrectLoginHandle } from "../api/login";
import { useNavigate } from "react-router-dom";

export default function Splits() {
  const navigate = useNavigate();
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
                incorrectLoginHandle();
              }
            }}
          >
            <div className="center">
              <img src={navLogo} alt="logo" className="login--logo" />
            </div>
            <label className="padding" htmlFor="pname">
              Email
            </label>
            <input
              className="padding"
              type="text"
              id="email"
              name="email"
            ></input>
            <label className="padding" htmlFor="tname">
              Password
            </label>
            <input
              className="padding"
              type="password"
              id="password"
              name="password"
            ></input>
            <div className="center">
              <button
                className="padding"
                type="submit"
                name="save"
                value="Saveeeee"
              >
                Login
              </button>
            </div>
          </form>
        </Grid>
        <Grid item xs={5} sm={5} md={5}></Grid>
      </Grid>
    </div>
  );
}
