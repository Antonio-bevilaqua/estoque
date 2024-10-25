import React, { useContext, useState } from "react";
import { OptionsContext } from "../provider/OptionsProvider";
import { AutoFormField } from "../../Types/AutoFormTypes";
import { AutoSelectOption } from "../AutoSelect";

type OptionsLoaderType = {
  getOptions: () => Promise<AutoSelectOption[]>;
  loading: boolean;
};

export default function useOptionsLoader(
  field: AutoFormField
): OptionsLoaderType {
  const [loading, setLoading] = useState(false);
  const ctx = useContext(OptionsContext);

  const getOptions = async (): Promise<AutoSelectOption[] | null> => {
    if (typeof field.optionsGetter !== "function") return null;

    if (ctx && ctx.state && ctx.state[field.name]) return ctx.state[field.name];

    setLoading(true);

    const result = await field.optionsGetter();

    setLoading(false);

    if (!result) return null;

    if (ctx) {
      ctx.setState((previous) => ({
        ...previous,
        [field.name]: [...result],
      }));
    }

    return result;
  };

  return {
    getOptions,
    loading,
  };
}
