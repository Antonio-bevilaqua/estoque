import React from "react";
import AutoFileInput from "../AutoFileInput/AutoFileInput";
import AutoFileInputPreviewer from "../AutoFileInput/Previewer/AutoFileInputPreviewer";
import { AutoFileInputProps } from "../AutoFileInput/types";
import { Label } from "../../label";
import { Button } from "../../button";
import { ComponentWithChildren } from "@/lib/type";

type AutoFile = Omit<AutoFileInputProps, "render"> &
  ComponentWithChildren & {
    label?: string | null;
  };

export default function AutoFile({
  name,
  label = null,
  children,
}: AutoFile) {
  return (
    <>
      <AutoFileInput
        name={name}
        className="flex-1"
        render={({ toggle, error, errorMessage, totalFiles }) => {
          return (
            <>
              {label && <Label htmlFor={name}>{label}</Label>}
              <br />
              <Button
                type="button"
                onClick={toggle}
                className={`px-4 ${error ? "border-red-500" : ""} py-2`}
              >
                {children}
              </Button>
              <br />
              <span className="text-muted-foreground text-sm">
                {totalFiles > 1
                  ? `${totalFiles} Arquivos selecionados.`
                  : totalFiles > 0
                  ? "1 arquivo selecionado."
                  : "Nenhum arquivo selecionado."}
              </span>
              {error && (
                <div className="mt-2">
                  <Label className="text-red-500 text-sm" htmlFor={name}>
                    {errorMessage}
                  </Label>
                </div>
              )}
            </>
          );
        }}
      />
      <AutoFileInputPreviewer name={name} />
    </>
  );
}
