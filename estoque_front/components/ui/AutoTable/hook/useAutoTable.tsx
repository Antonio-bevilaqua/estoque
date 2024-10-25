import { useContext } from "react";
import { AutoTableContext } from "../context/AutoTableContextProvider";
import { ORDER, ProviderData, SingleFilterApplied } from "../types/TableTypes";

interface FiltersToAply {
  [key: string]: {
    id: string;
    value: string;
  };
}

function useAutoTable<TData = any>() {
  const { state, setState, handleStateChange } =
    useContext<ProviderData<TData>>(AutoTableContext);

  function setPageSize(pageSize: number) {
    setState({
      ...state,
      page: 1,
      pageSize: pageSize,
    });
  }

  function setPage(page: number) {
    setState({
      ...state,
      page: page,
    });
  }

  function setSort(classification: string, order: ORDER) {
    setState({
      ...state,
      classification: classification,
      order: order,
    });
  }

  const getInverseOrder = (order: ORDER) => {
    return order === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
  };

  function applyFilter(key: string, id: string, value: string) {
    if (!state.filters[key]) return;

    setState({
      ...state,
      filtersApplied: {
        ...state.filtersApplied,
        [key]: {
          label: state.filters[key].label,
          id: id,
          value: value,
        },
      },
    });
  }

  function applyFilters(values: FiltersToAply) {
    let newFiltersAplied = { ...state.filtersApplied };
    for (let key in values) {
      if (!state.filters[key]) continue;

      if (values[key].value === "" && newFiltersAplied[key]) {
        delete newFiltersAplied[key];
        continue;
      }

      newFiltersAplied[key] = {
        label: state.filters[key].label,
        id: values[key].id,
        value: values[key].value,
      };
    }

    setState({
      ...state,
      page: 1,
      filtersApplied: newFiltersAplied,
    });
  }

  function removeFilter(filterKey: string) {
    let filtersApplied = {
      ...state.filtersApplied,
    };

    if (typeof filtersApplied[filterKey] !== "undefined") {
      delete filtersApplied[filterKey];
    }

    setState({
      ...state,
      page: 1,
      filtersApplied: filtersApplied,
    });
  }

  const changeRenderedData = (data: Array<TData>) => {
    setState({
      ...state,
      data: [...data],
    });
  };

  const isRowSelected = (row: TData | any) => {
    if (state.selectedRows[state.page] === undefined) return false;
    const rowID = row[state.identifier];
    return state.selectedRows[state.page][rowID] ?? false;
  };

  const selectRow = (row: TData | any) => {
    let actualSelection = { ...state.selectedRows };

    const rowID = row[state.identifier];

    if (actualSelection[state.page] === undefined) {
      actualSelection[state.page] = {};
    }

    actualSelection[state.page][rowID] = row;

    setState({
      ...state,
      selectedRows: actualSelection,
    });
  };

  const unselectRow = (row: TData | any) => {
    let actualSelection = { ...state.selectedRows };

    const rowID = row[state.identifier];

    if (actualSelection[state.page] === undefined) {
      actualSelection[state.page] = {};
    }

    if (typeof actualSelection[state.page][rowID] !== undefined) {
      delete actualSelection[state.page][rowID];
    }

    setState({
      ...state,
      selectedRows: actualSelection,
    });
  };

  const toggleRow = (row: TData | any) => {
    let actualSelection = { ...state.selectedRows };

    const rowID = row[state.identifier];

    if (actualSelection[state.page] === undefined) {
      actualSelection[state.page] = {};
    }

    if (typeof actualSelection[state.page][rowID] !== undefined) {
      delete actualSelection[state.page][rowID];
    } else {
      actualSelection[state.page][rowID] = row;
    }

    setState({
      ...state,
      selectedRows: actualSelection,
    });
  };

  function refresh() {
    handleStateChange();
  }

  return {
    ...state,
    setPageSize,
    setPage,
    setSort,
    getInverseOrder,
    applyFilter,
    applyFilters,
    removeFilter,
    changeRenderedData,
    isRowSelected,
    selectRow,
    unselectRow,
    toggleRow,
    refresh,
  };
}

export default useAutoTable;
