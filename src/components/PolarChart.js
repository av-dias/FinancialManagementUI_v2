import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PolarChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
let chartLabel;

if (window.sessionStorage.getItem("user_id") === "1") {
  chartLabel = ["Álison Dias", "Ana Rebelo"];
} else {
  chartLabel = ["Ana Rebelo", "Álison Dias"];
}

function PolarChart(props) {
  const options = {
    aspectRatio: "2",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "# of Votes",
        data: [props.data[0].yShare, props.data[1].iShare],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-polar">
      <Pie height={null} options={options} data={data} />
    </div>
  );
}

export default PolarChart;
