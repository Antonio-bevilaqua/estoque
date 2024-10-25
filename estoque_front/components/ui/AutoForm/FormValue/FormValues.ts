import { AutoFormField } from "../Types/AutoFormTypes";
import ArrayFormValueType from "./FormValueTypes/ArrayFormValueType";
import BooleanFormValueType from "./FormValueTypes/BooleanFormValueType";
import DefaultFormValueType from "./FormValueTypes/DefaultFormValueType";
import FileFormValueType from "./FormValueTypes/FileFormValueType";

export interface FormValueContract {
  isValueType(field: AutoFormField): boolean;
  append(name: string, field: AutoFormField, formData: FormData): any;
}

export default class FormValues {
  private types: FormValueContract[];
  private fields: { [k: string]: AutoFormField };
  private defaultType: DefaultFormValueType;
  private formData: FormData;

  constructor(
    fields: { [k: string]: AutoFormField },
    formData: FormData | null = null
  ) {
    this.fields = { ...fields };

    this.types = [
      new ArrayFormValueType(),
      new BooleanFormValueType(),
      new FileFormValueType(),
    ];

    this.defaultType = new DefaultFormValueType();
    this.formData = formData !== null ? formData : new FormData();
  }

  get(): FormData {
    for (let name in this.fields) {
      this.mapType(name.toString());
    }

    return this.formData;
  }

  mapType(name: string): any {
    for (let type of this.types) {
      if (type.isValueType(this.fields[name])) {
        return type.append(name, this.fields[name], this.formData);
      }
    }

    return this.defaultType.append(name, this.fields[name], this.formData);
  }
}
