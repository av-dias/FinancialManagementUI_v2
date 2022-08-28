import Table from "../components/Table";
import CardTitle from "../components/Cardtitle";
import "../components/Table.css";

export const showMainTable = () => {
  return (
    <div className="align-tables">
      <div className="table-left">
        <CardTitle key={"msaving"} text="Moviments" />
        <Table size="bg" />
      </div>
      <div className="table-right">
        <CardTitle key={"msaving"} text="Home" />
        <Table size="sm" />
      </div>
    </div>
  );
};
