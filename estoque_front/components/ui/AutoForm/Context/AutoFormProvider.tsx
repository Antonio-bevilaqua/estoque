import React, { ReactNode, useState } from "react";
import {
  AutoFormData,
  AutoFormField,
  AutoFormFields,
  AutoFormInitializer,
  AutoFormInitializerField,
  FieldValue,
} from "../Types/AutoFormTypes";
import {
  getFormComposerFields,
  getFormInitialFields,
} from "../functions/initialize";
import {
  mergeArrayField,
  mergeComposedField,
  mergeComposedMultipleValues,
  mergeField,
  mergeMultipleValues,
} from "../functions/mergeFields";
import {
  validateComposedFields,
  validateFields,
} from "../functions/validation";
import {
  mergeFormData,
  mergeValues,
  resetComposedFields,
  resetFields,
} from "../functions/values";

export const AutoFormContext = React.createContext<AutoFormData | null>(null);

const AutoFormProvider = ({
  children,
  autoFormFields,
  autoFormComposerFields = [],
}: {
  children: ReactNode;
  autoFormFields: AutoFormInitializer;
  autoFormComposerFields?: AutoFormInitializer[];
}) => {
  const [fields, setFields] = useState<AutoFormFields>({
    ...getFormInitialFields(autoFormFields),
  });
  const [composedFields, setComposedFields] = useState<AutoFormFields[]>([
    ...getFormComposerFields(autoFormComposerFields),
  ]);
  const [options, setOptions] = useState<{ [key: string]: any[] }>({});

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

  const addComposedFields = (autoFormComposerFields: AutoFormInitializer[]) => {
    setComposedFields([
      ...composedFields,
      ...getFormComposerFields(autoFormComposerFields),
    ]);
  };

  const isValid = () => {
    if (areFieldsValid() && areComposedValid()) {
      return true;
    }

    return false;
  };

  const areFieldsValid = () => {
    if (Object.keys(fields).length === 0) return true;

    let { valid, validatedFields } = validateFields({ ...fields });
    setFields(validatedFields);
    return valid;
  };

  const areComposedValid = () => {
    if (composedFields.length === 0) return true;

    let { valid, validatedFieldArray } = validateComposedFields([
      ...composedFields,
    ]);
    setComposedFields([...validatedFieldArray]);
    return valid;
  };

  const setValue = (name: string, value: FieldValue) => {
    let returnValue: AutoFormField = null;
    setFields((actualFields) => {
      let newFields = mergeField(actualFields, name, value);
      if (!newFields) {
        return actualFields;
      }

      returnValue = newFields[name];
      return newFields;
    });
    return returnValue;
  };

  const setComposedValue = (name: string, value: FieldValue, index: number) => {
    let newFields = mergeComposedField(composedFields, name, value, index);

    setComposedFields(newFields);
    return newFields[index][name];
  };

  const setValues = (values: { [key: string]: FieldValue }): AutoFormFields => {
    let returnValue: AutoFormFields = null;
    setFields((actualFields) => {
      let newFields = mergeMultipleValues(actualFields, values);
      if (!newFields) {
        return actualFields;
      }

      returnValue = newFields;
      return newFields;
    });
    return returnValue;
  };

  const setArrayValue = (name: string, value: FieldValue, index: number) => {
    let returnValue: AutoFormField = null;
    setFields((actualFields) => {
      let newFields = mergeArrayField(actualFields, name, value, index);
      if (!newFields) {
        return actualFields;
      }

      returnValue = newFields[name];
      return { ...newFields };
    });
    return returnValue;
  };

  const setComposedValues = (
    values: { [key: string]: FieldValue },
    index: number
  ): AutoFormFields[] => {
    let newFields = mergeComposedMultipleValues(composedFields, values, index);
    setComposedFields(newFields);
    return newFields;
  };

  return (
    <AutoFormContext.Provider
      value={{
        options,
        fields,
        setFields,
        composedFields,
        setOptions,
        addField,
        addFields,
        addComposedFields,
        reset: () => {
          setFields(resetFields(fields));
          setComposedFields(resetComposedFields(composedFields));
        },
        isValid,
        setValue,
        setArrayValue,
        setValues,
        setComposedValue,
        setComposedValues,
        getValues: () => mergeValues(fields, composedFields),
        getFormData: () => mergeFormData(fields, composedFields),
      }}
    >
      {children}
    </AutoFormContext.Provider>
  );
};

export default AutoFormProvider;
