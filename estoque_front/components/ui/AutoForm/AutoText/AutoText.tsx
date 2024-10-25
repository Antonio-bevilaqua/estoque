import React from "react";
import AutoField from "../AutoField/AutoField";
import { Label } from "../../label";
import { Input } from "../../input";
import { cn } from "@/lib/utils";
import { FieldValue } from "../Types/AutoFormTypes";
import { Textarea } from "../../textarea";

export type AutoTextProps = {
  name: string;
  label: string;
  labelClassName?: string;
  className?: string;
  type?: string;
  index?: number | null;
  onChange?: (value: FieldValue) => any | null;
  inputProps?: { [key: string]: any };
};

export default function AutoText({
  name,
  label,
  labelClassName = "",
  className = "",
  onChange = null,
  index = null,
  inputProps = {},
}: AutoTextProps) {
  return (
    <AutoField
      name={name}
      className={cn("flex-1", className)}
      onChange={onChange}
      index={index}
      render={({ field, error, errorMessage }) => {
        if ("mapVal" in field) delete field.mapVal;
        return (
          <>
            <Label className={labelClassName} htmlFor={name}>
              {label}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                className={`px-4 ${error ? "border-red-500" : ""}`}
                {...field}
                {...inputProps}
              />
            ) : (
              <Input
                className={`px-4 ${error ? "border-red-500" : ""}`}
                {...field}
                {...inputProps}
              />
            )}
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
