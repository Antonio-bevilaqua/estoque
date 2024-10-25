import React, { ReactNode, useContext } from "react";
import { AutoFormContext } from "../Context/AutoFormProvider";
import { AutoFormFieldRender, FieldValue } from "../Types/AutoFormTypes";
import { cn } from "@/lib/utils";

const AutoField = ({
  name,
  render,
  index = null,
  onChange = null,
  className = "",
}: {
  name: string;
  render: (props: AutoFormFieldRender) => ReactNode;
  index?: number;
  onChange?: (value: FieldValue) => any | null;
  className?: string;
}) => {
  const { fields, setValue, setArrayValue } = useContext(AutoFormContext);

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      fields[evt.target.name].type === "checkbox" ||
      fields[evt.target.name].type === "radio"
    ) {
      let values = fields[evt.target.name].value as number[];
      return saveValue(evt.target.name, evt.target.checked);
    }

    if (fields[evt.target.name].type === "file") {
      let value =
        evt.target.files.length === 1 ? evt.target.files[0] : evt.target.files;
      return saveValue(evt.target.name, value);
    }

    saveValue(evt.target.name, evt.target.value);
  };

  const saveValue = (name: string, value: any) => {
    let changedInput =
      index !== null
        ? setArrayValue(name, value, index)
        : setValue(name, value);
    if (typeof onChange === "function") {
      onChange(changedInput.value);
    }
    return;
  };

  const getFieldProps = () => {
    let props = {
      ...fields[name],
      value: index !== null ? fields[name].value[index] : fields[name].value,
      name: name,
      onChange: changeHandler,
      multiple: fields[name]?.multiple ?? false,
    };
    delete props.mask;
    delete props.error;
    delete props.errorMessage;
    delete props.mapValue;
    delete props.validations;
    delete props.render;
    return props;
  };

  return (
    <div className={cn("w-full md:min-w-[250px]", className)}>
      {render({
        field: { ...getFieldProps() },
        error:
          index !== null
            ? (fields[name].error as boolean[])[index]
            : (fields[name].error as boolean),
        errorMessage:
          index !== null
            ? fields[name].errorMessage[index]
            : (fields[name].errorMessage as string),
      })}
    </div>
  );
};

export default AutoField;
