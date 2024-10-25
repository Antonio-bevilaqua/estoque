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
  subtotal_min: {
    label: "Subtotal Mínimo",
    type: "text",
  },
  subtotal_max: {
    label: "Subtotal Máximo",
    type: "text",
  },
  desconto_min: {
    label: "Desconto Mínimo",
    type: "text",
  },
  desconto_max: {
    label: "Desconto Máximo",
    type: "text",
  },
  total_min: {
    label: "Total Mínimo",
    type: "text",
  },
  total_max: {
    label: "Total Máximo",
    type: "text",
  },
  produto: {
    label: "Produto",
    type: "text",
  },
  observacoes: {
    label: "Observações",
    type: "text",
  },
};
