import React, { ReactNode, useState } from "react";
import useApi from "@/hooks/use-api";
import { idGenerator } from "@/lib/id-generator";
import { HttpMethods, struct } from "@/lib/type";
import { endpointWithParams } from "@/lib/utils";
import AutoForm from "..";
import AutoInput from "../AutoInput/AutoInput";
import SubmitButton, { SubmitButtonProps } from "../SubmitButton/SubmitButton";
import {
  AutoFormInitializer,
  AutoFormInitializerField,
} from "../Types/AutoFormTypes";

type AutoFormRenderProps = {
  endpoint: string;
  submitProps: Omit<SubmitButtonProps, "loading" | "onSubmit" | "asForm">;
  fields: AutoFormInitializer;
  onFinish?: Function | null;
  method?: HttpMethods;
  children?: ReactNode;
  asForm?: boolean;
};

export default function AutoFormRender({
  endpoint,
  submitProps,
  fields,
  onFinish = null,
  method = HttpMethods.POST,
  children = <></>,
  asForm = false,
}: AutoFormRenderProps) {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormData | struct<any>): Promise<void> => {
    setLoading(true);
    let response = null;
    if (method !== HttpMethods.GET) {
      response = await api[method](endpoint, data);
    } else {
      let newEndpoint = endpointWithParams(endpoint, data as struct);
      response = await api[method](newEndpoint);
    }

    setLoading(false);
    if (response) {
      if (typeof onFinish === "function") onFinish(response);
      return;
    }
  };

  return (
    <AutoForm autoFormFields={fields}>
      {children}
      {fields.map((field: AutoFormInitializerField) => (
        <React.Fragment key={`${idGenerator()}`}>
          {field.type === "hidden" ? <></> : <AutoInput field={field} />}
        </React.Fragment>
      ))}
      <SubmitButton
        loading={loading}
        onSubmit={onSubmit}
        asForm={asForm}
        {...submitProps}
      />
    </AutoForm>
  );
}
