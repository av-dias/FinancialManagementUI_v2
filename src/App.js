import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CardText from "./components/Cardtext";
import Sidebar from "./components/Sidebar";
import LChart from "./components/LChart";

import stats from "./images/stats.jpg";
import graph from "./images/graph.jpg";
import arrow from "./images/arrow.png";
import date from "./images/date.jpg";

// [totalSpendings, totalSavings, monthSpendings,monthSavings]
const statsData = [
  { id: 1, value: 100, img: graph, price: "4€" },
  { id: 2, value: 500, img: stats, price: "69€" },
  { id: 3, value: 30, img: graph, price: "30€" },
  { id: 4, value: 200, img: stats, price: "75€" },
];

const statsByType = [{ id: 1, value: 100, img: graph, price: "4€" }];

function App() {
  const showStats = statsData.map((stat) => {
    return (
      <Card
        key={stat.id}
        text="Life tips for management"
        value="(6)"
        star={stat.value}
        country="USA"
        price={`For the price of ${stat.price}`}
        img={stat.img}
        icon={arrow}
      />
    );
  });
  const showStatsHeader = () => {
    return (
      <>
        <CardText key={"mspend"} text="Month Spends: " value={100} />
        <CardText key={"msaving"} text="Month Balance: " value={100} />
        <div className="align--right">
          <CardText key={"month"} icon={date} date={new Date().getMonth()} />
        </div>
      </>
    );
  };

  const showStatsByType = () => {
    return (
      <>
        <LChart />
      </>
    );
  };

  return (
    <div className="background-page">
      <Navbar />
      <div>
        <Sidebar />
        <div className="blur">
          <section className="cardstext-list">{showStatsHeader()}</section>
          <section className="cards-list">{showStats}</section>
          <section className="cards-list">{showStatsByType()}</section>
        </div>
      </div>
    </div>
  );
}

export default App;
