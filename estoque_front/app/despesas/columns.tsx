import { TableColumn } from "@/components/ui/AutoTable/types/TableTypes";
import CrudOptions from "@/components/ui/Crud/options";
import DateTime from "@/lib/DateTime";
import { moneyMask } from "@/lib/masks";
import { getApiImgSrc, pad } from "@/lib/utils";
import DefaultImage from "@/public/images/watermark/no-image.jpg";
import { Expense } from "@/types/Expense";

export const columns: TableColumn<Expense>[] = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    isNumber: true,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">
        #{pad(element.id.toString(), "0", 6)}{" "}
      </div>
    ),
  },
  {
    name: "Título",
    selector: "titulo",
    sortable: true,
    isNumber: false,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">
        <div className="truncate">{element.title ?? "N/A"}</div>
      </div>
    ),
  },
  {
    name: "Descrição",
    selector: "descricao",
    sortable: false,
    isNumber: false,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">{element.description}</div>
    ),
  },
  {
    name: "Valor",
    selector: "valor",
    sortable: true,
    isNumber: true,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">
        R$ {moneyMask(element.value.toFixed(2))}
      </div>
    ),
  },
  {
    name: "Valor",
    selector: "valor",
    sortable: true,
    isNumber: true,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">
        R$ {moneyMask(element.value.toFixed(2))}
      </div>
    ),
  },
  {
    name: "Data",
    selector: "criacao",
    sortable: true,
    isNumber: true,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">
        {new DateTime(element.updated_at).format()}
      </div>
    ),
  },
  {
    name: "Ações",
    selector: "acoes",
    sortable: false,
    isNumber: false,
    render: (element: Expense) => (
      <div className="flex gap-4 items-center">
        <CrudOptions element={element} />
      </div>
    ),
  },
];
