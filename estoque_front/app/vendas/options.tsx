import { Button } from "@/components/ui/button";
import { ModalOptionsContext } from "@/components/ui/Crud/provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sale } from "@/types/Sale";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { SalesModalsContext } from "./sales-modals/provider";

export default function Options({ element }: { element: Sale }) {
  const optCtx = useContext(ModalOptionsContext);
  const salesCtx = useContext(SalesModalsContext);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="soft">
            Ações
            <Icon
              icon="heroicons:cog"
              className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[196px]" align="start">
          <DropdownMenuLabel className="w-full flex justify-between">
            Ações
            <Icon
              icon="heroicons:cog"
              className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
            />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              salesCtx.setState({
                ...salesCtx.state,
                openEdit: true,
                element: element,
              })
            }
            className="w-full flex justify-between cursor-pointer"
          >
            Editar
            <Icon
              icon="heroicons:pencil"
              className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              optCtx.setState({
                ...optCtx.state,
                removeOpen: true,
                element: element,
              })
            }
            className="w-full flex justify-between cursor-pointer"
          >
            Remover
            <Icon
              icon="heroicons:trash"
              className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
