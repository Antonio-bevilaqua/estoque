"use client";
import { truncateByDomain } from "recharts/types/util/ChartUtils";
import { AutoFormInitializer } from "../AutoForm/Types/AutoFormTypes";
import TableCard, { TableCardProps } from "../table-card";
import AddButton from "./add-button";
import CrudModals from "./modals";
import CrudOptionsProvider from "./provider";
import { ReactNode } from "react";

export type CrudTableProps = Omit<TableCardProps, "buttons"> & {
  saveFieldsGetter: (element: any) => AutoFormInitializer;
  elementName?: string;
  masculineName?: boolean;
  deleteIdentifier?: string;
  buttons?: ReactNode;
  withAdd?: boolean;
  withEdit?: boolean;
  withRemove?: boolean;
  asForm?: boolean;
};

export default function CrudTableCard({
  title,
  columns,
  endpoint,
  saveFieldsGetter,
  classification = "id",
  baseEndpoint = null,
  withExports = false,
  withLimitSelector = true,
  withFilters = true,
  withFilterList = true,
  filtersClassName = "",
  exportLabel = "",
  filters = {},
  size = "default",
  color = "default",
  deleteIdentifier = "id",
  elementName = "Elemento",
  masculineName = true,
  withAdd = true,
  withEdit = true,
  withRemove = true,
  buttons = null,
  asForm = false,
}: CrudTableProps) {
  return (
    <CrudOptionsProvider>
      <TableCard
        endpoint={endpoint}
        columns={columns}
        classification={classification}
        title={title}
        filters={filters}
        buttons={
          <>
            {withAdd && <AddButton />}
            {buttons}
          </>
        }
        baseEndpoint={baseEndpoint}
        withExports={withExports}
        withLimitSelector={withLimitSelector}
        withFilters={withFilters}
        withFilterList={withFilterList}
        filtersClassName={filtersClassName}
        exportLabel={exportLabel}
        size={size}
        color={color}
        footer={
          <CrudModals
            withAdd={withAdd}
            withEdit={withEdit}
            withRemove={withRemove}
            saveModalProps={{
              endpoint: endpoint,
              title: elementName,
              masculine: masculineName,
              fieldGetter: saveFieldsGetter,
              asForm: asForm,
            }}
            deleteModalProps={{
              endpoint: endpoint,
              title: elementName,
              masculine: masculineName,
              identifier: deleteIdentifier,
            }}
          />
        }
      />
    </CrudOptionsProvider>
  );
}
