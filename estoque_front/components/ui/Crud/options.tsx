import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { ModalOptionsContext } from "./provider";
import { useRouter } from "next/navigation";

function CrudOptions({
  element,
  viewRoute = null,
  withEdit = true,
  withRemove = true,
}: {
  element: any;
  viewRoute?: string | null;
  withEdit?: boolean;
  withRemove?: boolean;
}) {
  const router = useRouter();
  const { state, setState } = useContext(ModalOptionsContext);

  const viewContent = () => {
    if (viewRoute !== null) router.push(viewRoute);
  };

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
          {withEdit && (
            <DropdownMenuItem
              onClick={() =>
                setState({ ...state, editOpen: true, element: element })
              }
              className="w-full flex justify-between cursor-pointer"
            >
              Editar
              <Icon
                icon="heroicons:pencil"
                className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
              />
            </DropdownMenuItem>
          )}
          {viewRoute !== null && (
            <DropdownMenuItem
              onClick={viewContent}
              className="w-full flex justify-between cursor-pointer"
            >
              Visualizar
              <Icon
                icon="heroicons:eye"
                className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
              />
            </DropdownMenuItem>
          )}
          {withRemove && (
            <DropdownMenuItem
              onClick={() =>
                setState({ ...state, removeOpen: true, element: element })
              }
              className="w-full flex justify-between cursor-pointer"
            >
              Remover
              <Icon
                icon="heroicons:trash"
                className=" h-5 w-5 ltr:ml-2 rtl:mr-2 "
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default CrudOptions;
