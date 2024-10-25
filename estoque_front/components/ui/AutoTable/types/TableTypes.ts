import { struct } from "@/lib/type";
import { ReactNode } from "react";
import { AutoSelectOption } from "../../AutoForm/AutoSelect/AutoSelect";

export interface TableColumn<TRow> {
  name: string;
  className?: string;
  sortable?: boolean;
  isNumber?: boolean;
  selector?: string;
  render: (row: TRow) => ReactNode;
}

export interface Filters {
  [key: string]: Filter;
}

export enum ORDER {
  ASC = "ASC",
  DESC = "DESC",
}

export interface Filter {
  label: string;
  hidden?: boolean | undefined;
  type?: undefined | "" | "text" | "select" | "number" | "date";
  step?: number | undefined;
  options?: AutoSelectOption[] | undefined;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => any;
  render?: () => ReactNode;
  mapVal?: (value: any) => string | ReactNode;
  [key: string]: any;
}
export interface FiltersApplied {
  [key: string]: SingleFilterApplied;
}

export interface SingleFilterApplied {
  label: string;
  id: string;
  value: any;
}

export interface AutoTableData<TData> {
  endpoint: string;
  columns: Array<TableColumn<TData>>;
  data: Array<TData>;
  total: number;
  filters: Filters;
  filtersApplied: { [key: string]: SingleFilterApplied };
  pageSize: number;
  page: number;
  lastPage: number;
  selectedRows: { [key: number]: { [key: string | number]: TData } };
  classification: string;
  identifier: string;
  order: ORDER;
  withSelection: boolean;
  clearSelectionOnLoad: boolean;
  withEventSource: boolean;
  eventSource: string | null;
  fetching: boolean;
}

export interface AutoTableInitializer<TData> {
  endpoint: string;
  columns: Array<TableColumn<TData>>;
  classification: string;
  filters?: Filters;
  filtersApplied?: { [key: string]: SingleFilterApplied };
  pageSize?: number;
  identifier?: string;
  page?: number;
  order?: ORDER;
  withSelection?: boolean;
  clearSelectionOnLoad?: boolean;
  withEventSource?: boolean;
  eventSource?: string | null;
  children?: ReactNode;
}

export interface ProviderData<TData> {
  state: AutoTableData<TData>;
  setState: (data: AutoTableData<TData>) => void;
  handleStateChange: () => void
}

export interface FetchedTableData<TData> {
  data: Array<TData>;
  errors: Array<string>;
  filtersApplied: Array<{ [key: string]: string }>;
  classification: string;
  order: ORDER;
  limit: number;
  maxPages: number;
  total: number;
}
