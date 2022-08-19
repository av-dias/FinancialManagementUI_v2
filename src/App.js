import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import stats from "./images/stats.jpg";
import graph from "./images/graph.jpg";
import arrow from "./images/arrow.png";

// [totalSpendings, totalSavings, monthSpendings,monthSavings]
const statsData = [
  { id: 1, value: 100, img: graph, price: "4€" },
  { id: 2, value: 500, img: stats, price: "69€" },
  { id: 3, value: 30, img: graph, price: "30€" },
  { id: 4, value: 200, img: stats, price: "75€" },
];

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
  return (
    <div>
      <Navbar title="Financial Management" />
      <section className="cards-list">{showStats}</section>
    </div>
  );
}

export default App;
