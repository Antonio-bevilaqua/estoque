import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import { AutoFormContext } from "../../Context/AutoFormProvider";
import AutoFile from "@/lib/FileHandler/AutoFile";
import AutoFileCard from "./Card/AutoFileCard";

export interface AutoFileInputPreviewerProps {
  name: string;
  className?: string;
}

export default function AutoFileInputPreviewer({
  name,
  className = "",
}: AutoFileInputPreviewerProps) {
  const { fields, setValue } = useContext(AutoFormContext);

  const data: AutoFile[] = fields[name].value
    ? fields[name].value.constructor === Array
      ? (fields[name].value as AutoFile[])
      : [fields[name].value as AutoFile]
    : null;

  const removeData = (key: number) => {
    if (fields[name].value.constructor !== Array) {
      return setValue(name, null);
    }

    let newValue = [];
    const length = (fields[name].value as AutoFile[]).length;
    for (let i = 0; i < length; i++) {
      if (i !== key) {
        newValue.push(fields[name].value[i]);
      }
    }

    return setValue(name, newValue);
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {data.map((autoFile: AutoFile, index) => (
        <AutoFileCard
          key={`auto_file_${fields[name].id}_${index}`}
          file={autoFile.blob}
          name={autoFile.name}
          size={autoFile.size}
          onRemove={() => removeData(index)}
        />
      ))}
    </div>
  );
}
