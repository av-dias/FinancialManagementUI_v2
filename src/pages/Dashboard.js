import Sidebar from "../components/Sidebar";
import {
  showChartGeneral,
  showStatsHeader,
  showChartSpecs,
  showSelectionButtons,
} from "../combos/dashboard";

export default function dashboard() {
  return (
    <div className="background-page">
      <div>
        <Sidebar />
        <div className="blur">
          <section className="cardstext-list">{showStatsHeader()}</section>
          <section className="horizontal-header">
            {showSelectionButtons()}
          </section>
          {<section className="cards-list">{showChartGeneral()}</section>}
          {<section className="cards-list">{showChartSpecs()}</section>}
        </div>
      </div>
    </div>
  );
}
