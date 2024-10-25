import {
  Alert2,
  Cart,
  CheckMark,
  Components,
  Icons,
  Increase,
} from "@/components/svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useApi from "@/hooks/use-api";
import { cn } from "@/lib/utils";
import { Dashboard } from "@/types/Dashboard";
import { Icon } from "@iconify/react";
import { Loader2Icon, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TopCards() {
  const api = useApi();
  const [state, setState] = useState<Dashboard & { loading: boolean }>({
    loading: true,
    total_products: 0,
    total_sales: 0,
    total_earnings: 0,
    total_expenses: 0,
  });

  const reports = [
    {
      id: 1,
      name: "Total Produtos",
      count: state.total_products + " produtos",
      icon: <Components className="h-4 w-4" />,
      color: "primary",
    },
    {
      id: 2,
      name: "Total Vendas",
      count: state.total_sales + " vendas",
      icon: <Cart className="h-4 w-4" />,
      color: "info",
    },
    {
      id: 3,
      name: "Total Receitas",
      count: Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(state.total_earnings),
      icon: <CheckMark className="h-4 w-4" />,
      color: "warning",
    },
    {
      id: 4,
      name: "Total Despesas",
      count: Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(state.total_expenses),
      icon: <Alert2 className="h-4 w-4" />,
      color: "destructive",
    },
  ];

  const loadData = async () => {
    setState({ ...state, loading: true });
    const response = await api.get<Dashboard>("/dashboard");
    setState({ ...response, loading: false });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {reports.map((item, index) => (
        <Card key={`report-card-${index}`}>
          <CardHeader className="flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0">
            <span className="text-sm font-medium text-default-900 flex-1">
              {item.name}
            </span>
            <span
              className={cn(
                "flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full",
                {
                  "bg-primary bg-opacity-10 text-primary":
                    item.color === "primary",
                  "bg-info bg-opacity-10 text-info": item.color === "info",
                  "bg-warning bg-opacity-10 text-warning":
                    item.color === "warning",
                  "bg-destructive bg-opacity-10 text-destructive":
                    item.color === "destructive",
                }
              )}
            >
              {item.icon}
            </span>
          </CardHeader>
          <CardContent className="pb-4 px-4">
            <div className="text-2xl font-semibold text-default-900 mb-2.5">
              {state.loading ? (
                <Loader2Icon className="animate-spin h-5 w-5" />
              ) : (
                item.count
              )}
            </div>
            <div className="flex items-center font-semibold gap-1">
              {item.name === "Total Despesas" || Number(item.count) < 0 ? (
                <>
                  <Icon
                    icon="heroicons:arrow-trending-down-16-solid"
                    className="text-destructive text-xl"
                  />
                </>
              ) : Number(item.count) === 0 ? (
                <>
                  <Icon
                    icon="heroicons:minus-16-solid"
                    className="text-primary text-xl"
                  />
                </>
              ) : (
                <>
                  <Icon
                    icon="heroicons:arrow-trending-up-16-solid"
                    className="text-success text-xl"
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
