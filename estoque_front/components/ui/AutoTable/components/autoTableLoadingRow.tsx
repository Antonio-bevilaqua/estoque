import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import "../styles/loadingRow.css";

export default function AutoTableLoadingRow<TData>({
  columnProps = {},
  ...props
}: {
  columnProps?: any;
}) {
  const { columns } = useAutoTable<TData>();

  return (
    <TableRow {...props}>
      <TableCell
        colSpan={columns.length}
        className={cn(columnProps.className, "px-0 py-0")}
      >
        <Skeleton className="w-full h-[40px] border-none rounded-none" />
      </TableCell>
    </TableRow>
  );
}
