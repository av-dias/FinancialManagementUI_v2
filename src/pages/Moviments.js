import Sidebar from "../components/Sidebar";
import Button from "../components/Button";

import { showSelectionButtons } from "../combos/dashboard";
import { showMainTable } from "../combos/moviments";

export default function dashboard() {
  return (
    <div className="background-page">
      <Sidebar />
      <div className="blur">
        <section className="horizontal-header">
          {showSelectionButtons()}
          <Button text="+Purchase" />
          <Button text="+Income" />
        </section>
        <section className="top-margin">{showMainTable()}</section>
      </div>
    </div>
  );
}
