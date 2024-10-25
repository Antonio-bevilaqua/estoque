import { pad } from "./utils";

function CNPJmask(v: string): string {
  const separador = ".";
  v = v.replace(/\D/g, "");
  v = v.length > 14 ? v.substring(0, 14) : v;
  v = v.replace(/(\d{2})(\d)/, "$1" + separador + "$2");
  v = v.replace(/(\d{3})(\d)/, "$1" + separador + "$2");
  v = v.replace(/(\d{3})(\d)/, "$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");
  return v;
}

function alphaMask(v: string): string {
  v = v.replace(/[^A-Za-z]/g, "");
  return v;
}

function alphaNumMask(v: string): string {
  v = v.replace(/[^0-9A-Za-z]/g, "");
  return v;
}

function alphaNumAndDashesMask(v: string): string {
  v = v.replace(/[^0-9A-Za-z_-]/g, "");
  return v;
}

function numberMask(v: string): string {
  v = v.replace(/\D/g, "");
  return v;
}

function numberAndDashesMask(v: string): string {
  v = v.replace(/[^0-9_-]/g, "");
  return v;
}

function ticketIdMask(v: string): string {
  v = v.replace(/\D/g, "");
  if (v.length === 0) return v;

  v = parseInt(v).toString();
  if (v.length > 6) {
    v = v.substring(0, 6);
  }
  v = pad(v, "0", 6);

  return parseInt(v) === 0 ? "" : v;
}

function CPFMask(v: string, separador: string = "."): string {
  v = v.replace(/\D/g, "");
  v = v.length > 11 ? v.substring(0, 11) : v;
  v = v.replace(/(\d{3})(\d)/, "$1" + separador + "$2");
  v = v.replace(/(\d{3})(\d)/, "$1" + separador + "$2");
  v = v.replace(/(\d{3})(\d)/, "$1-$2");
  return v;
}

function phoneMask(v: string): string {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v;
}

function timeMask(v: string): string {
  v = v.replace(/\D/g, "");
  if (v.length <= 2) return hoursMask(v);
  v = v.replace(/^(\d{2})(\d)/g, "($1):$2");

  let values = v.split(":");
  values[0] = hoursMask(values[0]);
  values[1] = minutesMask(values[1]);

  return values[0] + ":" + values[1];
}

function hoursMask(v: string): string {
  v = v.replace(/\D/g, "");
  if (parseInt(v) < 0) {
    v = "00";
  } else if (parseInt(v) > 23) {
    v = "23";
  }
  return pad(v, "0", 2, true);
}

function minutesMask(v: string): string {
  v = v.replace(/\D/g, "");
  if (parseInt(v) < 0) {
    v = "00";
  } else if (parseInt(v) > 59) {
    v = "59";
  }
  return pad(v, "0", 2, true);
}

function dateMask(
  v: string,
  separador: string = "/",
  tipo: string = "pt-BR"
): string {
  if (tipo === "pt-BR" || tipo === "en-US") {
    v = v.replace(/\D/g, "");
    v = v.length > 8 ? v.substring(0, 8) : v;
    v = v.replace(/(\d{2})(\d)/, "$1" + separador + "$2");
    v = v.replace(/(\d{2})(\d)/, "$1" + separador + "$2");
    return v;
  } else {
    v = v.replace(/\D/g, "");
    v = v.length > 8 ? v.substring(0, 8) : v;
    v = v.replace(/(\d{4})(\d)/, "$1" + separador + "$2");
    v = v.replace(/(\d{2})(\d)/, "$1" + separador + "$2");
    return v;
  }
}

function cepMask(v: string): string {
  v = v.length > 9 ? v.substring(0, 9) : v;
  return v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

function dayMask(v: string): string {
  if (v === "") {
    return v;
  }

  let intNumber: number = parseInt(v);
  if (intNumber <= 0) {
    return "1";
  }

  if (intNumber >= 31) {
    return "31";
  }

  return v;
}

function yearMask(v: string): string {
  v = v.replace(/\D/g, "");
  if (v === "") return v;

  return v;
}

function moneyMask(v: string | number): string {
  v = v.toString().replace(/\D/g, "");
  let actualValue = "";
  for (let i = 0; i < v.length; i++) {
    if (v[i] === "0" && actualValue === "") {
      continue;
    }

    actualValue += v[i];
  }

  if (actualValue.length < 3) {
    actualValue = pad(actualValue, "0", 3, true);
  }

  return (
    actualValue.substring(0, actualValue.length - 2) +
    "," +
    actualValue.substring(actualValue.length - 2)
  );
}

function documentMask(v: string): string {
  v = v.toString().replace(/\D/g, "");
  if (v.length < 12) return CPFMask(v);

  return CNPJmask(v);
}

export {
  numberMask,
  CNPJmask,
  CPFMask,
  documentMask,
  phoneMask,
  dateMask,
  cepMask,
  minutesMask,
  hoursMask,
  timeMask,
  dayMask,
  yearMask,
  moneyMask,
  ticketIdMask,
  alphaNumMask,
  alphaNumAndDashesMask,
  numberAndDashesMask,
  alphaMask,
};
