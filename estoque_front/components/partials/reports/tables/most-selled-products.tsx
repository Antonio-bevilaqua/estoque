import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportsContext } from "../provider/Provider";
import DefaultImage from "@/public/images/watermark/no-image.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiImgSrc } from "@/lib/utils";
import { Product } from "@/types/Product";
import { moneyMask } from "@/lib/masks";
import { StarIcon } from "lucide-react";

export default function MostSelledProducts() {
  const { state } = useContext(ReportsContext);

  return (
    <div className="mt-4">
      <hr />
      <h4 className="text-lg mt-5 pb-0 flex gap-2">
        Top 3 Produtos Vendidos <StarIcon />
      </h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.loading ? (
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-4" />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {state.report.products
                .sort((a: Product, b: Product) => b.quantity - a.quantity)
                .filter((_: Product, index: number) => index < 3)
                .map((product: Product) => (
                  <TableRow key={`most-selled-${product.id}`}>
                    <TableCell>
                      <div className="flex gap-4 items-center">
                        <div
                          className="rounded-sm w-[20px] h-[20px] shadow-sm"
                          style={{
                            backgroundImage: `url(${
                              product.picture
                                ? getApiImgSrc(product.picture)
                                : DefaultImage.src
                            })`,
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                          }}
                        />
                        <div className="truncate">{product.name ?? "N/A"}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      R${" "}
                      {moneyMask((product.value * product.quantity).toFixed(2))}
                    </TableCell>
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
