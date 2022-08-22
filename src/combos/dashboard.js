import BarChart from "../components/BarChart";
import CardText from "../components/Cardtext";
import date from "../images/date.png";

const options = { maintainAspectRatio: false, responsive: false };

export const showChart = () => {
  return (
    <>
      <BarChart
        options={options}
        chartData={{ label: "AAA", data: [10, 20, 30] }}
      />
      <BarChart
        options={options}
        chartData={{ label: "BBB", data: [10, 50, 30] }}
      />
      <BarChart
        options={options}
        chartData={{ label: "CCC", data: [10, 10, 5] }}
      />
      <BarChart
        options={options}
        chartData={{ label: "CCC", data: [10, 10, 5] }}
      />
    </>
  );
};

export const showStatsHeader = () => {
  return (
    <>
      <CardText key={"msaving"} text="Month Balance" value={1000} />
      <CardText key={"mspend"} text="Month Spendings" value={1000} />
      <div className="align--right">
        <CardText key={"month"} icon={date} date={new Date().getMonth()} />
      </div>
    </>
  );
};
