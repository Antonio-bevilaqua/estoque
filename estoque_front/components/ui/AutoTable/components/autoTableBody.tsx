import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import { TableBody } from "@/components/ui/table";
import { useId } from "react";
import AutoTableRow from "./autoTableRow";
import AutoTableLoadingRow from "./autoTableLoadingRow";

interface AutoTableBodyProps {
  rowProps?: any;
}

export default function AutoTableBody<TData>({
  rowProps = {},
  ...props
}: AutoTableBodyProps) {
  const id = useId();
  const { data, page, pageSize, fetching } = useAutoTable<TData>();

  if (fetching) {
    return (
      <TableBody {...props}>
        {Array.from({ length: pageSize }).map((_, index: number) => (
          <AutoTableLoadingRow {...rowProps} key={`loading_row_${index}`} />
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody {...props}>
      {data.map((element: TData, index: number) => (
        <AutoTableRow
          element={element}
          parentKey={`${id}_${page}_${index}`}
          key={`${id}_${page}_${index}`}
          {...rowProps}
        />
      ))}
    </TableBody>
  );
}
