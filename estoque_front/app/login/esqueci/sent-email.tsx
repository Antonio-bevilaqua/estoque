"use client";
import HorizontalLogo from "@/components/partials/logo/horizontal-logo";
import { Icon } from "@iconify/react";
import Link from "next/link";

const SentEmail = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="px-4 md:px-0 max-w-sm">
        <Link href="/" className="inline-block">
          <HorizontalLogo className="h-auto w-full" />
        </Link>
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl flex gap-2 font-bold text-default-900">
          Email Enviado <Icon icon="heroicons:envelope" className="h-8" />
        </div>
        <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
          Um email foi enviado para você contendo instruções de como recuperar
          sua conta.
        </div>
        <div className="mt-8 w-full text-left">
          <Link
            href="/login"
            className="flex-none text-base text-slate-500 flex"
          >
            <Icon icon="heroicons:arrow-left-20-solid" className="h-6 mr-1" />{" "}
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SentEmail;
