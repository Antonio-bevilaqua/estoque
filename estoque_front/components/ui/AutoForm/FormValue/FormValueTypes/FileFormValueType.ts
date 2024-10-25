import FormValueType from "./FormValueType";
import { AutoFormField } from "../../Types/AutoFormTypes";
import AutoFile from "@/lib/FileHandler/AutoFile";

export default class FileFormValueType extends FormValueType {
  isValueType(field: AutoFormField): boolean {
    return (
      field.type === "file" ||
      field.value instanceof AutoFile ||
      field.value instanceof Blob
    );
  }

  appendValue(name: string, formData: FormData): any {
    if (this.field.value instanceof Blob) {
      return formData.append(name, this.field.value);
    }

    if (this.field.value instanceof AutoFile) {
      return formData.append(
        name,
        this.field.value.blob,
        this.field.value.name
      );
    }

    return this.setValueFromInput(name, formData);
  }

  setValueFromInput(name: string, formData: FormData): any {
    const input = document.querySelector(
      `#${this.field.id}`
    ) as HTMLInputElement;

    if ((input?.files ?? null) && input.files.length > 0) {
      if (this.field.multiple) {
        name = name.includes("[]") ? name : name + "[]";
        for (let i = 0; i < input.files.length; i++) {
          formData.append(name, input.files[i]);
        }
      } else {
        formData.append(name, input.files[0]);
      }
    }
  }
}
