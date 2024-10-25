import { AutoFormField } from "../../Types/AutoFormTypes";

export default class DefaultFormValueType {
  append(name: string, field: AutoFormField, formData: FormData): any {
    if (typeof field.mapValue === "function") {
      return formData.append(name, field.mapValue(field.value));
    }

    return formData.append(name, field.value.toString());
  }
}
