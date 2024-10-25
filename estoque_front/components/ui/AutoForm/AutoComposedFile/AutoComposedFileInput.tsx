import FileHandler from "@/lib/FileHandler/FileHandler";
import React, { useContext, useRef } from "react";
import AutoFile from "@/lib/FileHandler/AutoFile";
import { Input } from "../../input";
import { AutoFormContext } from "../Context/AutoFormProvider";
import { AutoComposedFileInputProps } from "../AutoFileInput/types";

export default function AutoComposedFileInput({
  name,
  index,
  render,
  className = "",
}: AutoComposedFileInputProps) {
  const ref = useRef();
  const { composedFields, setComposedValue } = useContext(AutoFormContext);

  const toggle = () => {
    if (ref.current) {
      (ref.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileHandler = new FileHandler();
    fileHandler.addFiles(e.target.files);

    if (composedFields[index][name].multiple) {
      let newValues = composedFields[index][name].value
        ? (composedFields[index][name].value as AutoFile[])
        : [];
      newValues = [...newValues, ...fileHandler.get()];
      setComposedValue(e.target.name, newValues, index);
    } else {
      setComposedValue(e.target.name, fileHandler.get()[0], index);
    }

    if (ref.current) {
      (ref.current as HTMLInputElement).value = "";
    }
  };

  const getFieldProps = () => {
    let props = {
      ...composedFields[index][name],
      name: name,
      multiple: composedFields[index][name]?.multiple ?? false,
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
        error: composedFields[index][name].error as boolean,
        errorMessage: composedFields[index][name].errorMessage as string,
        totalFiles:
          composedFields[index][name].value.constructor === Array
            ? composedFields[index][name].value.length
            : composedFields[index][name].value instanceof AutoFile
            ? 1
            : 0,
      })}
    </div>
  );
}
