import * as React from "react";
import Grid from "@mui/material/Grid";

import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CardText from "../components/Cardtext";
import CardDate from "../components/Carddate";

import date from "../images/date.png";

const options = { maintainAspectRatio: false, responsive: false };

const ShowChartGeneral = ({ dashboardData }) => {
  if (dashboardData === undefined || dashboardData.cumulativeBalance === undefined) return;
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Cumulative Balance",
            data: Object.values(dashboardData.cumulativeBalance),
            lable: Object.keys(dashboardData.cumulativeBalance),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Monthly Spendings",
            data: Object.values(dashboardData.monthlySpendings),
            lable: Object.keys(dashboardData.monthlySpendings),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Total Savings",
            data: Object.values(dashboardData.totalBalance),
            lable: Object.keys(dashboardData.totalBalance),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Supermarket Spending History",
            data: Object.values(dashboardData.purchaseTypeHistory || dashboardData.monthlySpendings),
            lable: Object.keys(dashboardData.purchaseTypeHistory || dashboardData.monthlySpendings),
          }}
        />
      </Grid>
    </Grid>
  );
};

export const ShowChartSpecs = ({ dashboardData, currentDate, mode }) => {
  if (!currentDate || !dashboardData.purchaseByType) return;
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <BarChart options={options} chartData={{ label: "Purchase by Type", data: dashboardData.purchaseByType }} />
      </Grid>
      <Grid item xs={6}>
        <BarChart
          size="bg"
          options={options}
          chartData={{
            label: "Average of Spendings by Type",
            data: dashboardData.purchaseTypeByAvg,
          }}
        />
      </Grid>
    </Grid>
  );
};

const ShowStatsHeader = ({ data, currentDate, setCurrentDate }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3} sm={3} md={3}>
        <CardText key={"msaving"} text="Month Balance" value={parseFloat(data.month_savings || 0).toFixed(2)} />
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <CardText key={"mspend"} text="Month Spendings" value={parseFloat(data.month_spendings).toFixed(2)} />
      </Grid>
      <Grid item xs={3} sm={3} md={3}></Grid>
      <Grid item xs={3} sm={3} md={3}>
        <CardDate key={"month"} icon={date} currentDate={currentDate} setCurrentDate={setCurrentDate} />
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
    prevProps.currentDate === nextProps.currentDate &&
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
          type={mode === STATUS.MODE.Relative ? "contained" : "outlined"}
          onClick={() => {
            setMode(STATUS.MODE.Relative);
            setchartData({
              current: dashboardData.purchases_by_type,
              average: dashboardData.av_purchases_by_type,
            });
          }}
        >
          Relative
        </ButtonOutline>
      </Grid>
    </Grid>
  );
}; */
