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

var Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonths(names) {
  if (names === null || names === undefined || names === []) return [];
  return Months.slice(names[0] - 1, names[names.length - 1]);
}

function LineChart(props) {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = getMonths(props.chartData.data.months) || [
    "January",
    "February",
    "March",
  ];

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: props.chartData.label,
        data: props.chartData.data.values,
        borderColor: "#FF6A3D",
        borderWidth: 2,
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
