import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import { AutoFormContext } from "../../Context/AutoFormProvider";
import AutoFile from "@/lib/FileHandler/AutoFile";
import AutoFileCard from "../../AutoFileInput/Previewer/Card/AutoFileCard";

export default function AutoComposedFileInputPreviewer({
  name,
  index,
  className = "",
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const { composedFields, setComposedValue } = useContext(AutoFormContext);

  const data = composedFields[index][name].value
    ? composedFields[index][name].value.constructor === Array
      ? composedFields[index][name].value
      : [composedFields[index][name].value]
    : null;

  const removeData = (key: number) => {
    if (composedFields[index][name].value.constructor !== Array) {
      return setComposedValue(name, null, index);
    }

    let newValue = [];
    const length = (composedFields[index][name].value as AutoFile[]).length;
    for (let i = 0; i < length; i++) {
      if (i !== key) {
        newValue.push(composedFields[index][name].value[i]);
      }
    }

    return setComposedValue(name, newValue, index);
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {(data as AutoFile[]).map((autoFile: AutoFile, index) => (
        <AutoFileCard
          key={`auto_file_${composedFields[index][name].id}_${index}`}
          file={autoFile.blob}
          name={autoFile.name}
          size={autoFile.size}
          onRemove={() => removeData(index)}
        />
      ))}
    </div>
  );
}
