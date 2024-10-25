import { struct } from "@/lib/type";

export const mimes: struct<string[]> = {
  bmp: ["image/bmp"],
  csv: ["text/csv"],
  gif: ["image/gif"],
  jpeg: ["image/jpeg"],
  doc: ["application/msword"],
  pdf: ["application/pdf"],
  txt: ["text/plain"],
  png: ["image/png"],
  tiff: ["image/tiff"],
  xls: [
    "application/vnd.ms-excel",
    "application/msexcel",
    "application/x-msexcel",
    "application/x-excel",
    "application/xls",
    "application/x-xls",
  ],
  ppt: [
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  gz: ["application/gzip", "application/x-gzip"],
  rar: [
    "application/vnd.rar",
    "application/x-rar-compressed",
    "multipart/x-zip",
  ],
  zip: [
    "application/zip",
    "application/octet-stream",
    "application/x-zip-compressed",
  ],
  x7z: ["application/x-7z-compressed"],
};

export const getMimeTypes = (mimeTypes: string[]) => {
  let mimeTypeMerger = [];
  for (let mime of mimeTypes) {
    if (mime in mimes) {
      mimeTypeMerger.push([...mimes[mime]]);
    }
  }

  return mimeTypeMerger.join(",");
};
