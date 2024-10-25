import { TableColumn } from "@/components/ui/AutoTable/types/TableTypes";
import CrudOptions from "@/components/ui/Crud/options";
import DateTime from "@/lib/DateTime";
import { moneyMask } from "@/lib/masks";
import { getApiImgSrc, pad } from "@/lib/utils";
import DefaultImage from "@/public/images/watermark/no-image.jpg";
import { TableProduct } from "@/types/Product";

export const columns: TableColumn<TableProduct>[] = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    isNumber: true,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">
        #{pad(product.id.toString(), "0", 6)}{" "}
      </div>
    ),
  },
  {
    name: "Nome",
    selector: "nome",
    sortable: true,
    isNumber: false,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">
        <div
          className="rounded-sm w-[30px] h-[30px] shadow-sm"
          style={{
            backgroundImage: `url(${
              product?.picture
                ? getApiImgSrc(product.picture)
                : DefaultImage.src
            })`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
        <div className="truncate">{product.name ?? "N/A"}</div>
      </div>
    ),
  },
  {
    name: "Estoque",
    selector: "estoque",
    sortable: true,
    isNumber: true,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">{product.stock}</div>
    ),
  },
  {
    name: "Valor",
    selector: "valor",
    sortable: true,
    isNumber: true,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">
        R$ {moneyMask(product.value.toFixed(2))}
      </div>
    ),
  },
  {
    name: "Vendas",
    selector: "vendas",
    sortable: true,
    isNumber: true,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">{product.total_sales}</div>
    ),
  },
  {
    name: "Criação",
    selector: "criacao",
    sortable: true,
    isNumber: false,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">
        {new DateTime(product.created_at).format()}
      </div>
    ),
  },
  {
    name: "Atualização",
    selector: "atualizacao",
    sortable: true,
    isNumber: false,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">
        {new DateTime(product.updated_at).format()}
      </div>
    ),
  },
  {
    name: "Ações",
    selector: "acoes",
    sortable: false,
    isNumber: false,
    render: (product: TableProduct) => (
      <div className="flex gap-4 items-center">
        <CrudOptions element={product} />
      </div>
    ),
  },
];

