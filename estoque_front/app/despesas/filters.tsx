import { Filters } from "@/components/ui/AutoTable/types/TableTypes";

export const filters: Filters = {
  id: {
    label: "ID",
    mapVal: (value: any) => {
      return `#${value}`;
    },
  },
  titulo: {
    label: "Título",
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
};
