import * as React from "react";
import Grid from "@mui/material/Grid";

import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CardText from "../components/Cardtext";
import CardDate from "../components/Carddate";

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

function cumulatesMonths(data) {
  let newData = nonZeroMonths(data);
  if (!newData) return [];
  let cumulative = 0;
  for (let i = 0; i < newData.values.length; i++) {
    cumulative += newData.values[i];
    newData.values[i] = cumulative;
  }
  return newData;
}

function deviationMonths(data) {
  let newData = nonZeroMonths(data);
  if (!newData) return [];
  const sum = newData.values.reduce((partialSum, a) => partialSum + a, 0);
  const average = sum / newData.months.length;

  for (let i = 0; i < newData.values.length; i++) {
    newData.values[i] -= average;
  }

  return newData;
}

const ShowChartGeneral = ({ dashboardData }) => {
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
          chartData={{
            label: "Total Balance",
            data: cumulatesMonths(dashboardData.savings_by_month),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            label: "Av. Spendings Deviation",
            data: deviationMonths(dashboardData.purchases_by_month),
          }}
        />
      </Grid>
    </Grid>
  );
};

export const ShowChartSpecs = ({ data }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <BarChart
          options={options}
          chartData={{ label: "Spendings by Type", data: data.current }}
        />
      </Grid>
      <Grid item xs={6}>
        <BarChart
          size="bg"
          options={options}
          chartData={{
            label: "Average of Spendings by Type",
            data: data.average,
          }}
        />
      </Grid>
    </Grid>
  );
};

const ShowStatsHeader = ({ data, month, setMonth }) => {
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

const isChartSpecs = (prevProps, nextProps) => {
  return false;
};

const isChartGeneral = (prevProps, nextProps) => {
  if (prevProps.dashboardData === nextProps.dashboardData) return true;
  else {
    return false;
  }
};

const isStatsHeader = (prevProps, nextProps) => {
  if (
    prevProps.month === nextProps.month &&
    prevProps.data.month_savings === nextProps.data.month_savings &&
    prevProps.data.month_spendings === nextProps.data.month_spendings
  )
    return true;
  else {
    return false;
  }
};

export const ChartGeneral = React.memo(ShowChartGeneral, isChartGeneral);
export const ChartSpecs = React.memo(ShowChartSpecs, isChartSpecs);
export const StatsHeader = React.memo(ShowStatsHeader, isStatsHeader);

/* export const showSelectionButtons = (
  dashboardData,
  setchartData,
  setMode,
  mode
) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline
          type={mode === STATUS.MODE.TOTAL ? "contained" : "outlined"}
          onClick={() => {
            setMode(STATUS.MODE.TOTAL);
            setchartData({
              current: dashboardData.total.current,
              average: dashboardData.total.average,
            });
          }}
        >
          Total
        </ButtonOutline>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <ButtonOutline
          type={mode === STATUS.MODE.MINE ? "contained" : "outlined"}
          onClick={() => {
            setMode(STATUS.MODE.MINE);
            setchartData({
              current: dashboardData.purchases_by_type,
              average: dashboardData.av_purchases_by_type,
            });
          }}
        >
          Mine
        </ButtonOutline>
      </Grid>
    </Grid>
  );
}; */
