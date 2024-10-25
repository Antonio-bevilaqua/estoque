import React, { ReactNode, useContext } from "react";
import { AutoFormContext } from "../Context/AutoFormProvider";
import {
  AutoFormData,
  AutoFormFieldRender,
  FieldValue,
} from "../Types/AutoFormTypes";
import { cn } from "@/lib/utils";

const AutoComposedField = ({
  name,
  index,
  render,
  onChange = undefined,
  className = "",
}: {
  name: string;
  index: number;
  render: (props: AutoFormFieldRender) => ReactNode;
  onChange?: (value: FieldValue) => any;
  className?: string;
}) => {
  const { composedFields, setComposedValue } = useContext(
    AutoFormContext
  ) as AutoFormData;

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      composedFields[index][evt.target.name].type === "checkbox" ||
      composedFields[index][evt.target.name].type === "radio"
    ) {
      return saveValue(evt.target.name, evt.target.checked);
    }

    if (composedFields[index][evt.target.name].type === "file") {
      let value =
        evt.target.files?.length === 1 ? evt.target.files[0] : evt.target.files;
      return saveValue(evt.target.name, value);
    }

    saveValue(evt.target.name, evt.target.value);
  };

  const saveValue = (name: string, value: any) => {
    let changedInput = setComposedValue(name, value, index);
    if (typeof onChange === "function") {
      onChange(changedInput.value);
    }
    return;
  };

  const getFieldProps = () => {
    let props = {
      ...composedFields[index][name],
      name: name,
      onChange: changeHandler,
      multiple: composedFields[index][name]?.multiple ?? false,
    };
    delete props.mask;
    delete props.error;
    delete props.errorMessage;
    delete props.mapValue;
    delete props.validations;
    return props;
  };

  return (
    <div className={cn("min-w-[250px]", className)}>
      {render({
        field: { ...getFieldProps() },
        error: (composedFields[index][name].error as boolean),
        errorMessage: (composedFields[index][name].errorMessage as string),
      })}
    </div>
  );
};

export default AutoComposedField;
