import React from "react";
import AutoFormModal from "@/components/ui/AutoForm/AutoFormModal/AutoFormModal";
import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import {
  DialogContentProps,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { AutoFormInitializer } from "../AutoForm/Types/AutoFormTypes";
import { Model } from "@/types/Model";

export type CrudSaveModalProps = Pick<DialogContentProps, "size"> & {
  endpoint: string;
  open: boolean;
  fieldGetter: (element: any) => AutoFormInitializer;
  setOpen: (open: boolean) => void;
  title?: string | ReactNode;
  masculine?: boolean;
  successMessage?: string;
  errorMessage?: string;
  element?: Model | null;
  asForm?: boolean;
};

export default function CrudRegisterModal({
  open,
  setOpen,
  endpoint,
  fieldGetter,
  title = "Elemento",
  masculine = true,
  size = "lg",
  asForm = false,
}: CrudSaveModalProps) {
  const { refresh } = useAutoTable();

  if (!open) return <></>;

  return (
    <AutoFormModal
      endpoint={`${endpoint}`}
      open={open}
      setOpen={setOpen}
      onFinish={refresh}
      asForm={asForm}
      successMessage={`${title} ${`cadastrad${
        masculine ? "o" : "a"
      }`} com sucesso!`}
      errorMessage={`falha ao cadastrar ${
        masculine ? "o" : "a"
      } ${title}, verifique sua conexão e, caso o problema persista, contate o suporte`}
      size={size}
      fields={fieldGetter(null)}
      submitProps={{
        text: "Cadastrar",
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
        <p>
          Para cadastrar {masculine ? "o" : "a"} {title}, preencha / altere os
          campos abaixo e envie o formulário.
        </p>
      </>
    </AutoFormModal>
  );
}
