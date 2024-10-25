"use client";

import Select from "react-select";

import { cn } from "@/lib/utils";
import { useContext, useRef } from "react";
import { Label } from "../../label";
import { AutoComposedSelectProps } from "../AutoSelect/AutoSelect";
import { AutoFormContext } from "../Context/AutoFormProvider";
import { selectStyles } from "../utils/selectStyles";

const AutoComposedSelect = ({
  name,
  index,
  label = null,
  changeHandler = null,
  overrideSave = null,
  className = "",
  labelClassName = "",
  placeholder = "",
  ...props
}: AutoComposedSelectProps) => {
  const container = useRef();
  const { composedFields, setComposedValue } = useContext(AutoFormContext);

  const saveValue = (value: any) => {
    if (typeof overrideSave === "function") {
      return overrideSave(value);
    }
    let changedInput = setComposedValue(name, value, index);
    if (typeof changeHandler === "function") {
      changeHandler(changedInput.value.toString());
    }
    return;
  };

  return (
    <div ref={container} className={cn("min-w-[250px]", className)}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <Select
        className="react-select"
        classNamePrefix="select"
        value={composedFields[index][name].value}
        onChange={saveValue}
        styles={selectStyles}
        {...props}
      />
      {composedFields[index][name].error && (
        <Label className="text-red-500 text-sm" htmlFor="proccess_type">
          {composedFields[index][name].errorMessage}
        </Label>
      )}
    </div>
  );
};

export default AutoComposedSelect;
