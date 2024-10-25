import { UploadCloudIcon } from "lucide-react";
import AutoFile from "../AutoFile/AutoFile";
import AutoSelect from "../AutoSelect/AutoSelect";
import AutoText from "../AutoText/AutoText";
import { AutoFormInitializerField } from "../Types/AutoFormTypes";
import AutoSwitch from "../AutoSwitch/AutoSwitch";
import AutoPassword from "../AutoPassword/AutoPassword";
import FieldManager from "../FieldManager/FieldManager";
import { Icon } from "@iconify/react";
import { struct } from "@/lib/type";

export default function AutoInput({
  field,
  inputProps = {},
}: {
  field: AutoFormInitializerField;
  inputProps?: struct;
}) {
  if (typeof field.render === "function") return <>{field.render(field)}</>;

  if (field.type === "manager")
    return (
      <FieldManager
        fields={field.fields ?? []}
        label={field.label}
        defaultValue={field.defaultValue ?? ""}
        buttonText={field.buttonText ?? "Adicionar"}
        buttonIcon={
          field.buttonText ?? (
            <Icon
              icon="heroicons:plus-small-20-solid"
              className="h-5 w-5 ml-1"
            />
          )
        }
      />
    );

  if (field.type === "switch") return <AutoSwitch name={field.name} />;

  if (field.type === "select") {
    if (field.value && field.value.constructor === Array) {
      return (
        <>
          {field.value.map((_: any, index: number) => (
            <AutoSelect
              key={"array_field_" + field.name + "_" + index}
              name={field.name}
              label={field.label ?? ""}
              options={field.options}
              index={index}
              {...inputProps}
            />
          ))}
        </>
      );
    }

    return (
      <AutoSelect
        name={field.name}
        label={field.label ?? ""}
        options={field.options}
        {...inputProps}
      />
    );
  }

  if (field.type === "file")
    return (
      <AutoFile name={field.name} label={field.label ?? ""}>
        <UploadCloudIcon className="mr-2" />{" "}
        {`${field.multiple ? "Escolher Arquivos" : "Escolher Arquivo"}`}
      </AutoFile>
    );

  if (field.type === "password") {
    if (field.value && field.value.constructor === Array) {
      return (
        <>
          {field.value.map((_: any, index: number) => (
            <AutoPassword
              key={"array_field_" + field.name + "_" + index}
              name={field.name}
              label={field.label ?? ""}
              inputProps={inputProps}
            />
          ))}
        </>
      );
    }

    return (
      <AutoPassword
        name={field.name}
        label={field.label ?? ""}
        inputProps={inputProps}
      />
    );
  }

  if (field.value && field.value.constructor === Array) {
    return (
      <>
        {field.value.map((_: any, index: number) => (
          <AutoText
            key={"array_field_" + field.name + "_" + index}
            name={field.name}
            label={field.label ?? ""}
            inputProps={inputProps}
          />
        ))}
      </>
    );
  }

  return <AutoText name={field.name} label={field.label ?? ""} />;
}
