import { Model } from "./Model";

export interface Configuration extends Model {
  company: string;
  cnpj?: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  email: string;
}
