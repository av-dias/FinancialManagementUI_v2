import "./App.css";
import React from "react";
import Sidebar from "./components/Sidebar";

import { showChart, showStatsHeader } from "./combos/dashboard";

function App() {
  return (
    <div className="background-page">
      <div>
        <Sidebar />
        <div className="blur">
          <section className="cardstext-list">{showStatsHeader()}</section>
          {<section className="cards-list">{showChart()}</section>}
        </div>
      </div>
    </div>
  );
}

export default App;
