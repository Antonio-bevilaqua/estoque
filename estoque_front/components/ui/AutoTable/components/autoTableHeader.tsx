import ColumnSorter from "@/components/ui/AutoTable/components/columnSorter";
import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import { TableColumn } from "@/components/ui/AutoTable/types/TableTypes";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type TableHeaderProps = {
  rowProps?: any;
  colProps?: any;
};

export default function AutoTableHeader<TData>({
  rowProps = {},
  colProps = {},
  ...props
}: TableHeaderProps) {
  const { columns } = useAutoTable<TData>();
  return (
    <TableHeader {...props}>
      <TableRow {...rowProps}>
        {columns.map((column: TableColumn<TData>, index: number) => (
          <TableHead
            key={`heading_${index}`}
            className={cn("align-middle", column.className, colProps.className ?? "")}
          >
            <div
              className={`flex items-center ${
                index + 1 === columns.length ? " justify-end text-right" : ""
              }`}
            >
              {column.name} <ColumnSorter column={column} />
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
