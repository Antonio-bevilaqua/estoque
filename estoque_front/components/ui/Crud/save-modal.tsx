import AutoFormModal from "@/components/ui/AutoForm/AutoFormModal/AutoFormModal";
import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import {
  DialogContentProps,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { AutoFormInitializer } from "../AutoForm/Types/AutoFormTypes";

export type CrudSaveModalProps = Pick<DialogContentProps, "size"> & {
  endpoint: string;
  open: boolean;
  fieldGetter: (element: any) => AutoFormInitializer;
  setOpen: (open: boolean) => void;
  title?: string | ReactNode;
  masculine?: boolean;
  successMessage?: string;
  errorMessage?: string;
  element: any;
  asForm?: boolean;
};

export default function CrudSaveModal({
  open,
  setOpen,
  endpoint,
  fieldGetter,
  element,
  title = "Elemento",
  masculine = true,
  size = "lg",
  asForm = false,
}: CrudSaveModalProps) {
  const { refresh } = useAutoTable();

  if (!element) return <></>;

  return (
    <AutoFormModal
      endpoint={`${endpoint}/${element.id}`}
      open={open}
      setOpen={setOpen}
      onFinish={refresh}
      asForm={asForm}
      successMessage={`${title} ${`atualizad${
        masculine ? "o" : "a"
      }`} com sucesso!`}
      errorMessage={`falha ao atualizar ${
        masculine ? "o" : "a"
      } ${title}, verifique sua conexão e, caso o problema persista, contate o suporte`}
      size={size}
      fields={fieldGetter(element)}
      submitProps={{
        text: "Salvar Alterações",
      }}
      dismissProps={{
        variant: "soft_bordered",
        color: "secondary",
      }}
    >
      <>
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 max-w-[230px] ">
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="pt-2">
          Para atualizar {masculine ? "o" : "a"} {title}, preencha / altere os
          campos abaixo e envie o formulário.
        </p>
      </>
    </AutoFormModal>
  );
}
