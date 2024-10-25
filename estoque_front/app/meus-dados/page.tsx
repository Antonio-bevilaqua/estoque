"use client";
import AutoForm from "@/components/ui/AutoForm";
import AutoInput from "@/components/ui/AutoForm/AutoInput/AutoInput";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import {
  AutoFormInitializer,
  AutoFormInitializerField,
} from "@/components/ui/AutoForm/Types/AutoFormTypes";
import CardSnippet from "@/components/ui/card-snippet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useApi from "@/hooks/use-api";
import useAuth from "@/hooks/use-auth";
import { idGenerator } from "@/lib/id-generator";
import { struct } from "@/lib/type";
import {
  confirmation,
  email,
  minLength,
  password,
  required,
} from "@/lib/validations";
import { SessionCtx } from "@/provider/auth.provider";
import { LockIcon, UserIcon } from "lucide-react";
import { apiBaseUrl } from "next-auth/client/_utils";
import React, { ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";

type Tab = {
  name: string;
  fields: AutoFormInitializer;
  icon: ReactNode;
  title: string;
  endpoint: string;
};

export default function page() {
  const { data } = useContext(SessionCtx);
  const api = useApi();
  const { refresh } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!data.is_logged_in) return <></>;

  const tabs: Tab[] = [
    {
      name: "profile",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Nome *",
          value: data.user.name,
          validations: [required],
        },
        {
          id: "email",
          name: "email",
          label: "Email *",
          value: data.user.email,
          validations: [required, email],
        },
      ],
      icon: <UserIcon className="h-5 w-5 mr-2" />,
      title: "Dados Pessoais",
      endpoint: "user",
    },
    {
      name: "security",
      fields: [
        {
          id: "old_password",
          name: "old_password",
          label: "Senha Atual *",
          type: "password",
          validations: [required, minLength(6), password],
        },
        {
          id: "password",
          name: "password",
          label: "Nova Senha *",
          type: "password",
          validations: [required, minLength(6), password],
        },
        {
          id: "password_confirmation",
          name: "password_confirmation",
          label: "Confirmar Nova Senha *",
          type: "password",
          validations: [
            required,
            minLength(6),
            password,
            confirmation("password_confirmation"),
          ],
        },
      ],
      icon: <LockIcon className="h-5 w-5 mr-2" />,
      title: "Segurança",
      endpoint: "user/password",
    },
  ];

  const onSubmit = async (tab: Tab, data: struct) => {
    setLoading(true);
    const response = await api.post(tab.endpoint, data);

    if (response) {
      await refresh();
      toast.success("Dados atualizados com sucesso!");
    }
    setLoading(false);
  };

  return (
    <CardSnippet title="Meus Dados">
      <Tabs defaultValue={"profile"} className="inline-block p-0 w-full ">
        <TabsList className="bg-background rounded-md   p-0 border-b-2 py-7   w-full justify-start gap-10">
          {tabs.map((tab: Tab) => (
            <TabsTrigger
              key={`trigger-${tab.name}`}
              value={tab.name}
              className="capitalize  data-[state=active]:shadow-none  data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute
                                before:left-1/2 before:-bottom-[30px] before:h-[2px] px-3
                                before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full"
            >
              {tab.icon}
              <span className="text-sm font-medium text-default-700">
                {tab.title}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab: Tab) => (
          <TabsContent
            className="mt-10"
            key={`content-${tab.name}`}
            value={tab.name}
          >
            <div className=" grid grid-cols-1 xl:grid-cols-1 gap-5 px-10">
              <AutoForm autoFormFields={tab.fields}>
                <>
                  {tab.fields.map((field: AutoFormInitializerField) => (
                    <React.Fragment key={`${idGenerator()}`}>
                      <AutoInput field={field} />
                    </React.Fragment>
                  ))}
                </>
                <SubmitButton
                  color="primary"
                  onSubmit={(data: struct) => onSubmit(tab, data)}
                  className="w-full mt-5"
                  text="Salvar Alterações"
                  icon="heroicons:check"
                  loading={loading}
                />
              </AutoForm>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </CardSnippet>
  );
}
