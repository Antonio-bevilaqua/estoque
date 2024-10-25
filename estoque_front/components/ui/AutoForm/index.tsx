import React, { ReactNode } from "react";
import { AutoFormInitializer } from "./Types/AutoFormTypes";
import AutoFormProvider from "./Context/AutoFormProvider";

const AutoForm = ({
  children,
  autoFormFields,
}: {
  children: ReactNode;
  autoFormFields: AutoFormInitializer;
}) => {
  return (
    <AutoFormProvider autoFormFields={autoFormFields}>
      {children}
    </AutoFormProvider>
  );
};

export default AutoForm;
