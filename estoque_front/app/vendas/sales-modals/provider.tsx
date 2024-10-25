import useApi from "@/hooks/use-api";
import { ComponentWithChildren, StateContext } from "@/lib/type";
import { Product } from "@/types/Product";
import { Sale } from "@/types/Sale";
import React, { createContext, useEffect, useState } from "react";
import AddModal from "./add-modal";
import EditModal from "./edit-modal";

type ModalsState = {
  openRegister: boolean;
  openEdit: boolean;
  element: Sale | null;
  products: Product[];
  loading: boolean;
};

export const SalesModalsContext =
  createContext<StateContext<ModalsState>>(null);

export default function SalesProvider({ children }: ComponentWithChildren) {
  const api = useApi();
  const [state, setState] = useState<ModalsState>({
    openRegister: false,
    openEdit: false,
    element: null,
    products: [],
    loading: true,
  });
  useEffect(() => {
    const getProducts = async () => {
      setState({ ...state, loading: true });
      const response = await api.get<Product[]>("products/all");

      setState((actualValues) => ({
        ...actualValues,
        products: response ?? actualValues.products,
        loading: false,
      }));
    };

    getProducts();
  }, []);

  return (
    <SalesModalsContext.Provider value={{ state, setState }}>
      {children}
    </SalesModalsContext.Provider>
  );
}
