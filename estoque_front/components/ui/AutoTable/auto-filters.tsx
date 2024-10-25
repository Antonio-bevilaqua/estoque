import React from "react";
import { struct } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Fragment, useContext, useEffect, useId } from "react";
import AutoSelect from "../AutoForm/AutoSelect/AutoSelect";
import AutoText from "../AutoForm/AutoText/AutoText";
import { AutoFormContext } from "../AutoForm/Context/AutoFormProvider";
import useAutoTable from "./hook/useAutoTable";

type AutoFiltersProps = {
  className?: string;
};

function AutoFilters({ className = "" }: AutoFiltersProps) {
  const { filters, filtersApplied } = useAutoTable();
  const { setValues } = useContext(AutoFormContext);
  const filtersId = useId();

  const getFields = () => {
    let fields: struct = {};
    for (let key in filters) {
      fields[key] = filtersApplied[key]?.value ?? "";
    }
    return fields;
  };

  useEffect(() => {
    setValues(getFields());
  }, [filtersApplied]);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row px-4 flex-wrap gap-2 md:max-w-2xl md:mx-auto",
        className
      )}
    >
      {Object.keys(filters).map((key: string) => (
        <Fragment key={`${filtersId}_${key}`}>
          {typeof filters[key].render === "function" ? (
            <>{filters[key].render()}</>
          ) : (
            <>
              {filters[key].type !== "select" ? (
                <AutoText name={key} label={filters[key].label} />
              ) : (
                <AutoSelect
                  name={key}
                  label={filters[key].label}
                  options={filters[key].options}
                />
              )}
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default AutoFilters;
