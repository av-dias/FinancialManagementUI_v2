import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import "./LineChart.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function LineChart(props) {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = ["January", "February", "March"];

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: props.chartData.label,
        data: props.chartData.data,
        borderColor: "red",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={props.size === "bg" ? "chart-line bg" : "chart-line"}>
      <Chart type="line" options={options} data={data} />
    </div>
  );
}

export default LineChart;
