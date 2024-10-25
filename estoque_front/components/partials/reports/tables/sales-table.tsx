import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportsContext } from "../provider/Provider";
import { moneyMask } from "@/lib/masks";
import { Skeleton } from "@/components/ui/skeleton";
import { ComponentWithClass } from "@/lib/type";
import { cn } from "@/lib/utils";

export default function SalesTable({
  title = "Resumo",
  className = "",
}: ComponentWithClass & {
  title?: string | null;
}) {
  const { state } = useContext(ReportsContext);

  const total = state.loading
    ? 0
    : state.report.total_value - state.report.expenses_value;

  return (
    <div className={cn("mt-4", className)}>
      {title && <h4 className="text-xl mt-4 pb-4">{title}</h4>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendas</TableHead>
            <TableHead>SubTotal</TableHead>
            <TableHead>Descontos</TableHead>
            <TableHead>Despesas</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.loading ? (
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
              <TableCell className="text-destructive">
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
              <TableCell className="text-destructive">
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
              <TableCell className="text-success">
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>{state.report.sales.length}</TableCell>
              <TableCell>
                R$ {moneyMask(state.report.subtotal_value.toFixed(2))}
              </TableCell>
              <TableCell className="text-destructive dark:text-red-400">
                R$ {moneyMask(state.report.discount_value.toFixed(2))}
              </TableCell>
              <TableCell className="text-destructive dark:text-red-400">
                R$ {moneyMask(state.report.expenses_value.toFixed(2))}
              </TableCell>
              <TableCell
                className={`${
                  total > 0
                    ? "text-green-600 dark:text-success"
                    : "text-destructive dark:text-red-400"
                } font-bold`}
              >
                R$ {moneyMask(total.toFixed(2))}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
