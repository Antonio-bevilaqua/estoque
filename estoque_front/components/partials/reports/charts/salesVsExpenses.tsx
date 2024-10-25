"use client";
import { themes } from "@/config/thems";
import DateTime from "@/lib/DateTime";
import { struct } from "@/lib/type";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { useContext } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReportsContext } from "../provider/Provider";
import { Skeleton } from "@/components/ui/skeleton";

export default function SalesVsExpenses({ height = 300 }: { height?: number }) {
  const { state } = useContext(ReportsContext);
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const formulateChartData = () => {
    let dataValues: struct = {};
    for (let sale of state.report.sales) {
      let dateStr = new DateTime(sale.created_at).format("YYYY-MM-DD");
      if (dateStr in dataValues) {
        dataValues[dateStr].receipt += sale.total;
      } else {
        dataValues[dateStr] = {
          name: new DateTime(sale.created_at).format("DD/MM/YYYY"),
          expense: 0,
          receipt: sale.total,
        };
      }
    }
    for (let expense of state.report.expenses) {
      let dateStr = new DateTime(expense.created_at).format("YYYY-MM-DD");
      if (dateStr in dataValues) {
        dataValues[dateStr].expense += expense.value;
      } else {
        dataValues[dateStr] = {
          name: new DateTime(expense.created_at).format("DD/MM/YYYY"),
          expense: expense.value,
          receipt: 0,
        };
      }
    }

    return Object.keys(dataValues).map((key: string) => dataValues[key]);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload) {
      return (
        <div className="bg-slate-900 dark:bg-slate-100 text-primary-foreground p-3 rounded-md grid px-4 ">
          <div>
            <span>{`Receitas`}</span>
            <span>{": "}</span>
            <span>{`${new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(payload[1].value)}`}</span>
          </div>
          <div>
            <span>{`Despesas`}</span>
            <span>{": "}</span>
            <span>{`${new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(payload[0].value)}`}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer height={height}>
      {state.loading ? (
        <Skeleton className={`w-full h-[${height}px]`} />
      ) : (
        <AreaChart width={600} height={300} data={formulateChartData()}>
          <CartesianGrid
            stroke={`hsl(${
              theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird
            })`}
            strokeDasharray="1 1"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{
              fill: mode === "dark" ? "#cbd5e1" : "#64748b",
              fontSize: 12,
            }}
            tickLine={false}
            stroke={`hsl(${
              theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird
            })`}
            axisLine={false}
          />
          <YAxis
            tick={{
              fill: mode === "dark" ? "#cbd5e1" : "#64748b",
              fontSize: 12,
            }}
            tickLine={false}
            stroke={`hsl(${
              theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird
            })`}
            axisLine={false}
          />
          <Tooltip content={CustomTooltip} />

          <Area
            type="monotone"
            dataKey="expense"
            stackId="1"
            stroke={`hsl(${
              theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive
            })`}
            dot={true}
            strokeWidth={2}
            fill="var(--theme-warning)"
            style={
              {
                opacity: 0.5,
                "--theme-warning": `hsl(${
                  theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive
                })`,
              } as React.CSSProperties
            }
          />
          <Area
            type="monotone"
            dataKey="receipt"
            stackId="1"
            stroke={`hsl(${
              theme?.cssVars[mode === "dark" ? "dark" : "light"].success
            })`}
            dot={true}
            strokeWidth={2}
            fill="var(--theme-success)"
            style={
              {
                opacity: 0.5,
                "--theme-success": `hsl(${
                  theme?.cssVars[mode === "dark" ? "dark" : "light"].success
                })`,
              } as React.CSSProperties
            }
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}
