"use client";
import HorizontalLogo from "@/components/partials/logo/horizontal-logo";
import AutoForm from "@/components/ui/AutoForm";
import AutoText from "@/components/ui/AutoForm/AutoText/AutoText";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import useApi from "@/hooks/use-api";
import { struct } from "@/lib/type";
import { email, required } from "@/lib/validations";
import Link from "next/link";
import { useState } from "react";

const ForgotForm = ({ setSent }: { setSent: (sent: boolean) => void }) => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: struct) => {
    setLoading(true);
    const response = await api.post("login/recovery", data);
    if (response) {
      setSent(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="px-4 md:px-0 max-w-sm">
        <Link href="/inicio" className="inline-block">
          <HorizontalLogo className="h-auto w-full" />
        </Link>
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
          Esqueceu sua senha?
        </div>
        <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
          Preencha seu email e instruções serão enviadas para você!
        </div>
        <div className="mt-0 text-center text-base text-default-600">
          <AutoForm
            autoFormFields={[
              {
                name: "email",
                label: "Email",
                validations: [required, email],
              },
            ]}
          >
            <div className="text-left">
              <AutoText
                name="email"
                label=""
                inputProps={{ disabled: loading }}
              />
            </div>

            <div className="mt-4">
              <SubmitButton
                color="primary"
                onSubmit={onSubmit}
                className="w-full mt-5"
                text="Enviar Email de Recuperação"
                icon={"heroicons:envelope"}
                loading={loading}
              />
              <div className="mt-1 w-full text-left">
                <Link
                  href="/login"
                  className="flex-none text-sm text-slate-500"
                >
                  Cancelar e voltar ao login
                </Link>
              </div>
            </div>
          </AutoForm>
        </div>
      </div>
    </div>
  );
};

export default ForgotForm;
