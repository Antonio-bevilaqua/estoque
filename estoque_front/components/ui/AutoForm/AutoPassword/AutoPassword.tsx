import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Input } from "../../input";
import { Label } from "../../label";
import AutoField from "../AutoField/AutoField";
import { AutoTextProps } from "../AutoText/AutoText";

export default function AutoPassword({
  name,
  label,
  labelClassName = "",
  className = "",
  index = null,
  onChange = null,
  inputProps = {},
}: AutoTextProps) {
  const [type, setType] = useState("password");
  return (
    <AutoField
      name={name}
      className={cn("flex-1", className)}
      onChange={onChange}
      index={index}
      render={({ field, error, errorMessage }) => {
        if ("mapVal" in field) delete field.mapVal;
        if ("type" in field) delete field.type;
        if ("type" in inputProps) delete inputProps.type;
        return (
          <>
            <Label className={labelClassName} htmlFor={name}>
              {label}
            </Label>
            <div className="relative">
              <Input
                className={`px-4 ${error ? "border-red-500" : ""}`}
                {...field}
                {...inputProps}
                type={type}
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                onClick={() => setType(type === "password" ? "text" : "password")}
              >
                {type === "password" ? (
                  <Icon
                    icon="heroicons:eye"
                    className="w-5 h-5 text-default-400"
                  />
                ) : (
                  <Icon
                    icon="heroicons:eye-slash"
                    className="w-5 h-5 text-default-400"
                  />
                )}
              </div>
            </div>
            {error && (
              <Label className="text-red-500 text-sm" htmlFor={name}>
                {errorMessage}
              </Label>
            )}
          </>
        );
      }}
    />
  );
}
