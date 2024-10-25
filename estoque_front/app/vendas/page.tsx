"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import CrudTableCard from "@/components/ui/Crud/crud-table-card";
import React from "react";
import { columns } from "./columns";
import { filters } from "./filters";
import Link from "next/link";
import SalesProvider from "./sales-modals/provider";
import AddButton from "./sales-modals/add-button";
import AddModal from "./sales-modals/add-modal";
import EditModal from "./sales-modals/edit-modal";

export default function page() {
  return (
    <div>
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem>
          <Link href="/inicio">Inicio</Link>
        </BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Vendas</BreadcrumbItem>
      </Breadcrumbs>
      <SalesProvider>
        <CrudTableCard
          endpoint={"/sales"}
          columns={columns}
          classification="id"
          title="vendas"
          saveFieldsGetter={() => ([])}
          filters={filters}
          buttons={
            <>
              <AddModal />
              <EditModal />
              <AddButton />
            </>
          }
          elementName="venda"
          masculineName={false}
          withAdd={false}
          withEdit={false}
        />
      </SalesProvider>
    </div>
  );
}
