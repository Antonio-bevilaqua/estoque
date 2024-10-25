import { useContext } from "react";
import EarningsChart from "../../components/partials/reports/charts/earnings-chart";
import SalesVsExpenses from "../../components/partials/reports/charts/salesVsExpenses";
import { ReportsContext } from "../../components/partials/reports/provider/Provider";
import MostSelledProducts from "../../components/partials/reports/tables/most-selled-products";
import SalesTable from "../../components/partials/reports/tables/sales-table";

export default function Content() {
  const { state } = useContext(ReportsContext);
  if (!state.initialized)
    return (
      <>
        <p className="text-slate-500">Gere aqui relatórios de faturamento e gestão dos seus produtos.</p>
      </>
    );

  return (
    <>
      <div className="grid md:grid-cols-2 overflow-x-auto">
        <div className="order-2 md:order-1">
          <SalesTable />
          <MostSelledProducts />
        </div>
        <div className="order-1 md:order-2">
          <EarningsChart />
        </div>
      </div>
      <div className="grid mt-5 w-full overflow-x-auto">
        <hr />
        <h4 className="text-xl pb-4 mt-5">Receitas x Despesas</h4>
        <SalesVsExpenses />
      </div>
    </>
  );
}
