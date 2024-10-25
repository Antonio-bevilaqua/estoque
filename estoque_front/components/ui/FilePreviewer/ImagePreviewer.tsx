import React, { useState } from "react";
import { PreviewerProps } from "./types";
import { getMimeTypes } from "@/config/mimes";
import DefaultPreviewer from "./DefaultPreviewer";
import Image from "next/image";

export default function ImagePreviewer({
  file,
  alt = "Imagem SyllosDoc",
  ...props
}: PreviewerProps) {
  const typeIsImage = getMimeTypes(["bmp", "jpeg", "png", "gif"])
    .split(",")
    .includes(file.type);

  const getImageUrl = () => {
    if (!typeIsImage) return null;
    return URL.createObjectURL(file);
  };

  const [src, setSrc] = useState(getImageUrl());

  if (!typeIsImage || src === null)
    return <DefaultPreviewer file={file} {...props} />;

  return <Image src={src} alt={alt} onError={() => setSrc(null)} {...props} />;
}
