import React, { useState } from "react";
import { AutoSelectOption } from "../AutoSelect";
import { ComponentWithChildren, StateContext } from "@/lib/type";

export type OptionsStateType = {
  [key: string]: AutoSelectOption[];
};

export const OptionsContext =
  React.createContext<StateContext<OptionsStateType> | null>(null);

export default function OptionsProvider({ children }: ComponentWithChildren) {
  const [state, setState] = useState<OptionsStateType>(null);
  return (
    <OptionsContext.Provider value={{ state, setState }}>
      {children}
    </OptionsContext.Provider>
  );
}
