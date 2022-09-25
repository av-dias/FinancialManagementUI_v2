import Grid from "@mui/material/Grid";

import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CardText from "../components/Cardtext";
import CardDate from "../components/Carddate";
import ButtonOutline from "../components/Button";

import date from "../images/date.png";

const options = { maintainAspectRatio: false, responsive: false };

export const showChartGeneral = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{ label: "Monthly Balance", data: [10, 20, 30] }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{ label: "Monthly Spendings", data: [10, 50, 30] }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{ label: "Total Balance", data: [10, 10, 5] }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{ label: "Spendings Variation", data: [10, 10, 5] }}
        />
      </Grid>
    </Grid>
  );
};

export const showChartSpecs = (data) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <BarChart
          options={options}
          chartData={{ label: "Spendings by Type", data: data }}
        />
      </Grid>
      <Grid item xs={6}>
        <LineChart
          size="bg"
          options={options}
          chartData={{
            label: "Variation of Spendings by Type",
            data: [10, 10, 5],
          }}
        />
      </Grid>
    </Grid>
  );
};

export const showStatsHeader = (data, month, setMonth) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3} sm={3} md={3}>
        <CardText
          key={"msaving"}
          text="Month Balance"
          value={data.month_savings.toFixed(2)}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <CardText
          key={"mspend"}
          text="Month Spendings"
          value={data.month_spendings.toFixed(2)}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={3}></Grid>
      <Grid item xs={3} sm={3} md={3}>
        <CardDate key={"month"} icon={date} month={month} setMonth = {setMonth} />
      </Grid>
    </Grid>
  );
};

export const showSelectionButtons = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined" text="Total" />
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline type="outlined" text="iShare" />
      </Grid>
    </Grid>
  );
};
