"use client";
import AutoForm from "@/components/ui/AutoForm";
import CardSnippet from "@/components/ui/card-snippet";
import { Configuration } from "@/types/Configuration";
import Form from "./form";
import { inputs } from "./inputs";

export default function Configurations() {
  return (
    <CardSnippet title="Configurações">
      <AutoForm autoFormFields={inputs}>
        <Form />
      </AutoForm>
    </CardSnippet>
  );
}
