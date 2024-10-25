import { ReactNode } from "react";
import AutoFormProvider from "../../AutoForm/Context/AutoFormProvider";
import useAutoTable from "../hook/useAutoTable";

export default function AutoFilter({
  children,
}: {
  children: ReactNode;
}) {
  const { filters, filtersApplied } = useAutoTable();
  const getFields = () => {
    return Object.keys(filters).map((key: string) => {
      return {
        type: filters[key].type ?? "text",
        id: key,
        name: key,
        value: filtersApplied[key]?.value ?? "",
        ...filters[key],
      };
    });
  };

  return (
    <AutoFormProvider autoFormFields={getFields()}>{children}</AutoFormProvider>
  );
}
