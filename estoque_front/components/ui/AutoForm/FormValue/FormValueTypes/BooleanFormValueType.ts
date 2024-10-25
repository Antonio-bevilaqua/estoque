import { AutoFormField } from "../../Types/AutoFormTypes";
import FormValueType from "./FormValueType";

export default class BooleanFormValueType extends FormValueType {
  isValueType(field: AutoFormField): boolean {
    return typeof field.value === "boolean";
  }

  appendValue(name: string, formData: FormData): any {
    return formData.append(name, this.field.value ? "1" : "0");
  }
}
