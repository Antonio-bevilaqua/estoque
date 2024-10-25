import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { SalesModalsContext } from "./provider";

export default function AddButton() {
  const { state, setState } = useContext(SalesModalsContext);
  return (
    <Button
      onClick={() => setState({ ...state, openRegister: true })}
      variant="soft"
    >
      <Icon icon="heroicons:plus-circle" className=" h-5 w-5 mr-2 " /> Novo
    </Button>
  );
}
