import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";

import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
//import BarChart from "../components/BarChart";
//import LineChart from "../components/LineChart";
import PolarChart from "../components/PolarChart";
import StackedChart from "../components/StackedChart";
import Card from "../components/Card";

import { loadData } from "../api/split.api";

const COLUMNS = [
  { id: "Name", label: "Name", minWidth: 100, align: "center" },
  { id: "Total", label: "Total", minWidth: 100, align: "center" },
  { id: "iShare", label: "iShare", minWidth: 100, align: "center" },
  { id: "yShare", label: "yShare", minWidth: 100, align: "center" },
];

export default function Splits() {
  // [0]: Self, [1]:Given
  const [rows, setRows] = React.useState([
    { Name: "NA", Total: "NA", iShare: "NA", yShare: "NA" },
    { Name: "NA", Total: "NA", iShare: "NA", yShare: "NA" },
  ]);

  const [columns, setColumns] = React.useState([
    { id: "res_label", label: "NA", minWidth: 100, align: "center" },
    { id: "res_total", label: "NA", minWidth: 100, align: "center" },
    { id: "res_iShare", label: "NA", minWidth: 100, align: "center" },
    { id: "res_yShare", label: "NA", minWidth: 100, align: "center" },
  ]);

  const [nameDept, setNameDept] = React.useState("NA");
  const [valueDept, setValueDept] = React.useState("NA");

  function checkDept(json) {
    let result = {
      name: "NA",
      value: "NA",
    };
    if (json && json.Given && json.Self) {
      if (json.Self.yShare > json.Given.iShare) {
        result = {
          name: json.Given.name,
          value: parseFloat(json.Self.yShare - json.Given.iShare).toFixed(2),
        };
      } else
        result = {
          name: json.Self.name,
          value: parseFloat(json.Given.iShare - json.Self.yShare).toFixed(2),
        };
    }
    return result;
  }

  function setTableData(data) {
    setRows([
      {
        Name: data.Self.name,
        Total: parseFloat(data.Self.total).toFixed(2),
        iShare: parseFloat(data.Self.iShare).toFixed(2),
        yShare: parseFloat(data.Self.yShare).toFixed(2),
      },
      {
        Name: data.Given.name,
        Total: parseFloat(data.Given.total).toFixed(2),
        iShare: parseFloat(data.Given.iShare).toFixed(2),
        yShare: parseFloat(data.Given.yShare).toFixed(2),
      },
    ]);
    setColumns([
      { id: "res_label", label: "TOTAL", minWidth: 100, align: "center" },
      {
        id: "res_total",
        label: parseFloat(data.Self.total + data.Given.total).toFixed(2),
        minWidth: 100,
        align: "center",
      },
      {
        id: "res_iShare",
        label: parseFloat(data.Self.iShare + data.Given.iShare).toFixed(2),
        minWidth: 100,
        align: "center",
      },
      {
        id: "res_yShare",
        label: parseFloat(data.Self.yShare + data.Given.yShare).toFixed(2),
        minWidth: 100,
        align: "center",
      },
    ]);
  }

  useEffect(() => {
    loadData().then((data) => {
      setTableData(data);
      const result = checkDept(data);
      setNameDept(result.name);
      setValueDept(result.value);
    });
  }, []);

  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
          <Grid item xs={12} sm={12} md={12}>
            <Card color="Card-white" key={"title_purchase" + Math.random()}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="bold center">{"Split with Ana Rebelo"}</span>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Table
              static="true"
              key={Math.random()}
              rows={rows}
              columns={COLUMNS}
            ></Table>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Card color="card-yellow" key={"title_purchase" + Math.random()}>
              <div className="center-vertical">
                <span className="center">Dept</span>
                <span className="center bold">{nameDept}</span>
              </div>
            </Card>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Table rows={[]} columns={columns}></Table>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Card color="card-yellow" key={"title_purchase" + Math.random()}>
              <span>{"Value of " + valueDept}</span>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <StackedChart
              data={rows}
              title={"Total spendings and corresponding split"}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <PolarChart data={rows} title={"Dept chart in € from each"} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
