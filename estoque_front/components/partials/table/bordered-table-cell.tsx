import { TableCell } from "@/components/ui/table";
import { ComponentWithClass } from "@/lib/type";
import { cn } from "@/lib/utils";
import React from "react";

export default function BorderedTableCell({
  children,
  className = "",
  ...props
}: ComponentWithClass & React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <TableCell
      className={cn("border-slate-300 dark:border-slate-600 border", className)}
      {...props}
    >
      {children}
    </TableCell>
  );
}
