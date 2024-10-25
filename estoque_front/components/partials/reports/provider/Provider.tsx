import { StateContext } from "@/lib/type";
import { Report } from "@/types/Report";
import React, { ReactNode, useState } from "react";

type ReportsState = {
  modal: boolean;
  report: Report | null;
  loading: boolean;
  initialized: boolean;
};

export const ReportsContext =
  React.createContext<StateContext<ReportsState>>(null);

export default function Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReportsState>({
    modal: false,
    report: null,
    loading: true,
    initialized: false,
  });
  return (
    <ReportsContext.Provider value={{ state, setState }}>
      {children}
    </ReportsContext.Provider>
  );
}
