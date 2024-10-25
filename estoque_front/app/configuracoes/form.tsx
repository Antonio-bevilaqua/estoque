import AutoText from "@/components/ui/AutoForm/AutoText/AutoText";
import useAutoForm from "@/components/ui/AutoForm/hook/use-auto-form";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import useApi from "@/hooks/use-api";
import { struct } from "@/lib/type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const autoForm = useAutoForm();
  const [state, setState] = useState(true);
  const api = useApi();
  const getData = async () => {
    setState(true);
    const response = await api.get("configurations");
    autoForm.setValues({ ...response });
    setState(false);
  };

  const onSubmit = async (data: struct) => {
    const response = await api.post("configurations", data);
    if (response) {
      autoForm.setValues({ ...response });
      toast.success("Configurações atualizadas com sucesso!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid gap-4">
      <AutoText label="Empresa" name="company" inputProps={{ disabled: state }} />
      <AutoText label="CNPJ" name="cnpj" inputProps={{ disabled: state }} />
      <AutoText label="Whatsapp" name="whatsapp" inputProps={{ disabled: state }} />
      <AutoText label="Telefone" name="phone" inputProps={{ disabled: state }} />
      <AutoText label="Email" name="email" inputProps={{ disabled: state }} />

      <SubmitButton
        text="Salvar Alterações"
        loading={state}
        onSubmit={onSubmit}
      />
    </div>
  );
}
