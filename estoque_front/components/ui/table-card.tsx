import React, { ReactNode } from "react";
import AutoTableContextProvider from "./AutoTable/context/AutoTableContextProvider";
import { AutoTableInitializer, Filters } from "./AutoTable/types/TableTypes";
import CardSnippet from "./card-snippet";
import TableHeadings, { TableHeadingsProps } from "./AutoTable/table-headings";
import AutoTable from "./AutoTable/auto-table";
import AutoTablePagination from "./AutoTable/components/autoTablePagination";
import { ButtonProps } from "./button";
import AutoFilterList from "./AutoTable/components/autoFilterList";
import { useMediaQuery } from "@/hooks/use-media-query";

export type TableCardProps = AutoTableInitializer<any> &
  Omit<TableHeadingsProps, "baseEndpoint"> &
  Pick<ButtonProps, "size" | "color"> & {
    title: string;
    filters?: Filters;
    baseEndpoint?: string | null;
    footer?: ReactNode;
  };

function TableCard({
  title,
  baseEndpoint = null,
  withExports = false,
  withLimitSelector = true,
  withFilters = true,
  withFilterList = true,
  buttons = null,
  filtersClassName = "",
  exportLabel = "",
  filters = {},
  size = "default",
  color = "default",
  footer = null,
  ...props
}: TableCardProps) {
  const queries = {
    xs: useMediaQuery("(min-width: 500px)"),
    md: useMediaQuery("(min-width: 768px)"),
    xmd: useMediaQuery("(min-width: 1024px)"),
    lg: useMediaQuery("(min-width: 1276px)"),
    xl: useMediaQuery("(min-width: 1400px)"),
  };
  return (
    <AutoTableContextProvider filters={filters} {...props}>
      <CardSnippet
        title={title}
        headerClassName="mb-0"
        header={
          <TableHeadings
            baseEndpoint={baseEndpoint ?? props.endpoint}
            exportLabel={exportLabel}
            withExports={withExports}
            withLimitSelector={withLimitSelector}
            withFilters={Object.keys(filters).length > 0 && withFilters}
            filtersClassName={filtersClassName}
            withFilterList={false}
            buttons={buttons}
          />
        }
      >
        {Object.keys(filters).length > 0 && withFilterList && (
          <div className="w-full">
            <AutoFilterList />
          </div>
        )}

        <AutoTable />

        <AutoTablePagination
          size={size}
          color={color}
          totalButtons={queries.lg ? 10 : queries.xs ? 5 : 3}
          withFirst={queries.md}
          withLast={queries.md}
          className="mt-5 pt-5"
        />
        {footer ?? ""}
      </CardSnippet>
    </AutoTableContextProvider>
  );
}

export default TableCard;
