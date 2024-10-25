import { Expense } from "./Expense";
import { Product } from "./Product";
import { Sale } from "./Sale";

export type Report = {
  sales: Sale[];
  products: Array<Product & { quantity: number }>;
  expenses: Expense[];
  subtotal_value: number;
  discount_value: number;
  expenses_value: number;
  total_value: number;
};
