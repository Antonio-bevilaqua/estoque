"use client";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import CrudTableCard from "@/components/ui/Crud/crud-table-card";
import React from "react";
import { columns } from "./columns";
import { getFields } from "./fields";
import { filters } from "./filters";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem>
          <Link href="/inicio">Inicio</Link>
        </BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Despesas</BreadcrumbItem>
      </Breadcrumbs>
      <CrudTableCard
        endpoint={"/expenses"}
        columns={columns}
        classification="id"
        title="despesas"
        saveFieldsGetter={getFields}
        filters={filters}
        elementName="despesa"
      />
    </div>
  );
}