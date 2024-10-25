
import { struct } from "@/lib/type";

const bmp = "/images/mimes/bmp.svg";
const csv = "/images/mimes/csv.svg";
const blank = "/images/mimes/file.svg";
const gif = "/images/mimes/gif.svg";
const jpeg = "/images/mimes/jpeg.svg";
const doc = "/images/mimes/msword.svg";
const pdf = "/images/mimes/pdf.svg";
const txt = "/images/mimes/plain.svg";
const png = "/images/mimes/png.svg";
const tiff = "/images/mimes/tiff.svg";
const xls = "/images/mimes/vnd-ms-excel.svg";
const ppt = "/images/mimes/vnd-ms-powerpoint.svg";
const xlsx = "/images/mimes/vnd-openxmlformats-officedocument-spreadsheetml-sheet.svg";
const docx = "/images/mimes/vnd-openxmlformats-officedocument-wordprocessingml-document.svg";
const SevenZip = "/images/mimes/x-7z-compressed.svg";
const gz = "/images/mimes/x-gzip.svg";
const rar = "/images/mimes/x-rar-compressed.svg";
const zip = "/images/mimes/zip.svg";

export const icons: struct<any> = {
  "image/bmp": bmp,
  "text/csv": csv,
  file: blank,
  "image/gif": gif,
  "image/jpeg": jpeg,
  "application/msword": doc,
  "application/pdf": pdf,
  "text/plain": txt,
  "image/png": png,
  "image/tiff": tiff,
  "application/vnd.ms-excel": xls,
  "application/msexcel": xls,
  "application/x-msexcel": xls,
  "application/x-excel": xls,
  "application/xls": xls,
  "application/x-xls": xls,
  "application/vnd.ms-powerpoint": ppt,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ppt,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": xlsx,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    docx,
  "application/x-7z-compressed": SevenZip,
  "application/gzip": gz,
  "application/x-gzip": gz,
  "application/vnd.rar": rar,
  "application/x-rar-compressed": rar,
  "multipart/x-zip": rar,
  "application/zip": zip,
  "application/octet-stream": zip,
  "application/x-zip-compressed": zip,
};

export const extensionIcons: struct<any> = {
  bmp: bmp,
  csv: csv,
  file: blank,
  gif: gif,
  jpeg: jpeg,
  jpg: jpeg,
  JPG: jpeg,
  JPEG: jpeg,
  doc: doc,
  pdf: pdf,
  txt: txt,
  png: png,
  tiff: tiff,
  xls: xls,
  ppt: ppt,
  xlsx: xlsx,
  docx: docx,
  "7z": SevenZip,
  gz: gz,
  rar: rar,
  zip: zip,
};
