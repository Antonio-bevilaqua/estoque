"use client";
import HorizontalLogo from "@/components/partials/logo/horizontal-logo";
import AutoForm from "@/components/ui/AutoForm";
import AutoText from "@/components/ui/AutoForm/AutoText/AutoText";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import useApi from "@/hooks/use-api";
import { phoneMask } from "@/lib/masks";
import { struct } from "@/lib/type";
import { email, required } from "@/lib/validations";
import { useState } from "react";
import SuccessMail from "./success-mail";

export default function SupportForm() {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const onSubmit = async (data: struct) => {
    setLoading(true);
    const response = api.post("/support", data);
    if (response) setFinished(true);
    setLoading(false);
  };

  if (finished) return <SuccessMail />;

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="px-4 md:px-0 max-w-xl">
        <HorizontalLogo className="h-auto w-full" />
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
          Suporte
        </div>
        <div className="2xl:text-md text-base text-default-600 mt-2 leading-6">
          Digite abaixo seu problema, como te contatar e entraremos em contato
          com você.
        </div>
        <div className="mt-4 text-center text-base text-default-600 grid gap-4">
          <AutoForm
            autoFormFields={[
              {
                name: "name",
                validations: [required],
              },
              {
                name: "email",
                validations: [required, email],
              },
              {
                name: "phone",
                mask: phoneMask,
                validations: [required],
              },
              {
                name: "message",
                type: "textarea",
                validations: [required],
              },
            ]}
          >
            <div className="text-left">
              <AutoText
                name="name"
                label="Seu Nome:"
                inputProps={{ disabled: loading }}
              />
            </div>
            <div className="text-left">
              <AutoText
                name="email"
                label="Email para Contato:"
                inputProps={{ disabled: loading }}
              />
            </div>
            <div className="text-left">
              <AutoText
                name="phone"
                label="Telefone para Contato:"
                inputProps={{ disabled: loading }}
              />
            </div>
            <div className="text-left">
              <AutoText
                name="message"
                label="Sua dúvida ou problema: *"
                inputProps={{ disabled: loading }}
              />
            </div>

            <div className="mt-4">
              <SubmitButton
                color="primary"
                onSubmit={onSubmit}
                className="w-full mt-5"
                text="Enviar"
                icon="heroicons:check-circle"
                loading={loading}
              />
            </div>
          </AutoForm>
        </div>
      </div>
    </div>
  );
}
