import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownNarrowWideIcon, ArrowUpWideNarrowIcon } from "lucide-react";
import React from "react";
import useAutoTable from "../hook/useAutoTable";
import { ORDER, TableColumn } from "../types/TableTypes";

interface ColumnSorterProps<TData> {
  column: TableColumn<TData>;
  className?: string;
}

const icons = {
  numeric: {
    [ORDER.ASC]: <ArrowDownNarrowWideIcon />,
    [ORDER.DESC]: <ArrowUpWideNarrowIcon />,
  },
  alpha: {
    [ORDER.ASC]: <ArrowDownNarrowWideIcon />,
    [ORDER.DESC]: <ArrowUpWideNarrowIcon />,
  },
};

export default function ColumnSorter<TData>({
  column,
  className = "",
}: ColumnSorterProps<TData>) {
  const { classification, order, getInverseOrder, setSort } =
    useAutoTable<TData>();

  const isActive = classification === column.selector;

  const getOrderToSet = () => {
    if (isActive) {
      return getInverseOrder(order);
    }

    return ORDER.DESC;
  };

  const orderToSet = getOrderToSet();

  const handleSortClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setSort(column?.selector ?? "", orderToSet);
  };

  if (!column.sortable) {
    return <></>;
  }

  return (
    <Button
      variant="ghost"
      color={isActive ? "default" : "secondary"}
      onClick={handleSortClick}
      className={cn(
        `text-lg hover:bg-transparent border-none hover:text-green-500/70`,
        className
      )}
    >
      {icons[column.isNumber ? "numeric" : "alpha"][orderToSet]}
    </Button>
  );
}
