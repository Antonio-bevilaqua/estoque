import React, { useContext, useRef } from "react";
import { Input } from "../../input";
import { AutoFormContext } from "../Context/AutoFormProvider";
import { AutoFileInputProps } from "./types";
import FileHandler from "@/lib/FileHandler/FileHandler";
import AutoFile from "@/lib/FileHandler/AutoFile";

export default function AutoFileInput({
  name,
  render,
  className = "",
}: AutoFileInputProps) {
  const ref = useRef();
  const { fields, setValue } = useContext(AutoFormContext);

  const toggle = () => {
    if (ref.current) {
      (ref.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileHandler = new FileHandler();
    fileHandler.addFiles(e.target.files);

    if (fields[name].multiple) {
      let newValues = fields[name].value
        ? (fields[name].value as AutoFile[])
        : [];
      newValues = [...newValues, ...fileHandler.get()];
      setValue(e.target.name, newValues);
    } else {
      setValue(e.target.name, fileHandler.get()[0]);
    }

    if (ref.current) {
      (ref.current as HTMLInputElement).value = "";
    }
  };

  const getFieldProps = () => {
    let props = {
      ...fields[name],
      name: name,
      multiple: fields[name]?.multiple ?? false,
    };
    delete props.value;
    delete props.mask;
    delete props.error;
    delete props.errorMessage;
    delete props.mapValue;
    delete props.validations;
    return props;
  };

  return (
    <div className={className}>
      <Input
        ref={ref}
        className={`absolute left-[-110vw] w-0 h-0 opacity-0`}
        onChange={handleFileChange}
        {...getFieldProps()}
      />
      {render({
        toggle: toggle,
        error: (fields[name].error as boolean),
        errorMessage: (fields[name].errorMessage as string),
        totalFiles: fields[name].value
          ? fields[name].value.constructor === Array
            ? fields[name].value.length
            : fields[name].value instanceof AutoFile
            ? 1
            : 0
          : 0,
      })}
    </div>
  );
}
