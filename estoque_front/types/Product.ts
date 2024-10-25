import { Model } from "./Model";

export interface Product extends Model {
  uuid: string;
  barcode?: string | null;
  name: string;
  description?: string | null;
  picture?: string | null;
  value: number;
  stock: number;
  quantity?: number;
}

export interface TableProduct extends Product {
  total_sales: number;
}

export interface SaleProduct extends Product {
  pivot: {
    sale_id: number;
    product_id: number;
    quantity: number;
  };
}
