import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EnvType, InternalURL, struct } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isLocationMatch = (
  targetLocation: any,
  locationName: any
): boolean => {
  return (
    locationName === targetLocation ||
    locationName.startsWith(`${targetLocation}/`)
  );
};

export const RGBToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const redHex: string = componentToHex(r);
  const greenHex: string = componentToHex(g);
  const blueHex: string = componentToHex(b);

  return "#" + redHex + greenHex + blueHex;
};

export function hslToHex(hsl: string): string {
  // Remove "hsla(" and ")" from the HSL string
  let hslValues = hsl.replace("hsla(", "").replace(")", "");

  // Split the HSL string into an array of H, S, and L values
  const [h, s, l] = hslValues.split(" ").map((value) => {
    if (value.endsWith("%")) {
      // Remove the "%" sign and parse as a float
      return parseFloat(value.slice(0, -1));
    } else {
      // Parse as an integer
      return parseInt(value);
    }
  });

  // Function to convert HSL to RGB
  function hslToRgb(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert RGB values to integers
    const rInt = Math.round(r * 255);
    const gInt = Math.round(g * 255);
    const bInt = Math.round(b * 255);

    // Convert RGB values to a hex color code
    const rgbToHex = (value: number): string => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${rgbToHex(rInt)}${rgbToHex(gInt)}${rgbToHex(bInt)}`;
  }

  // Call the hslToRgb function and return the hex color code
  return hslToRgb(h, s, l);
}

export const hexToRGB = (hex: string, alpha?: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export const formatTime = (time: number | Date | string): string => {
  if (!time) return "";

  const date = new Date(time);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
};

// object check
export function isObjectNotEmpty(obj: any): boolean {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.keys(obj).length > 0;
}

export const formatDate = (date: string | number | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

// random word
export function getWords(inputString: string): string {
  // Remove spaces from the input string
  const stringWithoutSpaces = inputString.replace(/\s/g, "");

  // Extract the first three characters
  return stringWithoutSpaces.substring(0, 3);
}

// for path name
export function getDynamicPath(pathname: any): any {
  const prefixes = ["en", "bn", "ar"];

  for (const prefix of prefixes) {
    if (pathname.startsWith(`/${prefix}/`)) {
      return `/${pathname.slice(prefix.length + 2)}`;
    }
  }

  return pathname;
}

// translate

interface Translations {
  [key: string]: string;
}

export const translate = (title: string, trans: Translations): string => {
  const lowercaseTitle = title.toLowerCase();

  if (trans?.hasOwnProperty(lowercaseTitle)) {
    return trans[lowercaseTitle];
  }

  return title;
};

export const enviroment: EnvType =
  (process.env.NEXT_PUBLIC_ENVIROMENT as EnvType) ?? "production";

const internalUrls: { [key: string]: string } = {
  NEXT_PUBLIC_FRONT_URL: process.env.NEXT_PUBLIC_FRONT_URL ?? "",
  NEXT_PUBLIC_LOCAL_FRONT_URL: process.env.NEXT_PUBLIC_LOCAL_FRONT_URL ?? "",
  NEXT_PUBLIC_SANDBOX_FRONT_URL:
    process.env.NEXT_PUBLIC_SANDBOX_FRONT_URL ?? "",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
  NEXT_PUBLIC_LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL ?? "",
  NEXT_PUBLIC_SANDBOX_API_URL: process.env.NEXT_PUBLIC_SANDBOX_API_URL ?? "",
  NEXT_PUBLIC_MSAL_URL: process.env.NEXT_PUBLIC_MSAL_URL ?? "",
  NEXT_PUBLIC_LOCAL_MSAL_URL: process.env.NEXT_PUBLIC_LOCAL_MSAL_URL ?? "",
  NEXT_PUBLIC_SANDBOX_MSAL_URL: process.env.NEXT_PUBLIC_SANDBOX_MSAL_URL ?? "",
};

export const getInternalURL = (URL: InternalURL, path: string = ""): string => {
  const append =
    enviroment !== "production" ? enviroment.toUpperCase() + "_" : "";

  const key = URL.replace("NEXT_PUBLIC_", `NEXT_PUBLIC_${append}`);
  let uri = key in internalUrls ? internalUrls[key] : "";
  if (path !== "") {
    path = path[0] === "/" ? path : "/" + path;
    uri += path;
  }
  return uri;
};

export const getApiImgSrc = (path: string): string => {
  return getInternalURL(InternalURL.NEXT_PUBLIC_API_URL, `storage/${path}`);
};

export const initials = (
  text: string,
  separator: string = " ",
  maxChars: number = 2
): string => {
  let parts = text.split(separator);

  maxChars = maxChars > 0 ? maxChars : 1;
  maxChars = maxChars > parts.length ? parts.length : maxChars;

  let initialsStr = "";
  for (let i = 0; i < maxChars; i++) {
    initialsStr += parts[i][0];
  }
  return initialsStr;
};

export const getPaginationArray = (
  page: number,
  lastPage: number,
  numberOfPages: number
): number[] => {
  let firstHalf = Math.floor(numberOfPages / 2);
  let initialPage = page - firstHalf < 1 ? 1 : page - firstHalf;
  let finalPage =
    initialPage + (numberOfPages - 1) > lastPage
      ? lastPage
      : initialPage + (numberOfPages - 1);

  let pages = [];
  for (let i = initialPage; i <= finalPage; i++) {
    pages.push(i);
  }
  return pages;
};

export const endpointWithParams = (
  endpoint: string,
  params: struct<string | number | Array<string | number>> | null = null
) => {
  const sendurl = endpoint;

  let paramStr = "";

  if (params === null) return sendurl;

  const keys = Object.keys(params);

  keys.forEach((key) => {
    if (typeof params[key] === "string" || typeof params[key] === "number") {
      paramStr = paramStr === "" ? "?" : paramStr + "&";
      paramStr += key + "=" + encodeURIComponent(params[key]);
    } else if (params[key].constructor === Array) {
      for (let value of params[key]) {
        paramStr = paramStr === "" ? "?" : paramStr + "&";
        let paramK = key.includes("[]") ? key : key + "[]";
        paramStr += paramK + "=" + encodeURIComponent(value);
      }
    }
  });

  return sendurl + paramStr;
};

export const pad = (
  str: string,
  char: string,
  length: number,
  start: boolean = true
): string => {
  let text = !start ? str : "";
  for (let i = str.length; i < length; i++) {
    text += char;
  }
  return !start ? text : text + str;
};

export const getFirstNWords = (
  string: string,
  totalWords: number,
  separator: string = " "
): string => {
  let strings = string.split(separator);
  let str = "";
  for (let i = 0; i < strings.length; i++) {
    str += str !== "" ? separator + strings[i] : strings[i];

    if (i + 1 === totalWords) break;
  }
  return str;
};

export const getLastNWords = (
  string: string,
  totalWords: number,
  separator: string = " "
): string => {
  let strings = string.split(separator);
  let str = "";
  for (let i = strings.length - 1; i >= 0; i--) {
    str += str !== "" ? separator + strings[i] : strings[i];

    if (strings.length - i === totalWords) break;
  }

  return str;
};

export function formatDBDateToPTBR(date: string): string {
  let dataJS = new Date(date);
  return (
    pad(dataJS.getDate().toString(), "0", 2) +
    "/" +
    pad((dataJS.getMonth() + 1).toString(), "0", 2) +
    "/" +
    dataJS.getFullYear()
  );
}

export function ucfirst(word: string): string {
  if (word === "") return word;
  word = word[0].toUpperCase() + word.substring(1);
  return word;
}

export function ucwords(word: string): string {
  let words = word.split(" ");
  return words.reduce(
    (value: string, currentValue: string) =>
      value + " " + ucfirst(currentValue),
    ""
  );
}
