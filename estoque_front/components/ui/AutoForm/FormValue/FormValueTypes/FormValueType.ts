import { AutoFormField } from "../../Types/AutoFormTypes";
import { FormValueContract } from "../FormValues";

export default class FormValueType implements FormValueContract {
  protected field: AutoFormField;

  append(name: string, field: AutoFormField, formData: FormData): any {
    this.field = field;
    if (typeof this.field.mapValue === "function") {
      return formData.append(
        name,
        this.field.mapValue(this.field.value)
      );
    }

    return this.appendValue(name, formData);
  }

  isValueType(field: AutoFormField): boolean {
    throw new Error("isValueType must be implemented!");
  }

  appendValue(name: string, formData: FormData): any {
    throw new Error("addValue must be implemented!");
  }
}
