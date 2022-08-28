import Table from "../components/Table";
import CardTitle from "../components/Cardtitle";
import "../components/Table.css";

export const showMainTables = () => {
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

export const showPopup = (isPopup) => {
  switch (isPopup) {
    case "Purchase":
      return (
        <div className="horizontal-header box">
          <form>
            <CardTitle key={"title_purchase"} text="Purchase" />
            <label htmlFor="pname">Product Name</label>
            <input type="text" id="pname" name="pname"></input>
            <label htmlFor="tname">Product Type</label>
            <input type="text" id="tname" name="tname"></input>
            <label htmlFor="pprice">Product Price</label>
            <input type="number" id="pprice" name="pprice"></input>
            <label htmlFor="pprice">Purchase Date</label>
            <input type="date" id="pdate" name="pdate"></input>
            <button type="submit" name="save" value="Saveeeee">
              Add Purchase
            </button>
          </form>
        </div>
      );
    case "Income":
      return (
        <div className="horizontal-header box">
          <form>
            <CardTitle key={"title_income"} text="Income" />
            <label htmlFor="pname">Income Name</label>
            <input type="text" id="iname" name="iname"></input>
            <label htmlFor="tname">Income Type</label>
            <input type="text" id="iname" name="iname"></input>
            <label htmlFor="pprice">Income Value</label>
            <input type="number" id="ivalue" name="ivalue"></input>
            <label htmlFor="pprice">Income Date</label>
            <input type="date" id="idate" name="idate"></input>
            <button type="submit" name="save" value="save">
              Add Income
            </button>
          </form>
        </div>
      );
    default:
      return (
        <div className="horizontal-header box">
          <form>
            <CardTitle key={"msaving"} text="Purchase" />
            <label htmlFor="pname">Product Name</label>
            <input type="text" id="pname" name="pname"></input>
            <label htmlFor="tname">Product Type</label>
            <input type="text" id="tname" name="tname"></input>
            <label htmlFor="pprice">Product Price</label>
            <input type="number" id="pprice" name="pprice"></input>
            <label htmlFor="pprice">Purchase Date</label>
            <input type="date" id="pprice" name="pprice"></input>
            <button type="submit" name="save" value="Saveeeee">
              Add Purchase
            </button>
          </form>
        </div>
      );
  }
};
