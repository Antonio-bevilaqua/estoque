import { Table } from "../table";
import AutoTableBody from "./components/autoTableBody";
import AutoTableHeader from "./components/autoTableHeader";

export default function AutoTable() {
  return (
    <Table>
      <AutoTableHeader />
      <AutoTableBody
        rowProps={{
          columnProps: {
            className: "p-1 h-[40px]",
          },
        }}
      />
    </Table>
  );
}
