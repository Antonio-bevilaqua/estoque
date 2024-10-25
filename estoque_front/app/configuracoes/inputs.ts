import { AutoFormInitializer } from "@/components/ui/AutoForm/Types/AutoFormTypes";
import { alphaMask, CNPJmask, phoneMask } from "@/lib/masks";
import { cnpj, email, required } from "@/lib/validations";

export const inputs: AutoFormInitializer = [
  {
    name: "company",
    label: "Empresa",
    value: "",
    mask: alphaMask,
    validations: [required],
  },
  {
    name: "cnpj",
    label: "CNPJ",
    mask: CNPJmask,
    value: "",
    validations: [cnpj],
  },
  {
    name: "whatsapp",
    label: "Whatsapp",
    value: "",
  },
  {
    name: "phone",
    label: "Telefone",
    mask: phoneMask,
    value: "",
  },
  {
    name: "email",
    label: "Email",
    value: "",
    validations: [required, email],
  },
];
