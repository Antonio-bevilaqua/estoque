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
        <p className="text-slate-500">
          Gere aqui relatórios de faturamento e gestão dos seus produtos.
        </p>
      </>
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="order-2 lg:order-1 flex-1">
          <SalesTable className="overflow-x-auto" />
          <MostSelledProducts className="overflow-x-auto" />
        </div>
        <div className="order-1 lg:order-2 lg:w-[500px] lg:mt-10">
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
