import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import DeleteModal from "@/components/ui/delete-modal";
import {
  DialogContentProps,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export type CrudDeleteModalProps = Pick<DialogContentProps, "size"> & {
  open: boolean;
  setOpen: (open: boolean) => void;
  endpoint: string;
  title?: string | ReactNode;
  masculine?: boolean;
  identifier?: string;
  element?: { id: string; [key: string]: any } | null;
};

export default function CrudDeleteModal({
  open,
  setOpen,
  endpoint,
  title = "Elemento",
  masculine = true,
  element = null,
  size = "lg",
  identifier = "id",
}: CrudDeleteModalProps) {
  const { refresh, setPage, data, page } = useAutoTable();

  if (!element) return <></>;

  const onRemove = () => {
    if (page === 1) return refresh();

    if (data.length === 1) return setPage(page - 1);

    refresh();
  }

  return (
    <DeleteModal
      endpoint={`${endpoint}/${element?.id ?? ""}`}
      open={open}
      setOpen={setOpen}
      onFinish={onRemove}
      successMessage={`${title} removid${masculine ? "o" : "a"} com sucesso!`}
      errorMessage={`falha ao remover ${
        masculine ? "o" : "a"
      } ${title}. Verifique sua conexão e, caso o problema persista, contate o suporte!`}
      size={size}
    >
      <>
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 max-w-[230px] ">
            {title}
          </DialogTitle>
        </DialogHeader>
        <p>
          Atenção, você está prestes a remover {masculine ? "o" : "a"} {title}{" "}
          <b>{element ? element[identifier] : ""}</b>, esta ação é irreversível!
        </p>
      </>
    </DeleteModal>
  );
}
