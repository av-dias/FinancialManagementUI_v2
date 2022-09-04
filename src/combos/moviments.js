import Grid from "@mui/material/Grid";

import Table from "../components/Table";
import CardTitle from "../components/Cardtitle";
import ButtonOutline from "../components/Button";

import "../components/Table.css";

export const showMainTables = (data) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={7} sm={7} md={7}>
        <CardTitle key={"msaving"} text="Moviments" />
      </Grid>
      <Grid item xs={5} sm={5} md={5}>
        <CardTitle key={"msaving"} text="Home" />
      </Grid>
      <Grid item xs={7} sm={7} md={7}>
        <Table size="bg" rows={data} />
      </Grid>
      {
        <Grid item xs={5} sm={5} md={5}>
          <Table size="sm" />
        </Grid>
      }
    </Grid>
  );
};

export const showPopup = (isPopup) => {
  console.log(isPopup);
  switch (isPopup) {
    case "Purchase":
      return (
        <div className="horizontal-header box">
          <form>
            <CardTitle
              color="cardtitle-yellow"
              key={"title_purchase"}
              text="Purchase"
            />
            <label htmlFor="pname">Product Name</label>
            <input type="text" id="pname" name="pname"></input>
            <label htmlFor="tname">Product Type</label>
            <input type="text" id="tname" name="tname"></input>
            <label htmlFor="pprice">Product Price</label>
            <input type="number" id="pprice" name="pprice"></input>
            <label htmlFor="pprice">Purchase Date</label>
            <input class="center" type="date" id="pdate" name="pdate"></input>
            <button type="submit" name="save" value="Saveeeee">
              Add Purchase
            </button>
          </form>
        </div>
      );
    case "Income":
      return (
        <div className="horizontal-header box">
          <form>
            <CardTitle
              color="cardtitle-yellow"
              key={"title_income"}
              text="Income"
            />
            <label htmlFor="pname">Income Name</label>
            <input type="text" id="iname" name="iname"></input>
            <label htmlFor="tname">Income Type</label>
            <input type="text" id="iname" name="iname"></input>
            <label htmlFor="pprice">Income Value</label>
            <input type="number" id="ivalue" name="ivalue"></input>
            <label htmlFor="pprice">Income Date</label>
            <input type="date" id="idate" name="idate"></input>
            <button type="submit" name="save" value="save">
              Add Income
            </button>
          </form>
        </div>
      );
  }
};

export const showSelectionButtons = () => {
  return (
    <>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined" text="Total" />
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined" text="iShare" />
      </Grid>
    </>
  );
};
