import { cn } from "@/lib/utils";
import { Input } from "../../input";
import { Label } from "../../label";
import AutoComposedField from "../AutoComposedField/AutoComposedField";
import { FieldValue } from "../Types/AutoFormTypes";

export default function AutoComposedText({
  name,
  index,
  label,
  className = "",
  onChange = null,
}: {
  name: string;
  index: number;
  label: string;
  className?: string;
  onChange?: (value: string) => any | null;
}) {
  return (
    <AutoComposedField
      name={name}
      index={index}
      className={cn("flex-1", className)}
      onChange={(value: FieldValue) => onChange(value as string)}
      render={({ field, error, errorMessage }) => (
        <>
          <Label htmlFor={name}>{label}</Label>
          <Input
            className={`px-4 ${error ? "border-red-500" : ""}`}
            {...field}
          />
          {error && (
            <Label className="text-red-500 text-sm" htmlFor={name}>
              {errorMessage}
            </Label>
          )}
        </>
      )}
    />
  );
}
