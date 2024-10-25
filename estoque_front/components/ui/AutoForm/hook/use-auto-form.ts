import { useContext, useEffect } from "react";
import { AutoFormContext } from "../Context/AutoFormProvider";
import {
  AutoFormField,
  AutoFormFields,
  AutoFormInitializer,
  AutoFormInitializerField,
  FieldValue,
} from "../Types/AutoFormTypes";
import { getFormInitialFields } from "../functions/initialize";
import { mergeField, mergeMultipleValues } from "../functions/mergeFields";

export default function useAutoForm(onChange: Function | null = null) {
  const { fields, setFields, setValue, setValues } =
    useContext(AutoFormContext);

  const addFields = (autoFormFields: AutoFormInitializer) =>
    setFields((actualFields) => ({
      ...actualFields,
      ...getFormInitialFields(autoFormFields),
    }));

  const addField = (field: AutoFormInitializerField) =>
    setFields((actualFields) => ({
      ...actualFields,
      ...getFormInitialFields([field]),
    }));

  const changeField = (key: string, field: AutoFormField) =>
    setFields((actualFields) => ({
      ...actualFields,
      [key]: { ...field },
    }));

  const addFieldArrayValue = (key: string, value: any = "") =>
    setFields((actualFields) => ({
      ...actualFields,
      [key]: {
        ...actualFields[key],
        value: [...actualFields[key].value, value],
        error: [...(actualFields[key].error as boolean[]), false],
        errorMessage: [...(actualFields[key].errorMessage as string[]), ""],
      },
    }));

  const removeFieldArrayIndex = (key: string, index: number) =>
    setFields((actualFields) => ({
      ...actualFields,
      [key]: {
        ...actualFields[key],
        value: actualFields[key].value.filter(
          (value: any, idx: number) => idx !== index
        ),
        error: (actualFields[key].error as boolean[]).filter(
          (_: boolean, idx: number) => idx !== index
        ),
        errorMessage: (actualFields[key].errorMessage as string[]).filter(
          (_: string, idx: number) => idx !== index
        ),
      },
    }));

  useEffect(() => {
    if (typeof onChange === "function") onChange(fields);
  }, [fields]);

  return {
    fields,
    addFields,
    addField,
    changeField,
    addFieldArrayValue,
    removeFieldArrayIndex,
    setValue,
    setValues,
  };
}
