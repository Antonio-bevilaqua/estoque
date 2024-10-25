import { struct } from "@/lib/type";
import FormValues from "../FormValue/FormValues";
import {
  AutoFormField,
  AutoFormFields,
  FieldValue,
} from "../Types/AutoFormTypes";

type Value = {
  [key: string]: FieldValue;
};

type Values = { [key: string]: any };

export const mergeValues = (
  fields: AutoFormFields,
  fieldArray: AutoFormFields[]
): Value => {
  let data: Values = { ...getFieldValues(fields) };

  if (fieldArray.length > 0) {
    data["adicionais"] = [];
    for (let fields of fieldArray) {
      data["adicionais"].push(getFieldValues(fields));
    }
  }
  return data;
};

export const getFieldValues = (fields: AutoFormFields): Value => {
  let data: struct = {};
  for (let name in fields) {
    if (isFieldSkippable(fields[name])) continue;
    let value = fields[name].value;
    if (typeof fields[name].mapValue === "function") {
      value = fields[name].mapValue(value);
    }
    data[name] = value;
  }
  return data;
};

export const mergeFormData = (
  fields: AutoFormFields,
  fieldArray: AutoFormFields[]
): FormData => {
  let initialValues = new FormValues(fields);
  let formData = initialValues.get();

  for (let fields of fieldArray) {
    let fieldData: struct = {};
    for (let name in fields) {
      if (isFieldSkippable(fields[name])) continue;

      let value = fields[name].value;
      if (typeof fields[name].mapValue === "function") {
        value = fields[name].mapValue(value);
      }
      let fieldName = name.includes("[]") ? name : name + "[]";
      fieldData[fieldName] = value;
    }
    let formValues = new FormValues(fields, formData);

    formData = formValues.get();
  }

  return formData;
};

export const isFieldSkippable = (field: AutoFormField) => {
  return field.type === "manager" || field.type === "skip";
};

export const resetFields = (fields: AutoFormFields): AutoFormFields => {
  let newFields: AutoFormFields = { ...fields };

  for (let name in fields) {
    newFields[name].value = "";
  }

  return newFields;
};

export const resetComposedFields = (
  fieldArray: AutoFormFields[]
): AutoFormFields[] => {
  let newFields = [];

  for (let field of fieldArray) {
    newFields.push(resetFields(field));
  }

  return newFields;
};
