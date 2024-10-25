import { HTMLInputTypeAttribute, ReactNode } from "react";
import AutoFile from "@/lib/FileHandler/AutoFile";
import { AutoSelectOption } from "../AutoSelect/AutoSelect";
import { SetState, struct } from "@/lib/type";

export type FieldValue = any;

export type Validation = {
  validate: (value: any, fields: AutoFormFields) => boolean;
  messageOnError: string;
};

export type AutoFormField = {
  name: string;
  value: FieldValue;
  type: string;
  id: string | null;
  error: boolean | boolean[];
  validations: Array<Validation>;
  errorMessage: string | string[];
  mask: Function | null;
  hook: Function | null;
  mapValue: Function | null;
  multiple?: boolean | null;
  render?: (field: AutoFormInitializerField) => ReactNode | string;
  [x: string]: any;
};
export type AutoFormData = {
  fields: struct<AutoFormField>;
  setFields: SetState<struct<AutoFormField>>;
  options: { [k: string]: any[] };
  setOptions: (options: { [k: string]: any[] }) => void;
  composedFields: AutoFormFields[];
  addField: (field: AutoFormInitializerField) => void;
  addFields: (autoFormFields: AutoFormInitializer) => void;
  addComposedFields: (autoFormComposerFields: AutoFormInitializer[]) => void;
  isValid: () => boolean;
  reset: () => void;
  setValue: (name: string, value: FieldValue) => AutoFormField;
  setArrayValue: (
    name: string,
    value: FieldValue,
    index: number
  ) => AutoFormField;
  setValues: (values: { [key: string]: FieldValue }) => {
    [key: string]: AutoFormField;
  };
  setComposedValue: (
    name: string,
    value: FieldValue,
    index: number
  ) => AutoFormField;
  setComposedValues: (
    values: { [key: string]: FieldValue },
    index: number
  ) => AutoFormFields[];
  getValues: () => { [key: string]: FieldValue };
  getFormData: () => FormData;
};

export type AutoFormInitializerField = {
  name: string;
  label?: string;
  id?: string | null;
  type?: HTMLInputTypeAttribute;
  validations?: Array<Validation>;
  mask?: Function | null;
  hook?: Function | null;
  options?: AutoSelectOption[];
  optionsGetter?: () => Promise<AutoSelectOption[]>;
  mapValue?: Function | null;
  value?: FieldValue | undefined;
  multiple?: boolean;
  render?: (field: AutoFormInitializerField) => ReactNode | string;
  [x: string]: any;
};

export type AutoFormInitializer = Array<AutoFormInitializerField>;

export interface AutoFormFieldRender {
  field: AutoFormField;
  error: boolean;
  errorMessage: string;
}

export interface AutoFormFields {
  [k: string]: AutoFormField;
}
