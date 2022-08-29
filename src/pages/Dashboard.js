import Sidebar from "../components/Sidebar";
import {
  showChartGeneral,
  showStatsHeader,
  showChartSpecs,
  showSelectionButtons,
} from "../combos/dashboard";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <Grid container spacing={{ xs: 1, md: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            {showStatsHeader()}
          </Grid>
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12} />
          <Grid item xs={12} sm={12} md={12}>
            {showSelectionButtons()}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {showChartGeneral()}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {showChartSpecs()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
