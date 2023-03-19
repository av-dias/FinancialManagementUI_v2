import React from "react";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip } from "chart.js";
import { Chart } from "react-chartjs-2";

import "./LineChart.css";

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip);

/* var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getMonths(names) {
  if (names === null || names === undefined || names === []) return [];
  return Months.slice(names[0] - 1, names[names.length - 1]);
} */

function LineChart(props) {
  const options = {
    animation: {
      duration: 0,
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: {
            size: 10, //this change the font size
          },
        },
      },
    },
  };

  const labels = props.chartData.lable || ["January", "February", "March"];

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: props.chartData.title || "Loading...",
        data: props.chartData.data || [0, 0, 0],
        borderColor: "rgb(40, 67, 135, 0.5)",
        backgroundColor: "rgba(40, 67, 135, 0.7)",
      },
    ],
  };

  return (
    <div className="chart-line">
      <Chart type="line" options={options} data={data} />
    </div>
  );
}

export default LineChart;
