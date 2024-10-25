import React from "react";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import useAutoTable from "../hook/useAutoTable";
import { XIcon } from "lucide-react";
import { Badge } from "../../badge";

export default function AutoFilterList({
  className = "",
}: {
  className?: string;
}) {
  const { filters, filtersApplied, removeFilter } = useAutoTable();

  return (
    <div
      className={cn(
        "flex gap-2 min-h-[30px] items-center justify-end",
        className
      )}
    >
      {Object.keys(filtersApplied).map((key: string, index: number) => (
        <Fragment key={`list_filter_${key}_${index}`}>
          {filters[key].hidden || filtersApplied[key].value === "" ? (
            <></>
          ) : (
            <Badge
              variant="soft_bordered"
              color="default"
              className="rounded-sm flex gap-4 text-[0.8rem] leading-[1rem] items-center"
            >
              <div className="flex gap-1 ">
                <b>{filtersApplied[key].label}:</b>
                {typeof filters[key].mapVal === "function" ? (
                  <>{filters[key].mapVal(filtersApplied[key].value)}</>
                ) : (
                  filtersApplied[key].value
                )}
              </div>
              <XIcon
                onClick={() => removeFilter(key)}
                size="1rem"
                className="text-red-500 leading-[1rem] cursor-pointer"
              />
            </Badge>
          )}
        </Fragment>
      ))}
    </div>
  );
}
