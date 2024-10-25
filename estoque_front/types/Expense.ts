import { Model } from "./Model";

export interface Expense extends Model {
  title: string;
  description?: string | null;
  value: number;
}
