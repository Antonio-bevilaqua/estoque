import React, { ReactNode, useContext } from "react";
import { AutoFormContext } from "../Context/AutoFormProvider";
import { AutoFormInitializer } from "../Types/AutoFormTypes";
import { Icon } from "@iconify/react";
import AutoFile from "@/lib/FileHandler/AutoFile";
import { Label } from "../../label";
import { Button } from "../../button";
import { struct } from "@/lib/type";

export default function FieldManager({
  fields,
  label = null,
  defaultValue = "",
  buttonText = "Adicionar",
  buttonIcon = (
    <Icon icon="heroicons:plus-small-20-solid" className="h-5 w-5 ml-1" />
  ),
}: {
  fields: AutoFormInitializer;
  label?: string;
  buttonIcon?: ReactNode;
  buttonText?: string;
  defaultValue?: string | number | struct | null;
}) {
  const ctx = useContext(AutoFormContext);
  const onButtonClick = () => {
    let fieldsToAdd = [];
    for (let field of fields) {
      if (field.name in ctx.fields) {
        let actualValues = ctx.fields[field.name].value;
        actualValues.push(defaultValue);
        ctx.setValue(field.name, actualValues);
      }

      field.value = [defaultValue];
      fieldsToAdd.push(field);
    }

    ctx.addFields(fieldsToAdd);
  };

  return (
    <div className="w-full flex gap-2 md:min-w-[250px]">
      {label && <Label>{label}</Label>}
      <Button onClick={onButtonClick}>
        {buttonText} {buttonIcon}
      </Button>
    </div>
  );
}
