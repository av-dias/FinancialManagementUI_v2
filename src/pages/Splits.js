import Sidebar from "../components/Sidebar";
import { showSelectionButtons } from "../combos/dashboard";

export default function dashboard() {
  return (
    <div className="background-page">
      <div>
        <Sidebar />
        <div className="blur">
          <section className="horizontal-header">
            {showSelectionButtons()}
          </section>
        </div>
      </div>
    </div>
  );
}
