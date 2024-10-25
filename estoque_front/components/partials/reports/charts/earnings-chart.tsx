"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { hslToHex, hexToRGB } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { Pie } from "react-chartjs-2";
import { useContext } from "react";
import { ReportsContext } from "../provider/Provider";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function EarningsChart({ height = 350 }: { height?: number }) {
  const { state } = useContext(ReportsContext);
  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();

  if (state.loading) return <Skeleton className={`w-full h-[${height}px]`} />;

  const theme = themes.find((theme) => theme.name === config);

  const hslDanger = `hsla(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive
  })`;
  const hslSuccess = `hsla(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].success
  })`;

  const hexSuccess = hslToHex(hslSuccess);
  const hexDanger = hslToHex(hslDanger);
  const data: any = {
    labels: ["Receitas", "Despesas"],
    datasets: [
      {
        label: "Faturamento do Período",
        data: [
          state.report.total_value.toFixed(2),
          state.report.expenses_value.toFixed(2),
        ],
        backgroundColor: [hexToRGB(hexSuccess, 0.5), hexToRGB(hexDanger, 0.5)],
      },
    ],
  };
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: `hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-5">
      <Pie options={options} data={data} height={height} />
    </div>
  );
}
