"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
const BlankPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem className="text-primary">Inicio</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">
        Dashboard
      </div>
    </div>
  );
};

export default BlankPage;
