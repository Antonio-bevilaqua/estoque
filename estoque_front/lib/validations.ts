import { AutoFormFields } from "@/components/ui/AutoForm/Types/AutoFormTypes";
import { pad } from "./utils";

export const required = {
  validate: (value: string) => value.trim() !== "",
  messageOnError: "Este campo é requerido.",
};

export const email = {
  validate: (value: string) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? true
      : false,
  messageOnError: "Email inválido.",
};

export const minLength = (length: number) => ({
  validate: (value: string) => value.length >= length,
  messageOnError: "Este campo precisa ter pelo menos " + length + " dígitos",
});

export const maxLength = (length: number) => ({
  validate: (value: string) => value.length <= length,
  messageOnError: "Este campo precisa ter no máximo " + length + " dígitos",
});

export const min = (number: number) => ({
  validate: (value: any) => Number(value.replace(",", ".")) >= number,
  messageOnError: "Este campo precisa ser maior ou igual a " + number,
});

export const max = (number: number) => ({
  validate: (value: any) => Number(value.replace(",", ".")) <= number,
  messageOnError: "Este campo precisa ser menor ou igual a " + number,
});

export const password = {
  validate: (value: string) => !/[\´\`\\\/\[\]\}\{\~\^\.\,\'\" ]/.test(value),
  messageOnError: "A senha pode conter letras, números e caracteres especiais",
};

export const confirmation = (name: string) => {
  let field = name.replace("_confirmation", "");
  return {
    validate: (value: string, fields: AutoFormFields) =>
      fields[field] && fields[field].value === value,
    messageOnError: `Os campos não conferem`,
  };
};

export const minDate = (date: Date) => {
  return {
    validate: (value: string, fields: AutoFormFields) => {
      let values = value.split("-");
      let vdate = new Date();
      vdate.setFullYear(Number(values[0]));
      vdate.setMonth(Number(values[1]) - 1);
      vdate.setDate(Number(values[2]));

      return vdate >= date;
    },
    messageOnError: `A data deve ser igual ou superior à ${date.getDate()}/${pad(
      (date.getMonth() + 1).toString(),
      "0",
      2,
      true
    )}/${date.getFullYear()}`,
  };
};

export const finalDate = (field: string) => {
  return {
    validate: (value: string, fields: AutoFormFields) => {
      let initialDateName = field.replace("final", "initial");
      if (!(initialDateName in fields)) return true;
      let dateValue = fields[initialDateName].value;
      let parts = dateValue.split("-");
      if (parts.length < 3) return true;
      let date = new Date();
      date.setFullYear(Number(parts[0]));
      date.setMonth(Number(parts[1]) - 1);
      date.setDate(Number(parts[2]));

      let values = value.split("-");
      let vdate = new Date();
      vdate.setFullYear(Number(values[0]));
      vdate.setMonth(Number(values[1]) - 1);
      vdate.setDate(Number(values[2]));

      return vdate > date;
    },
    messageOnError: `A data final deve ser superior à inicial`,
  };
};

export const cnpj = {
  validate: (value: string) => {
    value = value.replace(/[^\d]+/g, "");

    if (value === "") return false;

    if (value.length != 14) return false;

    let fieldsEqual = true;
    let firstChar = value[0];
    for (let i = 1; i < value.length; i++) {
      if (firstChar !== value[i]) {
        fieldsEqual = false;
        break;
      }
    }
    if (fieldsEqual) return false;

    function validateDigit(firstDigit: boolean) {
      let size = firstDigit ? value.length - 2 : value.length - 1;
      var numbers = value.substring(0, size);
      var sum = 0;
      var position = size - 7;

      for (var i = size; i >= 1; i--) {
        sum += Number(numbers.charAt(size - i)) * position--;
        if (position < 2) position = 9;
      }

      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      return result === Number(value.charAt(size));
    }

    return validateDigit(true) && validateDigit(false);
  },
  messageOnError: `CNPJ inválido`,
};
