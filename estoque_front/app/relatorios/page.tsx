"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import CardSnippet from "@/components/ui/card-snippet";
import Link from "next/link";
import Content from "./content";
import Header from "./header";
import ReportModal from "../../components/partials/reports/modal/modal";
import Provider from "../../components/partials/reports/provider/Provider";

export default function Reports() {
  return (
    <Provider>
      <div>
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem>
            <Link href="/inicio">Inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Relatórios</BreadcrumbItem>
        </Breadcrumbs>
        <CardSnippet header={<Header />}>
          <Content />
        </CardSnippet>
        <ReportModal />
      </div>
    </Provider>
  );
}
