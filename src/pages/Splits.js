import Grid from "@mui/material/Grid";

import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import CardTitle from "../components/Cardtitle";
import CardInfo from "../components/CardInfo";

import { showSelectionButtons } from "../combos/dashboard";

const options = { maintainAspectRatio: false, responsive: false };

const ROWS = [
  { Name: "Ana", Total: "100", iShare: "100", yShare: "300" },
  { Name: "Álison", Total: "200", iShare: "200", yShare: "300" },
];

const COLUMNS = [
  { id: "Name", label: "Name", minWidth: 100, align: "center" },
  { id: "Total", label: "Total", minWidth: 100, align: "center" },
  { id: "iShare", label: "iShare", minWidth: 100, align: "center" },
  { id: "yShare", label: "yShare", minWidth: 100, align: "center" },
];

const COLUMNS_RESULT = [
  { id: "res_label", label: "Total", minWidth: 100, align: "center" },
  { id: "res_total", label: "300", minWidth: 100, align: "center" },
  { id: "res_iShare", label: "300", minWidth: 100, align: "center" },
  { id: "res_yShare", label: "600", minWidth: 100, align: "center" },
];

export default function Splits() {
  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
          <Grid item xs={12} sm={12} md={12}>
            <CardTitle
              color="cardtitle-white"
              key={"title_purchase"}
              text="Split with Ana Rebelo"
            />
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Table rows={ROWS} columns={COLUMNS}></Table>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <CardInfo
              color="cardtitle-yellow"
              key={"title_purchase"}
              text="Person in Dept"
              description="Ana Rebelo"
            />
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Table rows={[]} columns={COLUMNS_RESULT}></Table>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <CardInfo
              color="cardtitle-yellow"
              key={"title_purchase"}
              text="Value of 300"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <BarChart
              options={options}
              chartData={{ label: "AAA", data: [10, 20, 30] }}
            ></BarChart>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <LineChart
              options={options}
              chartData={{ label: "AAA", data: [10, 20, 30] }}
            ></LineChart>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
