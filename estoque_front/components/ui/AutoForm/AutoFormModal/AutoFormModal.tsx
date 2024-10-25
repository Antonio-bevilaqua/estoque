"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import React, { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogFooter,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import useApi from "@/hooks/use-api";
import { idGenerator } from "@/lib/id-generator";
import { HttpMethods, struct } from "@/lib/type";
import { endpointWithParams } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { DialogClose } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import AutoForm from "..";
import AutoInput from "../AutoInput/AutoInput";
import SubmitButton, { SubmitButtonProps } from "../SubmitButton/SubmitButton";
import {
  AutoFormInitializer,
  AutoFormInitializerField,
} from "../Types/AutoFormTypes";

type AutoFormModalProps = Pick<DialogContentProps, "size"> & {
  endpoint: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  submitProps: Omit<SubmitButtonProps, "loading" | "onSubmit" | "asForm">;
  fields: AutoFormInitializer;
  onStart?: Function | null;
  onFinish?: Function | null;
  method?: HttpMethods;
  children?: ReactNode;
  asForm?: boolean;
  autoRender?: boolean;
  dismissProps?: Omit<ButtonProps, "type" | "children">;
  successMessage?: string;
  errorMessage?: string | null;
};

export default function AutoFormModal({
  endpoint,
  open,
  setOpen,
  fields,
  submitProps,
  method = HttpMethods.POST,
  onStart = null,
  onFinish = null,
  autoRender = true,
  asForm = false,
  children = "",
  size = "md",
  dismissProps = {
    color: "secondary",
  },
  successMessage = null,
  errorMessage = null,
}: AutoFormModalProps) {
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const onSubmit = async (data: FormData | struct<any>): Promise<void> => {
    if (typeof onStart === "function") onStart();
    setLoading(true);
    let response = null;
    if (method !== HttpMethods.GET) {
      response = await api[method](endpoint, data);
    } else {
      let newEndpoint = endpointWithParams(endpoint, data as struct);
      response = await api[method](newEndpoint);
    }

    setLoading(false);
    setOpen(false);
    if (response) {
      if (successMessage) toast.success(successMessage);
      if (typeof onFinish === "function") onFinish(response);
      return;
    }

    if (errorMessage) toast.error(errorMessage);
  };

  return (
    <AutoForm autoFormFields={fields}>
      <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
        <Dialog open={open} onOpenChange={(open: boolean) => setOpen(open)}>
          <DialogContent
            size={size}
            aria-describedby="content"
            className="overflow-y-auto max-h-screen"
          >
            <div className="max-h-[300px] sm:max-h-[80vh]   w-full ">
              <ScrollArea className="h-full p-5 ">
                <div className="grid gap-4">
                  {children}
                  {autoRender ? (
                    <>
                      {fields.map((field: AutoFormInitializerField) => (
                        <React.Fragment key={`${idGenerator()}`}>
                          {field.type === "hidden" ? (
                            <></>
                          ) : (
                            <AutoInput field={field} />
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </ScrollArea>
            </div>
            <DialogFooter className="px-5 py-3 pt-0 gap-2">
              <DialogClose asChild>
                <Button type="button" {...dismissProps}>
                  Cancelar{" "}
                  <Icon icon="heroicons:x-circle" className=" h-5 w-5 ml-2" />
                </Button>
              </DialogClose>
              <SubmitButton
                loading={loading}
                onSubmit={onSubmit}
                asForm={asForm}
                {...submitProps}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AutoForm>
  );
}
