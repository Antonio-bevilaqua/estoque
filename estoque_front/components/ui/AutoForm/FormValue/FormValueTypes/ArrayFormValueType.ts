import { AutoFormField } from "../../Types/AutoFormTypes";
import { FormValueContract } from "../FormValues";
import BooleanFormValueType from "./BooleanFormValueType";
import DefaultFormValueType from "./DefaultFormValueType";
import FileFormValueType from "./FileFormValueType";
import FormValueType from "./FormValueType";

export default class ArrayFormValueType extends FormValueType {
  private types: FormValueContract[];
  private defaultType: DefaultFormValueType;

  isValueType(field: AutoFormField): boolean {
    return field.value.constructor === Array;
  }

  appendValue(name: string, formData: FormData): any {
    this.types = [new BooleanFormValueType(), new FileFormValueType()];
    this.defaultType = new DefaultFormValueType();

    const fieldValueArr = this.field.value as Array<string | number | Blob>;
    const length = fieldValueArr.length;
    for (let i = 0; i < length; i++) {
      this.appendByType(name, fieldValueArr[i], formData);
    }
  }

  appendByType(name: string, actualValue: any, formData: FormData): any {
    name = name.includes("[]") ? name : name + "[]";

    let actualField = {
      ...this.field,
      name: name,
      value: actualValue,
    };

    for (let type of this.types) {
      if (type.isValueType(actualField)) {
        return type.append(name, actualField, formData);
      }
    }

    return this.defaultType.append(name, actualField, formData);
  }
}
