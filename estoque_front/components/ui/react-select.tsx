import { selectStyles } from "@/components/ui/AutoForm/utils/selectStyles";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

export default function ReactSelect({
  id,
  label = "",
  errorMessage = "",
  error = false,
  ...props
}: StateManagerProps & {
  id: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}) {
  const { theme } = useTheme();
  const styles = {
    ...selectStyles,
    singleValue: (base: any) => ({
      ...base,
      color:
        theme === "dark"
          ? "hsl(214.3 31.8% 91.4%)!important"
          : "hsl(215.4 16.3% 46.9%)!important",
      fontWeight: "normal!important",
      fontSize: "0.875rem!important",
    }),
    input: (base: any) => ({
      ...base,
      color:
        theme === "dark"
          ? "hsl(214.3 31.8% 91.4%)!important"
          : "hsl(215.4 16.3% 46.9%)!important",
    }),
    control: (baseStyles: any, actualState: any) => ({
      ...baseStyles,
      boxShadow: "0 !important",
      outline: "0 !important",
      borderColor: error
        ? theme === "dark"
          ? "#ef4444!important"
          : "#ef4444!important"
        : actualState.isFocused
        ? theme === "dark"
          ? "hsl(142.1 70.6% 45.3%)!important"
          : "hsl(142.1 76.2% 36.3%)!important"
        : theme === "dark"
        ? "hsl(215.4 16.3% 46.9%)!important"
        : "hsl(214.3 31.8% 91.4%)!important",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor:
        theme === "dark"
          ? "hsl(20 14.3% 4.1%)!important"
          : "hsl(0 0% 100%)!important",
      border: "1px solid",
      borderColor:
        theme === "dark"
          ? "hsl(215.4 16.3% 46.9%)!important"
          : "hsl(214.3 31.8% 91.4%)!important",
    }),
    option: (base: any, state: any) => ({
      ...base,
      cursor: "pointer",
      color:
        theme === "dark"
          ? "hsl(214.3 31.8% 91.4%)!important"
          : "hsl(215.4 16.3% 46.9%)!important",
      backgroundColor: state.isSelected
        ? theme === "dark"
          ? "hsl(142.1 70.6% 15.3%)!important"
          : "hsl(214.3 31.8% 91.4%)!important"
        : state.isFocused
        ? theme === "dark"
          ? "hsl(142.1 70.6% 7.3%)!important"
          : "hsl(214.3 31.8% 96%)!important"
        : "transparent",
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 999999,
      pointerEvents: "all",
    }),
  };

  return (
    <div className={"min-w-[250px]"}>
      {label && <Label>{label}</Label>}

      <Select
        id={id}
        className="react-select"
        classNamePrefix="select"
        noOptionsMessage={
          props.noOptionsMessage ? props.noOptionsMessage : () => "Sem opções"
        }
        placeholder={props.placeholder ?? "Selecionar..."}
        menuPortalTarget={props.menuPortalTarget ?? document.body}
        styles={props.styles ?? styles}
        {...props}
      />

      {error && (
        <Label className="text-red-500 text-sm" htmlFor={id}>
          {errorMessage}
        </Label>
      )}
    </div>
  );
}
