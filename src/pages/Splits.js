import Sidebar from "../components/Sidebar";
import { showSelectionButtons } from "../combos/dashboard";

export default function Splits() {
  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <section className="horizontal-header">
          {showSelectionButtons()}
        </section>
      </div>
    </div>
  );
}
