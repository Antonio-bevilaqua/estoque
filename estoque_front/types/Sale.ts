import { Model } from "./Model";
import { SaleProduct } from "./Product";

export interface Sale extends Model {
  subtotal: number;
  discount: number;
  total: number;
  observations: string;
  products?: SaleProduct[];
}
