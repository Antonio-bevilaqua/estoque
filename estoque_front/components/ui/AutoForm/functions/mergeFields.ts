import { struct } from "@/lib/type";
import { AutoFormFields, FieldValue } from "../Types/AutoFormTypes";
import { validateArrayField, validateField, validateValue } from "./validation";
import AutoFile from "@/lib/FileHandler/AutoFile";

export const mergeComposedField = (
  fields: AutoFormFields[],
  name: string,
  value: FieldValue,
  index: number
): AutoFormFields[] | null => {
  if (typeof fields[index][name] === "undefined") {
    return null;
  }
  let newFields = [...fields];
  let newData = [];
  for (let fields of newFields) {
    newData.push(mergeField(fields, name, value));
  }

  return newData;
};

export const mergeField = (
  fields: AutoFormFields,
  name: string,
  value: FieldValue
): AutoFormFields | null => {
  if (typeof fields[name] === "undefined") {
    return null;
  }

  let newFields = { ...fields };
  let newValue = value;
  if (typeof newFields[name].mask === "function") {
    newValue = newFields[name].mask(value);
  }

  newFields[name].value = newValue;

  let validation = validateField(newFields[name], newFields);

  newFields[name].error = validation.error;
  newFields[name].errorMessage = validation.errorMessage;

  if (typeof newFields[name].hook === "function") {
    newFields[name].hook(newFields[name]);
  }

  return newFields;
};

export const mergeArrayField = (
  fields: AutoFormFields,
  name: string,
  value: FieldValue,
  index: number
): AutoFormFields | null => {
  if (typeof fields[name] === "undefined") {
    return null;
  }

  let newFields = { ...fields };
  let newValue = value;
  if (typeof newFields[name].mask === "function") {
    newValue = newFields[name].mask(value);
  }
  newFields[name].value[index] = newValue;

  let validation = validateValue(newFields[name].value[index], newFields[name].validations, newFields);

  (newFields[name].error as boolean[])[index] = validation.error;
  (newFields[name].errorMessage as string[])[index] = validation.errorMessage;

  if (typeof newFields[name].hook === "function") {
    newFields[name].hook(newFields[name]);
  }

  return newFields;
};

export const mergeComposedMultipleValues = (
  fields: AutoFormFields[],
  values: {
    [key: string]: FieldValue;
  },
  index: number
): AutoFormFields[] | null => {
  let newFields = [...fields];

  newFields[index] = mergeMultipleValues(newFields[index], values);

  return newFields;
};

export const mergeMultipleValues = (
  fields: AutoFormFields,
  values: {
    [key: string]: FieldValue;
  }
): AutoFormFields | null => {
  let newFields: struct = {};

  for (let name in fields) {
    newFields[name] = { ...fields[name] };
  }

  for (let name in values) {
    if (typeof fields[name] === "undefined") {
      continue;
    }

    let newValue = values[name];
    if (typeof newFields[name].mask === "function") {
      newValue = newFields[name].mask(newValue);
    }

    newFields[name].value = newValue;
    let validation = validateField(newFields[name], newFields);
    newFields[name].error = validation.error;
    newFields[name].errorMessage = validation.errorMessage;

    if (typeof newFields[name].hook === "function") {
      newFields[name].hook(newFields[name]);
    }
  }
  return newFields;
};
