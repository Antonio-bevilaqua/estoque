"use client";
import { siteConfig } from "@/config/site";
import React from "react";
import Logo from "@/public/images/logo/logo-araxa.png";
import { Loader2 } from "lucide-react";
import Image from "next/image";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col gap-2 space-y-2">
      <Image
        src={Logo}
        alt={siteConfig.name + " logotipo"}
        className="h-[4.5rem] w-auto animate-pulse"
      />
      <span className="inline-flex gap-2 mt-4 text-gray-400 items-center animate-pulse">
        <Loader2 className="h-[2rem] w-[2rem] text-teal-400 animate-spin" />{" "}
        Carregando...
      </span>
    </div>
  );
};

export default LayoutLoader;
