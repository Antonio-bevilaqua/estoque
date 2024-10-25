"use client";
import HorizontalLogo from "@/components/partials/logo/horizontal-logo";
import AutoForm from "@/components/ui/AutoForm";
import AutoPassword from "@/components/ui/AutoForm/AutoPassword/AutoPassword";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import useApi from "@/hooks/use-api";
import { struct } from "@/lib/type";
import { confirmation, minLength, password, required } from "@/lib/validations";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const RecoveryForm = () => {
  const router = useRouter();
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const onSubmit = async (data: struct) => {
    const token = params.get("token") ?? "";
    setLoading(true);
    const response = await api.post("login/reset", {
      ...data,
      token: token,
    });
    setLoading(false);
    if (response) {
      toast.success(
        "Senha alterada com sucesso, tente fazer o login novamente."
      );
      router.push("/login");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="px-4 md:px-0 max-w-sm">
        <Link href="/inicio" className="inline-block">
          <HorizontalLogo className="h-auto w-full" />
        </Link>
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
          Recuperar Conta
        </div>
        <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
          Preencha e confirme uma nova senha abaixo para recuperar sua conta!
        </div>
        <div className="mt-4 text-center text-base text-default-600">
          <AutoForm
            autoFormFields={[
              {
                name: "password",
                label: "Senha *",
                type: "password",
                validations: [required, minLength(6), password],
              },
              {
                name: "password_confirmation",
                label: "Confirmar Senha *",
                type: "password",
                validations: [
                  required,
                  minLength(6),
                  password,
                  confirmation("password_confirmation"),
                ],
              },
            ]}
          >
            <div className="text-left">
              <AutoPassword
                name="password"
                label="Senha"
                inputProps={{ disabled: loading }}
              />
            </div>
            <div className="mt-2 text-left">
              <AutoPassword
                name="password_confirmation"
                label="Confirmar Senha"
                inputProps={{ disabled: loading }}
              />
            </div>

            <div className="mt-4">
              <SubmitButton
                color="primary"
                onSubmit={onSubmit}
                className="w-full mt-5"
                text="Recuperar Conta"
                icon="heroicons:check"
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

export default RecoveryForm;
