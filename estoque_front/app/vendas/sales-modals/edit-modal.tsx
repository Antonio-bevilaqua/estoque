import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { SalesModalsContext } from "./provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import Form from "./form/form";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import SubmitButton from "@/components/ui/AutoForm/SubmitButton/SubmitButton";
import { struct } from "@/lib/type";
import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import useApi from "@/hooks/use-api";
import ProductList from "./form/product-list";
import toast from "react-hot-toast";

export default function EditModal() {
  const api = useApi();
  const { refresh } = useAutoTable();
  const { state, setState } = useContext(SalesModalsContext);
  const onUpdate = async (values: struct) => {
    if (!state.element) return;

    setState((stt) => ({ ...stt, loading: true }));
    const response = await api.post(`sales/${state.element.id}`, values);
    if (response) {
      toast.success("Venda atualizada com sucesso!");
      refresh();
    }
    setState((stt) => ({
      ...stt,
      openEdit: false,
      element: null,
      loading: false,
    }));
  };

  if (!state.element || !state.openEdit) return <></>;

  return (
    <Form sale={state.element}>
      <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
        <Dialog
          open={state.openEdit}
          onOpenChange={(open: boolean) =>
            setState({ ...state, openEdit: open })
          }
        >
          <DialogContent
            size={"2xl"}
            aria-describedby="content"
            className="overflow-y-auto max-h-screen"
          >
            <div className="max-h-[300px] sm:max-h-[80vh]   w-full ">
              <ScrollArea className="h-full p-5 ">
                <div className="grid gap-4">
                  <DialogHeader>
                    <DialogTitle className="text-base font-medium text-default-700 max-w-[230px] ">
                      Editar Venda
                    </DialogTitle>
                  </DialogHeader>
                  <p>
                    Para editar a venda, preencha / altere os campos abaixo e
                    envie o formulário.
                  </p>
                  <ProductList />
                </div>
              </ScrollArea>
            </div>
            <DialogFooter className="px-5 py-3 pt-0 gap-2">
              <DialogClose asChild>
                <Button type="button" variant="soft_bordered" color="secondary">
                  Cancelar{" "}
                  <Icon icon="heroicons:x-circle" className=" h-5 w-5 ml-2" />
                </Button>
              </DialogClose>
              <SubmitButton
                loading={state.loading}
                onSubmit={onUpdate}
                text="Salvar Alterações"
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Form>
  );
}
