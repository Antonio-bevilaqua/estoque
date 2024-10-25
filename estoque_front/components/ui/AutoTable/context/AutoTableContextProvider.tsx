import React, { useEffect, useState } from "react";
import {
  AutoTableData,
  AutoTableInitializer,
  ORDER,
  ProviderData,
} from "../types/TableTypes";

import { endpointWithParams } from "@/lib/utils";
import { AxiosResponse } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/use-api";
import { struct } from "@/lib/type";
import toast from "react-hot-toast";

export const AutoTableContext = React.createContext<ProviderData<any>>(
  undefined as any
);

function AutoTableContextProvider({
  endpoint,
  columns,
  classification,
  filters = {},
  filtersApplied = {},
  pageSize = 10,
  page = 1,
  identifier = "id",
  order = ORDER.DESC,
  withSelection = false,
  clearSelectionOnLoad = false,
  withEventSource = false,
  eventSource = null,
  children,
}: AutoTableInitializer<any>) {
  const params = useSearchParams();
  const pathname = usePathname();
  const fetcher = useApi();
  const router = useRouter();

  const initializeState = () => {
    const initialOrder =
      (params.get("order") ?? "") in ORDER ? params.get("order") : order;
    let defaultData: AutoTableData<any> = {
      page: params.get("page") ? Number(params.get("page")) : page,
      lastPage: 1,
      classification: params.get("classification") ?? classification,
      order: initialOrder as ORDER,
      filters: { ...filters },
      filtersApplied: { ...filtersApplied },
      data: [],
      selectedRows: {},
      total: 0,
      identifier: identifier,
      withSelection: withSelection,
      clearSelectionOnLoad: clearSelectionOnLoad,
      withEventSource: withEventSource,
      eventSource: eventSource,
      endpoint: endpoint,
      columns: columns,
      pageSize: pageSize,
      fetching: false,
    };

    for (let key in filters) {
      if (filters[key].hidden) {
        continue;
      }
      if (params.get(key)) {
        defaultData.filtersApplied[key] = {
          label: filters[key].label,
          id: key,
          value: params.get(key),
        };
      }
    }

    for (let key in filtersApplied) {
      defaultData.filtersApplied[key] = { ...filtersApplied[key] };
    }

    return defaultData;
  };

  const [state, setState] = useState<AutoTableData<any>>(initializeState());

  useEffect(() => {
    if (!state.fetching) {
      handleStateChange();
    }
  }, [
    state.page,
    state.pageSize,
    state.classification,
    state.order,
    state.filtersApplied,
  ]);

  function handleStateChange() {
    let params: struct = {
      classification: state.classification,
      order: state.order,
      page: state.page,
      pageSize: state.pageSize,
    };
    let apiParams: struct = {
      ...params,
    };

    for (let key in state.filtersApplied) {
      if (
        state.filtersApplied[key] !== undefined &&
        state.filtersApplied[key].value !== ""
      ) {
        apiParams[key] = state.filtersApplied[key].value;
        if (!state.filters[key].hidden) {
          params[key] = state.filtersApplied[key].value;
        }
      }
    }

    fetchTableData(params, apiParams);
  }

  const fetchTableData = async (
    params: { [key: string]: string | number } | null,
    apiParams: { [key: string]: string | number } | null
  ) => {
    const url = endpointWithParams(state.endpoint, apiParams);
    const newPathname = endpointWithParams(pathname, params);
    setState({
      ...state,
      fetching: true,
    });
    const response = await fetcher.get(url);
    parseResponse(response, newPathname);
  };

  const parseResponse = (
    response: AxiosResponse<any, any> | null,
    newPathname: string | null = null
  ) => {
    if (!response || !("maxPages" in response) || !("total" in response)) {
      return toast.error("Erro ao buscar dados da API, contate o suporte");
    }

    setState({
      ...state,
      lastPage: Number(response.maxPages),
      data: response.data,
      total: Number(response.total),
      selectedRows: state.clearSelectionOnLoad ? {} : { ...state.selectedRows },
      fetching: false,
    });

    if (newPathname !== null) {
      router.replace(newPathname);
    }
  };

  return (
    <AutoTableContext.Provider value={{ state: state, setState: setState, handleStateChange }}>
      {children}
    </AutoTableContext.Provider>
  );
}

export default AutoTableContextProvider;
