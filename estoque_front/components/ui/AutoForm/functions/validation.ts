import {
  AutoFormField,
  AutoFormFields,
  Validation,
} from "../Types/AutoFormTypes";

export const validateComposedFields = (
  fieldArray: AutoFormFields[]
): {
  valid: boolean;
  validatedFieldArray: AutoFormFields[];
} => {
  let finalFieldArray = [];
  let formsAreValid = true;
  for (let fields of fieldArray) {
    let { valid, validatedFields } = validateFields(fields);
    formsAreValid = formsAreValid && valid;
    finalFieldArray.push(validatedFields);
  }

  return {
    valid: formsAreValid,
    validatedFieldArray: finalFieldArray,
  };
};

export const validateFields = (
  fields: AutoFormFields
): {
  valid: boolean;
  validatedFields: AutoFormFields;
} => {
  let isFormValid = true;
  let validatedFields = { ...fields };
  for (let name in validatedFields) {
    if (validatedFields[name].value.constructor === Array) {
      let { valid, field } = validateArrayField(
        validatedFields[name],
        validatedFields
      );
      validatedFields[name] = { ...field };
      isFormValid = isFormValid && valid;
      continue;
    }
    let validation = validateField(validatedFields[name], validatedFields);
    isFormValid = isFormValid && !validation.error;
    validatedFields[name].error = validation.error;
    validatedFields[name].errorMessage = validation.errorMessage;
  }

  return {
    valid: isFormValid,
    validatedFields: validatedFields,
  };
};

export const validateArrayField = (
  field: AutoFormField,
  fields: AutoFormFields
): {
  valid: boolean;
  field: AutoFormField;
} => {
  let isFormValid = true;
  for (let i = 0; i < field.value.length; i++) {
    let validation = validateValue(field.value[i], field.validations, fields);
    isFormValid = isFormValid && !validation.error;
    (field.error as boolean[])[i] = validation.error;
    (field.errorMessage as string[])[i] = validation.errorMessage;
  }

  return {
    valid: isFormValid,
    field: field,
  };
};

export const validateField = (
  field: AutoFormField,
  fields: AutoFormFields
): {
  error: boolean;
  errorMessage: string;
} => {
  for (let validation of field.validations) {
    if (!validation.validate(field.value, fields)) {
      return {
        error: true,
        errorMessage: validation.messageOnError,
      };
    }
  }

  return {
    error: false,
    errorMessage: "",
  };
};

export const validateValue = (
  value: any,
  validations: Validation[],
  fields: AutoFormFields
): {
  error: boolean;
  errorMessage: string;
} => {
  for (let validation of validations) {
    if (!validation.validate(value, fields)) {
      return {
        error: true,
        errorMessage: validation.messageOnError,
      };
    }
  }

  return {
    error: false,
    errorMessage: "",
  };
};
