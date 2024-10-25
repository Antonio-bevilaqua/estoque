import { Filters } from "@/components/ui/AutoTable/types/TableTypes";

export const filters: Filters = {
  id: {
    label: "ID",
    mapVal: (value: any) => {
      return `#${value}`;
    },
  },
  nome: {
    label: "Nome",
    type: "text",
  },
  min_valor: {
    label: "Valor Mínimo",
    type: "text",
  },
  max_valor: {
    label: "Valor Máximo",
    type: "text",
  },
  min_estoque: {
    label: "Estoque Mínimo",
    type: "number",
  },
  max_estoque: {
    label: "Estoque Máximo",
    type: "number",
  },
  min_vendas: {
    label: "Vendas Mínimas",
    type: "number",
  },
  max_vendas: {
    label: "Vendas Máximas",
    type: "number",
  },
};

