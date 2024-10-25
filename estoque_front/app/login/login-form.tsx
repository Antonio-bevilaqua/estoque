"use client";
import HorizontalLogo from "@/components/partials/logo/horizontal-logo";
import AutoForm from "@/components/ui/AutoForm";
import AutoPassword from "@/components/ui/AutoForm/AutoPassword/AutoPassword";
import AutoText from "@/components/ui/AutoForm/AutoText/AutoText";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import useAuth from "@/hooks/use-auth";
import { struct } from "@/lib/type";
import { email, minLength, password, required } from "@/lib/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogInForm = () => {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: struct) => {
    setLoading(true);
    const login = await auth.login(data.email, data.password);
    setLoading(false);
    if (login) {
      router.push("/inicio");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="px-4 md:px-0 max-w-sm">
        <Link href="/inicio" className="inline-block">
          <HorizontalLogo className="h-auto w-full" />
        </Link>
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
          Login
        </div>
        <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
          Preencha os dados abaixo para entrar no sistema.
        </div>
        <div className="mt-4 text-center text-base text-default-600">
          <AutoForm
            autoFormFields={[
              {
                name: "email",
                label: "Email",
                validations: [required, email],
              },
              {
                name: "password",
                label: "Senha",
                type: "password",
                validations: [required, minLength(6), password],
              },
            ]}
          >
            <div className="text-left">
              <AutoText
                name="email"
                label="Email"
                inputProps={{ disabled: loading }}
              />
            </div>
            <div className="mt-2 text-left">
              <AutoPassword
                name="password"
                label="Senha"
                inputProps={{ disabled: loading }}
              />
            </div>

            <div className="mt-4">
              <SubmitButton
                color="primary"
                onSubmit={onSubmit}
                className="w-full mt-5"
                text="Entrar"
                icon="heroicons:arrow-right-end-on-rectangle"
                loading={loading}
              />
              <div className="mt-1 w-full text-left">
                <Link
                  href="/login/esqueci"
                  className="flex-none text-sm text-slate-500"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
          </AutoForm>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
