import { TableColumn } from "@/components/ui/AutoTable/types/TableTypes";
import DateTime from "@/lib/DateTime";
import { moneyMask } from "@/lib/masks";
import { getApiImgSrc, pad } from "@/lib/utils";
import { SaleProduct } from "@/types/Product";
import DefaultImage from "@/public/images/watermark/no-image.jpg";
import { Sale } from "@/types/Sale";
import Options from "./options";

export const columns: TableColumn<Sale>[] = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    isNumber: true,
    render: (sale: Sale) => (
      <div className="flex gap-4 items-center">
        #{pad(sale.id.toString(), "0", 6)}{" "}
      </div>
    ),
  },
  {
    name: "Produtos",
    selector: "produtos",
    sortable: false,
    isNumber: false,
    render: (sale: Sale) => (
      <div className="grid gap-2 items-center">
        {sale.products.map((product: SaleProduct) => (
          <div key={`${sale.id}-${product.id}`} className="flex gap-2">
            <div
              className="rounded-sm w-[1rem] h-[1rem] shadow-sm"
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
            {product.name} (x{product.pivot.quantity})
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Subtotal",
    selector: "subtotal",
    sortable: true,
    isNumber: true,
    render: (sale: Sale) => (
      <div className="flex gap-4 items-center">
        R$ {moneyMask(sale.subtotal.toFixed(2))}
      </div>
    ),
  },
  {
    name: "Desconto",
    selector: "desconto",
    sortable: true,
    isNumber: true,
    render: (sale: Sale) => (
      <div className="flex gap-4 items-center">
        R$ {moneyMask(sale.discount.toFixed(2))}
      </div>
    ),
  },
  {
    name: "Total",
    selector: "total",
    sortable: true,
    isNumber: true,
    render: (sale: Sale) => (
      <div className="flex gap-4 items-center">
        R$ {moneyMask(sale.total.toFixed(2))}
      </div>
    ),
  },
  {
    name: "Observações",
    selector: "observacoes",
    sortable: false,
    isNumber: false,
    render: (sale: Sale) => (
      <div className="grid gap-4 items-center">{sale.observations}</div>
    ),
  },
  {
    name: "Data",
    selector: "criacao",
    sortable: true,
    isNumber: false,
    render: (sale: Sale) => (
      <div className="flex gap-4 items-center">
        {new DateTime(sale.created_at).format()}
      </div>
    ),
  },
  {
    name: "Ações",
    selector: "acoes",
    sortable: false,
    isNumber: false,
    render: (sale: Sale) => (
      <div className="flex gap-4 items-center">
        <Options element={sale} />
      </div>
    ),
  },
];
