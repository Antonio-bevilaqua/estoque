import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InternalURL, struct } from "@/lib/type";
import { endpointWithParams, getInternalURL } from "@/lib/utils";
import { SessionCtx } from "@/provider/auth.provider";
import { CheckIcon, FileSpreadsheetIcon, XIcon } from "lucide-react";
import { useContext } from "react";
import { Badge } from "../../badge";
import useAutoTable from "../hook/useAutoTable";

type TableExporterProps = {
  baseEndpoint: string;
  pageEndpoint?: string;
  filteredAllEndpoint?: string;
  allEndpoint?: string;
  pagesExport?: boolean;
  filteredAllExport?: boolean;
  togglerProps?: ButtonProps;
  allExport?: boolean;
  contentProps?: { [key: string]: any };
};

enum ExportType {
  PAGE = "PAGE",
  FILTERED_ALL = "FILTERED_ALL",
  ALL = "ALL",
}

export default function TableExporter({
  baseEndpoint,
  pageEndpoint = "exportar/pagina",
  filteredAllEndpoint = "exportar/todos/filtrados",
  allEndpoint = "exportar/todos",
  pagesExport = true,
  filteredAllExport = true,
  allExport = true,
  contentProps = {
    className: "w-56",
  },
  togglerProps = {
    variant: "outline",
  },
}: TableExporterProps) {
  const session = useContext(SessionCtx);
  const { filters, filtersApplied } = useAutoTable();

  const getFilterParams = (): string => {
    let applied: struct = {};
    for (let key in filtersApplied) {
      if (filtersApplied[key].value === "") continue;
      applied[key] = filtersApplied[key].value;
    }
    return endpointWithParams("", applied);
  };

  const getHiddenFilterParams = (): string => {
    let applied: struct = {};
    for (let key in filtersApplied) {
      if (!filters[key].hidden || filtersApplied[key].value === "") continue;
      applied[key] = filtersApplied[key].value;
    }
    return endpointWithParams("", applied);
  };

  const getExportParams = (type: ExportType): string => {
    let params =
      type !== ExportType.ALL ? getFilterParams() : getHiddenFilterParams();
    let tokenParam = `token=${session?.data.token}`;
    if (params === "") {
      return `?${tokenParam}`;
    }

    return `${params}&${tokenParam}`;
  };

  const getExportHref = (type: ExportType): string => {
    let endpoint = baseEndpoint;
    switch (type) {
      case ExportType.ALL:
      case ExportType.FILTERED_ALL:
        endpoint =
          allEndpoint[0] === "/"
            ? endpoint + allEndpoint
            : `${endpoint}/${allEndpoint}`;
        break;
      case ExportType.PAGE:
        endpoint =
          pageEndpoint[0] === "/"
            ? endpoint + pageEndpoint
            : `${endpoint}/${pageEndpoint}`;
        break;
    }

    return getInternalURL(
      InternalURL.NEXT_PUBLIC_API_URL,
      endpoint + getExportParams(type)
    );
  };

  if (!pagesExport && !filteredAllExport && !allExport) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...togglerProps}>
          <FileSpreadsheetIcon /> Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent {...contentProps}>
        <DropdownMenuGroup>
          {pagesExport && (
            <DropdownMenuItem asChild>
              <a
                href={getExportHref(ExportType.PAGE)}
                className="flex justify-between items-center cursor-pointer"
                target="_blank"
              >
                <span>Página Atual</span>
                <Badge
                  color="success"
                  title="Esta opção respeita os filtros aplicados"
                >
                  <CheckIcon /> Filtros
                </Badge>
              </a>
            </DropdownMenuItem>
          )}
          {filteredAllExport && (
            <DropdownMenuItem asChild>
              <a
                href={getExportHref(ExportType.FILTERED_ALL)}
                className="flex justify-between items-center cursor-pointer"
                target="_blank"
              >
                <span>Todas as Páginas</span>
                <Badge
                  color="success"
                  title="Esta opção respeita os filtros aplicados"
                >
                  <CheckIcon /> Filtros
                </Badge>
              </a>
            </DropdownMenuItem>
          )}
          {allExport && (
            <DropdownMenuItem asChild>
              <a
                href={getExportHref(ExportType.ALL)}
                className="flex justify-between items-center cursor-pointer"
                target="_blank"
              >
                <span>Tudo</span>
                <Badge
                  color="destructive"
                  title="Esta opção ignora os filtros aplicados"
                >
                  <XIcon /> Filtros
                </Badge>
              </a>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
