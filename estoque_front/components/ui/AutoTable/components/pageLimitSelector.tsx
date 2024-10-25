import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PageLimitSelector({
  value,
  setValue,
  label = "Itens",
  options = null,
  increment = 5,
  totalSelections = 5,
}: {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  options?: number[];
  increment?: number;
  totalSelections?: number;
}) {
  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Mostrar" />
      </SelectTrigger>
      <SelectContent>
        {options !== null ? (
          <>
            {options.map((option: number) => (
              <SelectItem
                key={`show_${option}`}
                value={option.toString()}
                className="cursor-pointer"
              >
                {option.toString()} {label}
              </SelectItem>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: totalSelections }).map((_, item) => (
              <SelectItem
                key={`show_${item}`}
                value={((item + 1) * increment).toString()}
                className="cursor-pointer"
              >
                {(item + 1) * increment} {label}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
}
