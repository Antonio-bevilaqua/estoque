import React, { ReactNode } from "react";
import AutoFilterDrawer from "./components/autoFilterDrawer";
import TableExporter from "./components/tableExporter";
import PageLimitSelector from "./components/pageLimitSelector";
import AutoFilterList from "./components/autoFilterList";
import useAutoTable from "./hook/useAutoTable";
import AutoFilters from "./auto-filters";

export interface TableHeadingsProps {
  baseEndpoint: string;
  exportLabel?: string;
  withExports?: boolean;
  withLimitSelector?: boolean;
  withFilters?: boolean;
  withFilterList?: boolean;
  filtersClassName?: string;
  buttons?: ReactNode | null;
}

function TableHeadings({
  baseEndpoint,
  exportLabel = "Itens",
  withExports = false,
  withLimitSelector = false,
  withFilters = false,
  filtersClassName = "",
  withFilterList = false,
  buttons = null,
}: TableHeadingsProps) {
  const { pageSize, setPageSize } = useAutoTable<any>();

  if (!withExports && !withLimitSelector && !withFilters) return <></>;

  return (
    <div className="grid">
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:items-end">
        <div className="flex w-full gap-3">
          {buttons ? buttons : ""}
          {withFilters && (
            <AutoFilterDrawer>
              <AutoFilters className={filtersClassName} />
            </AutoFilterDrawer>
          )}
          {withExports && (
            <TableExporter
              baseEndpoint={baseEndpoint}
              togglerProps={{
                className: `flex items-center gap-2 justify-center w-full md:w-auto bg-neutral-500 transition 
                hover:bg-neutral-500 hover:ring-4 hover:ring-neutral-500/20`,
              }}
            />
          )}
        </div>
        {withLimitSelector && (
          <div className="mb-4 md:mb-0">
            <label className="text-sm text-muted-foreground">
              Itens por página
            </label>
            <PageLimitSelector
              value={pageSize.toString()}
              setValue={(value: string) => setPageSize(Number(value))}
              label={exportLabel}
            />
          </div>
        )}
      </div>
      {withFilters && withFilterList && (
        <div className="w-full">
          <AutoFilterList />
        </div>
      )}
    </div>
  );
}

export default TableHeadings;
