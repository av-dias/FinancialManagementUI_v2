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

import "./BarChart.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function BarChart(props) {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = props.labels || [];

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: "rgba(40, 67, 135, 0.5)",
        type: "bar",
        label: props.chartData.label,
        data: props.chartData.data,
      },
    ],
  };

  return (
    <div className="chart-bar">
      <Chart type="line" options={options} data={data} />
    </div>
  );
}

export default BarChart;
