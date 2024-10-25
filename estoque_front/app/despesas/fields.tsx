import { AutoFormInitializer } from "@/components/ui/AutoForm/Types/AutoFormTypes";
import DateTime from "@/lib/DateTime";
import { moneyMask, timeMask } from "@/lib/masks";
import { Expense } from "@/types/Expense";

export const getFields = (
  defaultValues: Expense | null = null
): AutoFormInitializer => [
  {
    id: "title",
    name: "title",
    label: "Título *",
    value: defaultValues?.title ?? "",
  },
  {
    id: "value",
    name: "value",
    label: "Valor *",
    mask: moneyMask,
    value: defaultValues?.value
      ? moneyMask(defaultValues.value.toFixed(2))
      : "",
  },
  {
    id: "date",
    name: "date",
    label: "Data *",
    type: "date",
    value: (new DateTime(defaultValues?.created_at ?? null)).format("YYYY-MM-DD"),
  },
  {
    id: "time",
    name: "time",
    label: "Hora *",
    type: "time",
    value: (new DateTime(defaultValues?.created_at ?? null)).format("HH:mm"),
  },
  {
    id: "description",
    name: "description",
    label: "Descrição",
    value: defaultValues?.description ?? "",
  },
];
