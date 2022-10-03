import React, { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import {
  showChartGeneral,
  showStatsHeader,
  showChartSpecs,
  showSelectionButtons,
} from "../combos/dashboard.combos";
import Grid from "@mui/material/Grid";
import STATUS from "../utility/status";

import { loadData } from "../api/dashboard.api";

export default function Dashboard() {
  let [dashboardData, setdashboardData] = React.useState({
    total_spendings: 0,
    total_savings: 0,
    month_spendings: 0,
    month_savings: 0,
    purchases_by_month: {},
    savings_by_month: {},
  });
  let [chartData, setchartData] = React.useState({});
  let [month, setMonth] = React.useState(new Date().getMonth() + 1);
  let [mode, setMode] = React.useState(1);

  useEffect(() => {
    loadData(month).then((data) => {
      console.log(data);
      setdashboardData(data);
      switch (mode) {
        case STATUS.MODE.TOTAL:
          setchartData({
            current: data.total.current,
            average: data.total.average,
          });
          break;
        case STATUS.MODE.MINE:
          setchartData({
            current: data.purchases_by_type,
            average: data.av_purchases_by_type,
          });
          break;
        default:
          break;
      }
    });
  }, [month]);

  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <Grid container spacing={{ xs: 1, md: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            {showStatsHeader(
              {
                month_savings: dashboardData.month_savings,
                month_spendings: dashboardData.month_spendings,
              },
              month,
              setMonth
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12}>
            {showChartGeneral(dashboardData)}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {showSelectionButtons(dashboardData, setchartData, setMode, mode)}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {showChartSpecs(chartData)}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
