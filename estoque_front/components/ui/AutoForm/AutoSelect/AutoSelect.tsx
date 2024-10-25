"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AutoFormContext } from "../Context/AutoFormProvider";

import { useTheme } from "next-themes";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import ReactSelect from "../../react-select";
import useOptionsLoader from "./hook/useOptionsLoader";

export interface AutoSelectOption {
  label: string;
  value: string;
}

export interface AutoSelectOptionsProps {
  open: boolean;
  options?: AutoSelectOption[];
  withOptionSearch?: boolean;
  className?: string;
}

export type AutoSelectProps = StateManagerProps & {
  label?: string;
  name: string;
  changeHandler?: (value: string) => any;
  overrideSave?: (value: string) => any;
  className?: string;
  labelClassName?: string;
  options?: AutoSelectOption[];
  loadOptionsReplacing?: boolean;
  optionGroupNumber?: number;
  index?: number | null;
};

export type AutoComposedSelectProps = AutoSelectProps & {
  index: number;
};

const AutoSelect = ({
  name,
  options = null,
  label = null,
  changeHandler = null,
  overrideSave = null,
  className = "",
  labelClassName = "",
  loadOptionsReplacing = false,
  isMulti = false,
  placeholder = "",
  index = null,
  ...props
}: AutoSelectProps) => {
  const { theme } = useTheme();
  const container = useRef();
  const { fields, setValue, setArrayValue } = useContext(AutoFormContext);
  const { getOptions, loading } = useOptionsLoader(fields[name]);
  const [state, setState] = useState({
    options: options ? options : [],
  });
  const actualValue =
    index !== null ? fields[name].value[index] : fields[name].value;

  console.log(fields);

  const saveValue = (value: any) => {
    if (typeof overrideSave === "function") {
      return overrideSave(value.value);
    }
    if (isMulti) return saveMultiple(value.value);

    let changedInput =
      index !== null
        ? setArrayValue(name, value.value, index)
        : setValue(name, value.value);
    if (typeof changeHandler === "function") {
      changeHandler(changedInput.value.toString());
    }
    return;
  };

  const saveMultiple = (value: any) => {
    if (index !== null) return saveMultipleForArray(value);
    let actualValues = [...(fields[name].value as string[])];
    if (actualValues.includes(value)) {
      setValue(
        name,
        actualValues.filter((filterValue: string) => filterValue !== value)
      );
    } else {
      actualValues.push(value);
      setValue(name, actualValues);
    }

    if (typeof changeHandler === "function") {
      changeHandler(value);
    }
  };

  const saveMultipleForArray = (value: any) => {
    let actualValues = [...(fields[name].value as string[])];
    if (actualValues.includes(value)) {
      setArrayValue(
        name,
        actualValues.filter((filterValue: string) => filterValue !== value),
        index
      );
    } else {
      actualValues.push(value);
      setArrayValue(name, actualValues, index);
    }

    if (typeof changeHandler === "function") {
      changeHandler(value);
    }
  };

  useEffect(() => {
    const loadOptions = async () => {
      let data = await getOptions();
      if (data !== null) setState({ ...state, options: data });
    };

    loadOptions();
  }, []);

  useEffect(() => {
    if (options) setState({ options: options });
  }, [options]);

  return (
    <div ref={container} className={className}>
      <ReactSelect
        id={name}
        label={label}
        className="react-select"
        classNamePrefix="select"
        value={state.options.find(
          (option: AutoSelectOption) => option.value === actualValue
        )}
        isLoading={props.isLoading ?? loading}
        loadingMessage={() => "Buscando..."}
        noOptionsMessage={() => "Sem opções"}
        onChange={saveValue}
        options={state.options}
        placeholder={placeholder !== "" ? placeholder : "Selecionar..."}
        menuPortalTarget={document.body}
        error={
          index === null
            ? (fields[name].error as boolean)
            : (fields[name].error as boolean[])[index]
        }
        errorMessage={
          index === null
            ? (fields[name].errorMessage as string)
            : (fields[name].errorMessage as string[])[index]
        }
        {...props}
      />
    </div>
  );
};

export default AutoSelect;
