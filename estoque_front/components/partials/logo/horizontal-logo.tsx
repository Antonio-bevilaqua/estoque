import Image from "next/image";
import React from "react";
import Logo from "@/public/images/logo/logo-nav.png";
import LogoDark from "@/public/images/logo/logo-nav-dark.png";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { ComponentWithClass } from "@/lib/type";

export default function HorizontalLogo({ className = "" }: ComponentWithClass) {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "dark" ? LogoDark : Logo}
      alt={siteConfig.name + " logotipo"}
      className={className}
    />
  );
}