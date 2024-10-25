"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import CardSnippet from "@/components/ui/card-snippet";
import Content from "./content";
import ReportModal from "../../components/partials/reports/modal/modal";
import Provider from "../../components/partials/reports/provider/Provider";
import TopCards from "./topCards";

export default function page() {
  return (
    <Provider>
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem className="text-primary">Inicio</BreadcrumbItem>
      </Breadcrumbs>
      <div className="grid gap-4">
        <TopCards />
        <CardSnippet
          title={"Olá, seja bem vindo!"}
          subtitle={"Confira abaixo seu resumo do mês"}
        >
          <Content />
        </CardSnippet>
        <ReportModal />
      </div>
    </Provider>
  );
}
