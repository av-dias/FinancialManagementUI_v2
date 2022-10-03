import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./StackedChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StackedChart(props) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total spendings and corresponding split",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  console.log(props.data);
  const labels = [props.data[0].Name, props.data[1].Name] || ["User1", "User2"];

  const data = {
    labels,
    datasets: [
      {
        label: "iShare",
        data: [props.data[0].iShare, props.data[1].iShare],
        backgroundColor: "rgba(204, 85, 0, 0.5)",
        borderColor: "rgba(204, 85, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "yShare",
        data: [props.data[0].yShare, props.data[1].yShare],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-stacked">
      <Bar options={options} data={data} />
    </div>
  );
}

export default StackedChart;
