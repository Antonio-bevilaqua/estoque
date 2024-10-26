import EarningsChart from "@/components/partials/reports/charts/earnings-chart";
import { ReportsContext } from "@/components/partials/reports/provider/Provider";
import MostSelledProducts from "@/components/partials/reports/tables/most-selled-products";
import SalesTable from "@/components/partials/reports/tables/sales-table";
import useApi from "@/hooks/use-api";
import { dateIntervals } from "@/lib/date-intervals";
import { endpointWithParams } from "@/lib/utils";
import React, { useContext, useEffect } from "react";

export default function Content() {
  const api = useApi();
  const { state, setState } = useContext(ReportsContext);
  const getMonthlyReport = async () => {
    setState({ ...state, loading: true, initialized: true });
    const report = await api.get(
      endpointWithParams("/reports/dre", {
        initial_date: dateIntervals[0].initial_date,
        final_date: dateIntervals[0].final_date,
      })
    );
    if (report) {
      setState({ ...state, loading: false, report: report });
    }
  };
  useEffect(() => {
    getMonthlyReport();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="order-2 lg:order-1 flex-1">
        <SalesTable title={null} className="mt-0 overflow-x-auto w-full" />
        <MostSelledProducts className="mt-0 overflow-x-auto w-full" />
      </div>
      <div className="order-1 lg:order-2 lg:w-[600px]">
        <EarningsChart />
      </div>
    </div>
  );
}
