import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import { TableColumn } from "@/components/ui/AutoTable/types/TableTypes";
import { TableCell, TableRow } from "@/components/ui/table";

export default function AutoTableRow<TData>({
  element,
  parentKey,
  columnProps = {},
  ...props
}: {
  element: TData;
  parentKey: string;
  columnProps?: any;
}) {
  const { columns } = useAutoTable<TData>();
  return (
    <TableRow {...props}>
      {columns.map((column: TableColumn<TData>, index: number) => (
        <TableCell key={`${parentKey}_${index}`} {...columnProps}>
          <div
            className={`flex items-center ${
              index + 1 === columns.length ? " justify-end text-right" : ""
            }`}
          >
            {column.render(element)}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}
