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
    <div className="grid md:grid-cols-2 overflow-x-auto">
      <div className="order-2 md:order-1">
        <SalesTable title={null} className="mt-0" />
        <MostSelledProducts />
      </div>
      <div className="order-1 md:order-2">
        <EarningsChart />
      </div>
    </div>
  );
}
