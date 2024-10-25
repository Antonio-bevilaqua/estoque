import React, { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, defaultToast = true, toastMessage = "Successfully deleted",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  defaultToast?: boolean;
  toastMessage?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
    if (defaultToast) {
      toast.success(toastMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser revertida. Você irá remover permanentemente os dados do servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={isPending ? "pointer-events-none" : ""}
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Removendo.." : "Prosseguir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
