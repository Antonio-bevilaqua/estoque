import React, { useContext } from "react";
import { AutoFormContext } from "../Context/AutoFormProvider";
import { idGenerator } from "@/lib/id-generator";
import AutoInput from "../AutoInput/AutoInput";

export default function renderer() {
  const { fields } = useContext(AutoFormContext);
  return (
    <>
      {Object.keys(fields).map((key: string) => (
        <React.Fragment key={`${idGenerator()}`}>
          {fields[key].type === "hidden" ? <></> : <AutoInput field={fields[key]} />}
        </React.Fragment>
      ))}
    </>
  );
}
