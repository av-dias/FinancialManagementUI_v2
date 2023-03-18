import * as React from "react";
import Grid from "@mui/material/Grid";

import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CardText from "../components/Cardtext";
import CardDate from "../components/Carddate";

import date from "../images/date.png";

const options = { maintainAspectRatio: false, responsive: false };

const ShowChartGeneral = ({ dashboardData }) => {
  if (dashboardData === undefined || dashboardData.cumulativeMonthlyEarningMine === undefined) return;
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Monthly Balance",
            data: Object.values(dashboardData.cumulativeMonthlyEarningMine),
            lable: Object.keys(dashboardData.cumulativeMonthlyEarningMine),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Monthly Spendings",
            data: Object.values(dashboardData.spendingsMonthlyMine),
            lable: Object.keys(dashboardData.spendingsMonthlyMine),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Total Balance",
            data: Object.values(dashboardData.cumulativeMonthlyEarningMine),
            lable: Object.keys(dashboardData.cumulativeMonthlyEarningMine),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <LineChart
          options={options}
          chartData={{
            title: "Av. Spendings Deviation",
            data: Object.values(dashboardData.spendingsMonthlyMine),
            lable: Object.keys(dashboardData.spendingsMonthlyMine),
          }}
        />
      </Grid>
    </Grid>
  );
};

export const ShowChartSpecs = ({ data, currentDate }) => {
  if (!currentDate || !data.purchaseTypeByMonthMine) return;
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <BarChart options={options} chartData={{ label: "Purchase by Type", data: data.purchaseTypeByMonthMine[currentDate] }} />
      </Grid>
      <Grid item xs={6}>
        <BarChart
          size="bg"
          options={options}
          chartData={{
            label: "Average of Spendings by Type",
            data: data.purchaseTypeByAvgMine,
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
        <CardText key={"msaving"} text="Month Balance" value={data.month_savings || 0} />
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <CardText key={"mspend"} text="Month Spendings" value={data.month_spendings || 0} />
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
