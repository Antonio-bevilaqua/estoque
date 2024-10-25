"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";
import { HttpMethods, struct } from "@/lib/type";
import useApi from "@/hooks/use-api";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import { Icon } from "@iconify/react";

type DeleteModalProps = Pick<DialogContentProps, "size"> & {
  endpoint: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: struct;
  successMessage?: string;
  errorMessage?: string;
  children?: ReactNode;
  method?: HttpMethods;
  onFinish?: Function | null;
};

export default function DeleteModal({
  endpoint,
  open,
  setOpen,
  children = "",
  size = "md",
  data = {},
  successMessage = "Elemento removido com sucesso!",
  errorMessage = "Falha ao remover o elemento, verifique sua conexão e, caso o erro persista, contate o suporte!",
  method = HttpMethods.DELETE,
  onFinish = null,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const api = useApi();
  const onDelete = async () => {
    setLoading(true);
    let response = null;
    if (
      method === HttpMethods.POST ||
      method === HttpMethods.PATCH ||
      method === HttpMethods.PUT
    ) {
      response = await api[method](endpoint, data);
    } else {
      response = await api[method](endpoint);
    }
    setLoading(false);
    setOpen(false);

    if (response) {
      toast.success(successMessage);
      if (typeof onFinish === "function") onFinish(response);
      return;
    }

    toast.error(errorMessage);
  };

  return (
    <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
      <Dialog open={open} onOpenChange={(open: boolean) => setOpen(open)}>
        <DialogContent size={size} className="overflow-y-auto max-h-screen">
          <div className="max-h-[300px] sm:max-h-[600px] w-full ">
            <ScrollArea className="h-full p-5 ">
              <div className="grid gap-4">{children}</div>
            </ScrollArea>
          </div>
          <DialogFooter className="px-5 py-3 pt-0 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="soft_bordered" color="secondary">
                Cancelar
                <Icon icon="heroicons:x-circle" className=" h-5 w-5 ml-2" />
              </Button>
            </DialogClose>
            <Button
              onClick={onDelete}
              disabled={loading}
              type="button"
              color="destructive"
            >
              Remover{" "}
              {loading ? (
                <Loader2Icon className="animate-spin h-5 w-5 ml-2" />
              ) : (
                <Icon icon="heroicons:trash" className=" h-5 w-5 ml-2" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
