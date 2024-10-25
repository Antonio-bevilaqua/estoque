import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";

export default function PrimaryTableHead({
  children,
  className = "",
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <TableHead
      className={cn(
        `bg-primary dark:bg-green-950 text-white dark:text-slate-200 
      border-primary dark:border-slate-600 border`,
        className
      )}
    >
      {children}
    </TableHead>
  );
}
