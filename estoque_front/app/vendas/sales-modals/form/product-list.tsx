import AutoSelect from "@/components/ui/AutoForm/AutoSelect/AutoSelect";
import AutoText from "@/components/ui/AutoForm/AutoText/AutoText";
import useAutoForm from "@/components/ui/AutoForm/hook/use-auto-form";
import { Button } from "@/components/ui/button";
import { moneyMask } from "@/lib/masks";
import { Product } from "@/types/Product";
import { Icon } from "@iconify/react";
import { useContext, useEffect } from "react";
import { SalesModalsContext } from "../provider";

export default function ProductList() {
  const ctx = useContext(SalesModalsContext);

  const { fields, addFieldArrayValue, removeFieldArrayIndex, setValues } =
    useAutoForm();

  const addProductRow = () => {
    addFieldArrayValue("products");
    addFieldArrayValue("quantities");
  };

  const removeProductRow = (index: number) => {
    removeFieldArrayIndex("products", index);
    removeFieldArrayIndex("quantities", index);
  };

  const calculateValues = () => {
    let finalSubTotal = 0;
    let hasChange = false;
    let totalValue = fields.total.value;
    totalValue = totalValue !== "" ? Number(totalValue.replace(",", ".")) : 0;
    for (let i = 0; i < fields.products.value.length; i++) {
      let productValue = fields.products.value[i];
      let quantity = fields.quantities.value[i];
      if (productValue === "") continue;
      if (quantity === "") continue;
      quantity = Number(quantity);
      let product = ctx.state.products.find(
        (product: Product) => product.id.toString() === productValue.toString()
      );
      console.log(product, ctx.state.products);
      if (!product) throw new Error(`Invalid product value ${productValue}`);

      hasChange = true;
      finalSubTotal += product.value * quantity;
    }
    //caso não haja mudanças é necessário sair da função ou o useEffect vai ficar rodando pra sempre
    if (!hasChange) return;

    let finalDiscount = Number(fields.discount.value.replace(",", "."));

    if (finalDiscount > finalSubTotal) {
      finalDiscount = finalSubTotal;
    }
    let finalTotal = finalSubTotal - finalDiscount;
    if (finalTotal === totalValue) return;

    setValues({
      subtotal: moneyMask(finalSubTotal.toFixed(2)),
      total: moneyMask(finalTotal.toFixed(2)),
    });
  };

  useEffect(() => {
    calculateValues();
  }, [fields]);

  return (
    <div className="pb-1 flex flex-wrap gap-4">
      <h4 className="mt-4">
        <Button onClick={addProductRow}>
          <Icon icon="heroicons:plus" className="w-5 h-5 mr-1" /> Produto
        </Button>
      </h4>
      {fields.products.value.map((_: any, index: number) => (
        <div
          key={`products_${index}`}
          className="rounded-md p-4 border w-full flex items-start gap-2"
        >
          <AutoSelect
            name="products"
            label={`Produto ${index + 1} *`}
            index={index}
            className="flex-1"
            options={ctx.state.products
              .filter((product: Product) => {
                const productIdx = fields.products.value.indexOf(
                  product.id.toString()
                );
                if (productIdx < 0) {
                  return true;
                }

                return productIdx === index;
              })
              .map((product: Product) => ({
                label: product.name,
                value: product.id.toString(),
              }))}
            isLoading={ctx.state.loading}
          />
          <AutoText
            name="quantities"
            label={`Qtd. ${index + 1} *`}
            index={index}
            className="max-w-[100px]"
            inputProps={{
              disabled: ctx.state.loading,
            }}
          />
          {index > 0 && (
            <Button
              onClick={() => removeProductRow(index)}
              size="icon"
              color="destructive"
              className="mt-[1.25rem]"
            >
              <Icon icon="heroicons:trash" className="h-5 w-5" />
            </Button>
          )}
        </div>
      ))}
      <AutoText
        name="date"
        label="Data *"
        inputProps={{
          disabled: ctx.state.loading,
        }}
      />
      <AutoText
        name="time"
        label="Hora *"
        inputProps={{
          disabled: ctx.state.loading,
        }}
      />
      <AutoText
        name="subtotal"
        label="Subtotal *"
        inputProps={{
          disabled: ctx.state.loading,
        }}
      />
      <AutoText
        name="discount"
        label="Desconto *"
        inputProps={{
          disabled: ctx.state.loading,
        }}
      />
      <AutoText
        name="total"
        label="Total *"
        inputProps={{
          disabled: ctx.state.loading,
        }}
      />
      <div className="w-full d-block">
        <AutoText
          name="observations"
          label="Observações"
          className="w-full"
          inputProps={{
            disabled: ctx.state.loading,
          }}
        />
      </div>
    </div>
  );
}
