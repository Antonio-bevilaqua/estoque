import AutoFile from "@/components/ui/AutoForm/AutoFile/AutoFile";
import {
  AutoFormInitializer,
  AutoFormInitializerField,
} from "@/components/ui/AutoForm/Types/AutoFormTypes";
import { moneyMask } from "@/lib/masks";
import { getApiImgSrc } from "@/lib/utils";
import { TableProduct } from "@/types/Product";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";

export const getFields = (
  defaultValues: TableProduct | null = null
): AutoFormInitializer => [
  {
    id: "picture",
    name: "picture",
    label: "Foto",
    type: "file",
    render: (field: AutoFormInitializerField) => (
      <>
        {defaultValues?.picture ? (
          <Image
            src={getApiImgSrc(defaultValues.picture)}
            alt="Foto do produto"
            width={100}
            height={100}
            className="rounded-sm"
          />
        ) : (
          ""
        )}
        <AutoFile name={field.name} label={field.label ?? ""}>
          <UploadCloudIcon className="mr-2" />{" "}
          {`${field.multiple ? "Escolher Arquivos" : "Escolher Arquivo"}`}
        </AutoFile>
      </>
    ),
  },
  {
    id: "name",
    name: "name",
    label: "Nome *",
    value: defaultValues?.name ?? "",
  },
  {
    id: "value",
    name: "value",
    label: "Valor *",
    mask: moneyMask,
    value: defaultValues?.value
      ? moneyMask(defaultValues.value.toFixed(2))
      : "",
  },
  {
    id: "stock",
    name: "stock",
    label: "Estoque *",
    type: "number",
    value: defaultValues?.stock ?? "",
  },
  {
    id: "description",
    name: "description",
    label: "Descrição",
    value: defaultValues?.description ?? "",
  },
];
