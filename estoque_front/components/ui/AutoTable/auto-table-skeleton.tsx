import { Skeleton } from "../skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import AutoTableLoadingRow from "./components/autoTableLoadingRow";

export default function AutoTableSkeleton({
  colNumber,
  pageSize = 10,
  withHeader = true,
}: {
  colNumber: number;
  pageSize?: number;
  withHeader?: boolean;
}) {
  return (
    <Table>
      {withHeader && (
        <TableHeader>
          <TableRow>
            {Array.from({ length: colNumber }).map((_, index: number) => (
              <TableHead
                key={`skeleton_heading_${index}`}
                className="px-1 py-0"
              >
                <Skeleton className="w-full h-[40px] py-0 border-none rounded-none" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: pageSize }).map((_, index: number) => (
          <TableRow key={`skeleton_row_${index}`}>
            <TableCell colSpan={colNumber} className={"px-0 py-0"}>
              <Skeleton className="w-full h-[40px] border-none rounded-none" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
