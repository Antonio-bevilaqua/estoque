import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useWindowResize from "@/hooks/use-window-resize";
import { struct } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { FilterIcon } from "lucide-react";
import React, { useState } from "react";
import SubmitButton from "../../AutoForm/SubmitButton/SubmitButton";
import { FieldValue } from "../../AutoForm/Types/AutoFormTypes";
import { Button } from "../../button";
import useAutoTable from "../hook/useAutoTable";
import AutoFilter from "./autoFilter";

export default function AutoFilterDrawer({
  children,
  className = "",
  btnText = "Filtrar",
  title = "Filtrar Tabela",
  description = "Altere os valores abaixo para filtrar a tabela",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  btnText?: string;
  title?: string;
  description?: string;
  [key: string]: any;
}) {
  const [open, setOpen] = useState(false);
  const { applyFilters } = useAutoTable();
  const { windowSize } = useWindowResize();

  const onSubmit = (values: struct<FieldValue> | FormData) => {
    const data = values as struct<FieldValue>;
    let filtersToApply: struct = {};
    for (let key in values) {
      filtersToApply[key] = {
        id: key,
        value: data[key].toString(),
      };
    }
    applyFilters(filtersToApply);
    setOpen(false);
  };

  return (
    <AutoFilter>
      <Drawer open={open}>
        <DrawerTrigger asChild>
          <Button
            className="
              w-full
              md:w-auto
              hover:ring-4
              transition
              md:mr-4
              text-md
            "
            onClick={() => setOpen(true)}
          >
            <FilterIcon size="1rem" className="mr-1" /> {btnText}
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className={cn("", className)}
          overlayClassName="bg-black/40"
          topbarClassname=""
          onOverlayClick={() => setOpen(false)}
          {...props}
        >
          <DrawerHeader className="mx-auto text-center">
            <DrawerTitle className="text-xl font-bold text-center flex justify-center">
              <FilterIcon className="mr-1" /> {title}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <div
            className={`max-h-[60dvh] md:max-h-auto overflow-y-auto scrollbar-mobile light-scrollbar `}
            {...(windowSize.height <= 768 ? { "data-vaul-no-drag": true } : {})}
          >
            {children}
          </div>
          <DrawerFooter className="md:mx-auto w-full md:max-w-2xl px-4 mt-4">
            <SubmitButton
              onSubmit={onSubmit}
              loading={false}
              asForm={false}
              color="primary"
              text={"Filtrar"}
            />
            <DrawerClose asChild>
              <Button
                color="destructive"
                className=" text-md font-bold transition hover:ring-4 hover:ring-white/20"
                onClick={() => setOpen(false)}
              >
                Cancelar{" "}
                <Icon icon="heroicons:x-circle" className=" h-5 w-5 ml-2 " />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </AutoFilter>
  );
}
