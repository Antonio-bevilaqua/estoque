import React from "react";
import Image from "next/image";
import { PreviewerProps } from "./types";
import { icons } from "@/config/file-type-icons";

export default function DefaultPreviewer({
  file,
  alt = "Ícone do Arquivo",
  ...props
}: PreviewerProps) {
  const src = file.type in icons ? icons[file.type] : icons.file;

  if (!src) return <></>;

  return <Image src={src} alt={alt} {...props} />;
}
