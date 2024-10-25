import { AutoFormContext } from "@/components/ui/AutoForm/Context/AutoFormProvider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useContext } from "react";

export default function AutoSwitch({ name }: { name: string }) {
  const { fields, setValue } = useContext(AutoFormContext);

  return (
    <div className={"w-full md:min-w-[250px]"}>
      <div className="flex items-center space-x-2.5">
        <Switch
          id={fields[name].name}
          checked={Number(fields[name].value) === 1}
          onClick={() => {
            setValue(
              fields[name].name,
              Number(fields[name].value) === 1 ? 0 : 1
            );
          }}
        />
        <Label
          htmlFor={fields[name].name}
          className="text-base text-muted-foreground  font-normal"
        >
          {fields[name].label}
        </Label>
      </div>
      {fields[name].error && (
        <Label className="text-red-500 text-sm" htmlFor={fields[name].name}>
          {fields[name].errorMessage}
        </Label>
      )}
    </div>
  );
}
