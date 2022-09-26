import Grid from "@mui/material/Grid";

import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CardText from "../components/Cardtext";
import CardDate from "../components/Carddate";
import ButtonOutline from "../components/Button";

import date from "../images/date.png";

const options = { maintainAspectRatio: false, responsive: false };

function nonZeroMonths(data) {
  let startIndex = 0,
    endIndex = 0,
    foundFirst = false,
    foundLast = 0;
  for (let i = 0; i < 12; i++) {
    if (!data || data[i] === "undefined") {
      return [];
    }

    if (data[i] === 0 && !foundFirst) {
      startIndex++;
    } else if (data[i] !== 0 && !foundFirst) {
      foundFirst = true;
    } else if (foundLast !== 2 && foundFirst) {
      if (data[i] === 0) {
        foundLast++;
        if (foundLast === 2) {
          endIndex = i - 1;
          break;
        }
      }
    } else {
      endIndex = i - foundLast;
      break;
    }
    endIndex = i;
  }

  return {
    months: Object.keys(data).slice(startIndex, endIndex),
    values: Object.values(data).slice(startIndex, endIndex),
  };
}

export const showChartGeneral = (dashboardData) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            label: "Monthly Balance",
            data: nonZeroMonths(dashboardData.savings_by_month),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            label: "Monthly Spendings",
            data: nonZeroMonths(dashboardData.purchases_by_month),
          }}
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
        <CardDate key={"month"} icon={date} month={month} setMonth={setMonth} />
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
