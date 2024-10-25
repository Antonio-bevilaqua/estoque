import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useContext } from "react";
import { ModalOptionsContext } from "./provider";
import { Icon } from "@iconify/react";

export default function AddButton() {
  const { state, setState } = useContext(ModalOptionsContext);
  return (
    <Button
      type="button"
      onClick={() => setState({ ...state, newOpen: true, element: null })}
      variant="soft"
    >
      <Icon icon="heroicons:plus-circle" className=" h-5 w-5 mr-2 " /> Novo
    </Button>
  );
}
