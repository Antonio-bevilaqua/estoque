import { idGenerator } from "@/lib/id-generator";
import { AutoFormInitializer } from "../Types/AutoFormTypes";
import { struct } from "@/lib/type";

export const getFormComposerFields = (
  fieldInitializers: AutoFormInitializer[]
) => {
  let fieldArray = [];
  for (let autoFormFields of fieldInitializers) {
    fieldArray.push(getFormInitialFields(autoFormFields));
  }
  return fieldArray;
};

export const getFormInitialFields = (autoFormFields: AutoFormInitializer) => {
  let initialFields: struct = {};
  for (let autoFormField of autoFormFields) {
    initialFields[autoFormField.name] = {
      ...autoFormField,
      value: autoFormField.value ?? "",
      id: autoFormField.id ?? idGenerator(),
      type: autoFormField.type ?? "text",
      error: !autoFormField.value || autoFormField.value.constructor !== Array ? false : [false],
      validations: autoFormField.validations ?? [],
      errorMessage: !autoFormField.value || autoFormField.value.constructor !== Array ? "" : [""],
      mask: autoFormField.mask ?? null,
      hook: autoFormField.hook ?? null,
      mapValue: autoFormField.mapValue ?? null,
      multiple: autoFormField.multiple ?? false,
    };
  }
  return initialFields;
};
