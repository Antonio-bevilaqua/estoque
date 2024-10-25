import { ComponentWithChildren } from "@/lib/type";
import React, { useState } from "react";

type OptionsStateProps = {
  newOpen: boolean;
  editOpen: boolean;
  removeOpen: boolean;
  element: any | null;
};

type CtxProps = {
  state: OptionsStateProps;
  setState: (state: OptionsStateProps) => void;
};

export const ModalOptionsContext = React.createContext<CtxProps | null>(null);

export default function CrudOptionsProvider({
  children,
}: ComponentWithChildren) {
  const [state, setState] = useState<OptionsStateProps>({
    newOpen: false,
    editOpen: false,
    removeOpen: false,
    element: null,
  });
  return (
    <ModalOptionsContext.Provider value={{ state, setState }}>
      {children}
    </ModalOptionsContext.Provider>
  );
}
