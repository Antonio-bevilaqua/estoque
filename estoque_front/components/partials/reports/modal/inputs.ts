import { AutoFormInitializer } from "@/components/ui/AutoForm/Types/AutoFormTypes";
import { finalDate, required } from "@/lib/validations";

export const inputs: AutoFormInitializer = [
  {
    name: "initial_date",
    label: "Data Inicial:",
    type: "date",
    validations: [required],
  },
  {
    name: "final_date",
    label: "Data Final:",
    type: "date",
    validations: [required, finalDate("final_date")],
  },
];
