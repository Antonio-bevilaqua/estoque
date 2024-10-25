import AutoForm from "@/components/ui/AutoForm";
import DateTime from "@/lib/DateTime";
import { moneyMask } from "@/lib/masks";
import { ComponentWithChildren } from "@/lib/type";
import { min, required } from "@/lib/validations";
import { SaleProduct } from "@/types/Product";
import { Sale } from "@/types/Sale";

export default function Form({
  children,
  sale = null,
}: ComponentWithChildren & { sale?: Sale | null }) {
  console.log('sale inside', sale);
  return (
    <AutoForm
      autoFormFields={[
        {
          id: "products",
          name: "products",
          value: sale
            ? sale.products.map((product: SaleProduct) => product.id.toString())
            : [""],
          validations: [required],
        },
        {
          id: "quantities",
          name: "quantities",

          value: sale
            ? sale.products.map((product: SaleProduct) => product.pivot.quantity.toString())
            : [""],
          validations: [required, min(1)],
        },
        {
          id: "observations",
          name: "observations",
          value: sale?.observations ?? "",
        },
        {
          id: "date",
          name: "date",
          type: "date",
          value: new DateTime(sale ? sale.created_at : null).format(
            "YYYY-MM-DD"
          ),
          validations: [required],
        },
        {
          id: "time",
          name: "time",
          type: "time",
          value: new DateTime(sale ? sale.created_at : null).format("HH:mm"),
          validations: [required],
        },
        {
          id: "subtotal",
          name: "subtotal",
          readOnly: true,
          value: sale ? moneyMask(sale.subtotal.toFixed(2)) : "",
          validations: [required],
          mask: moneyMask,
        },
        {
          id: "discount",
          name: "discount",
          value: sale ? moneyMask(sale.discount.toFixed(2)) : moneyMask("0.00"),
          validations: [min(0)],
          mask: moneyMask,
        },
        {
          id: "total",
          name: "total",
          readOnly: true,
          value: sale ? moneyMask(sale.total.toFixed(2)) : "",
          validations: [required],
          mask: moneyMask,
        },
      ]}
    >
      {children}
    </AutoForm>
  );
}
