import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import Sidebar from "../components/Sidebar";
import SelectionButtons from "../components/FilterButtons";

import { ChartGeneral, StatsHeader, ChartSpecs } from "../combos/dashboard.combos";
import STATUS from "../utility/status";
import { checkMissingMonths, decreaseMonth } from "../functions/date";

import { loadData } from "../api/dashboard.api";

const getFilters = (mode, setMode) => {
  return [
    {
      text: "Relative",
      mode: mode,
      currentMode: STATUS.MODE.RELATIVE,
      onClick: () => {
        setMode(STATUS.MODE.RELATIVE);
      },
      title: "Only your pocket.",
    },
    {
      text: "Real",
      mode: mode,
      currentMode: STATUS.MODE.REAL,
      onClick: () => {
        setMode(STATUS.MODE.REAL);
      },
      title: "Considers the couple's split.",
    },
    {
      text: "Couple",
      mode: mode,
      currentMode: STATUS.MODE.COUPLE,
      onClick: () => {
        setMode(STATUS.MODE.COUPLE);
      },
      title: "Prespective as a couple.",
    },
  ];
};

const calcCumulative = (data) => {
  let newData = {};
  let labels = Object.keys(data);
  let array = Object.values(data);

  array.reduce(function (a, b, i) {
    return (newData[labels[i]] = Number(a) + Number(b));
  }, 0);

  newData = checkMissingMonths(newData);

  return newData;
};

const calcTotalBalance = (balance, spendings) => {
  let totalBalance = {};
  spendings = calcCumulative(spendings);
  let balanceDates = Object.keys(balance);
  let spendingDates = Object.keys(spendings);

  while (balanceDates.length) {
    let date = balanceDates.pop();
    totalBalance[date] = Number(balance[date]);
  }

  while (spendingDates.length) {
    let dateList = Object.keys(totalBalance);
    let noPreviousValue = true;
    let date = spendingDates.pop();
    if (!totalBalance[date]) {
      let prevDate = decreaseMonth(date);
      console.log(prevDate);
      while (Number(dateList[0]) < Number(prevDate)) {
        if (dateList.includes(prevDate)) {
          totalBalance[date] = totalBalance[prevDate] - Number(spendings[date]);
          noPreviousValue = false;
          break;
        } else {
          prevDate = decreaseMonth(date);
        }
      }
      if (noPreviousValue) totalBalance[date] = 0 - Number(spendings[date]);
    } else totalBalance[date] = totalBalance[date] - Number(spendings[date]);
  }

  return totalBalance;
};

const calcPurchaseTypeHistory = (purchase, type) => {
  let data = {};
  Object.keys(purchase).forEach((date) => {
    data[date] = purchase[date][type];
  });

  return data;
};

const getDataByMode = (dashboardData, currentDate, mode) => {
  let cumulativeEarnings = calcCumulative(dashboardData.monthlyEarning);
  let data = { cumulativeBalance: cumulativeEarnings };
  switch (mode) {
    case STATUS.MODE.RELATIVE:
      data["monthlySpendings"] = dashboardData.spendingsMonthlyRelative;
      data["monthlyTotalBalance"] = dashboardData.monthlyEarning;
      data["purchaseByType"] = dashboardData.purchaseTypeByMonthRelative[currentDate] || {};
      data["purchaseByTypeAll"] = dashboardData.purchaseTypeByMonthRelative;
      data["purchaseTypeByAvg"] = dashboardData.purchaseTypeByAvgRelative;
      break;
    case STATUS.MODE.REAL:
      data["monthlySpendings"] = dashboardData.spendingsMonthlyReal;
      data["monthlyTotalBalance"] = dashboardData.monthlyEarning;
      data["purchaseByType"] = dashboardData.purchaseTypeByMonthReal[currentDate] || {};
      data["purchaseByTypeAll"] = dashboardData.purchaseTypeByMonthReal;
      data["purchaseTypeByAvg"] = dashboardData.purchaseTypeByAvgReal;

      break;
    case STATUS.MODE.COUPLE:
      data["monthlySpendings"] = dashboardData.spendingsMonthlyCouple;
      data["monthlyTotalBalance"] = dashboardData.monthlyEarning;
      data["purchaseByType"] = dashboardData.purchaseTypeByMonthCouple[currentDate] || {};
      data["purchaseByTypeAll"] = dashboardData.purchaseTypeByMonthCouple;
      data["purchaseTypeByAvg"] = dashboardData.purchaseTypeByAvgCouple;
      break;
    default:
      break;
  }
  data["totalBalance"] = calcTotalBalance(data["cumulativeBalance"], data["monthlySpendings"]);
  data["purchaseTypeHistory"] = calcPurchaseTypeHistory(data["purchaseByTypeAll"], "Supermarket");

  console.log(data);
  return data;
};

export default function Dashboard() {
  let [dashboardData, setdashboardData] = React.useState({
    total_spendings: 0,
    total_savings: 0,
    month_spendings: 0,
    month_savings: 0,
    monthlyTotalBalance: 0,
    spendingsMonthlyMine: 0,
    monthlySpendings: 0,
    purchases_by_month: {},
    savings_by_month: {},
  });
  //let month = new Date().getMonth() + 1;
  //let yerar = new Date().getFullYear();
  let month = 9;
  let year = 2022;
  let [currentDate, setCurrentDate] = React.useState(year + "" + (month < 10 ? "0" + month : month)); // 2022-09
  let [mode, setMode] = React.useState(1);

  useEffect(() => {
    loadData(currentDate).then((data) => {
      setdashboardData(getDataByMode(data, currentDate, mode));
    });
  }, [currentDate, mode]);

  try {
    return (
      <div className="background-page">
        <Sidebar />
        <div className="blur">
          <Grid container spacing={{ xs: 1, md: 1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <StatsHeader
                data={{
                  month_savings: dashboardData.monthlyTotalBalance[currentDate] || 0,
                  month_spendings: dashboardData.monthlySpendings[currentDate] || 0,
                }}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} />
            <Grid item xs={12} sm={12} md={12} />
            <Grid item xs={12} sm={12} md={12} />
            <Grid item xs={12} sm={12} md={12}>
              <ChartGeneral dashboardData={dashboardData} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={1}>
                <SelectionButtons filters={getFilters(mode, setMode)} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ChartSpecs dashboardData={dashboardData} currentDate={currentDate} mode={mode} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}
