"use client";
import HorizontalLogo from "@/components/partials/logo/horizontal-logo";
import { Icon } from "@iconify/react";
import Link from "next/link";

const SuccessMail = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="px-4 md:px-0 max-w-sm">
        <HorizontalLogo className="h-auto w-full" />
        <div className="mt-10 2xl:text-3xl text-2xl flex gap-2 font-bold text-default-900">
          Suporte Acionado <Icon icon="heroicons:envelope" className="h-8" />
        </div>
        <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
          Sua mensagem foi enviada para nosso suporte, aguarde que logo
          entraremos em contato.
        </div>
      </div>
    </div>
  );
};

export default SuccessMail;
